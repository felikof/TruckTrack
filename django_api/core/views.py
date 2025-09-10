from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import User, Slot
from .serializers import UserSerializer, SlotSerializer

# Inscription utilisateur
class UserSignView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


# Liste / création créneaux (seulement admin)
class SlotListCreateView(generics.ListCreateAPIView):
    queryset = Slot.objects.all()
    serializer_class = SlotSerializer
    permission_classes = [permissions.IsAdminUser]


# Détail / suppression créneau
class SlotDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Slot.objects.all()
    serializer_class = SlotSerializer
    permission_classes = [permissions.IsAdminUser]

@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def book_slot(request, pk):
    try:
        slot = Slot.objects.get(pk=pk)
    except Slot.DoesNotExist:
        return Response({"detail": "Créneau introuvable"}, status=status.HTTP_404_NOT_FOUND)

    if slot.statut != "disponible":
        return Response({"detail": "Ce créneau est déjà réservé"}, status=status.HTTP_400_BAD_REQUEST)

    slot.statut = "réservé"
    slot.user = request.user
    slot.save()
    return Response({"message": "Créneau réservé avec succès"})


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def cancel_booking(request, pk):
    try:
        slot = Slot.objects.get(pk=pk, user=request.user)
    except Slot.DoesNotExist:
        return Response({"detail": "Réservation introuvable"}, status=status.HTTP_404_NOT_FOUND)

    slot.statut = "disponible"
    slot.user = None
    slot.save()
    return Response({"message": "Réservation annulée avec succès"})

@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def available_slots(request):
    slot = Slot.objects.filter(statut="disponible")
    serializer = SlotSerializer(slot, many=True)
    return Response(serializer.data)
