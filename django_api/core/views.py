from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *

# Inscription utilisateur
class UserSignView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

# Liste / création créneaux (seulement admin)
class SlotViewSet(viewsets.ModelViewSet):
    queryset = Slot.objects.all()
    serializer_class = SlotSerializer  
    permission_classes = [permissions.IsAuthenticated]

# @api_view(["POST"])
# @permission_classes([permissions.IsAuthenticated])
# def book_slot(request, pk):
#     try:
#         slot = Slot.objects.get(pk=pk)
#     except Slot.DoesNotExist:
#         return Response({"detail": "Créneau introuvable"}, status=status.HTTP_404_NOT_FOUND)

#     if slot.statut != "disponible":
#         return Response({"detail": "Ce créneau est déjà réservé"}, status=status.HTTP_400_BAD_REQUEST)

#     slot.statut = "réservé"
#     slot.user = request.user
#     slot.save()
#     return Response({"message": "Créneau réservé avec succès"})

# @api_view(["POST"])
# @permission_classes([permissions.IsAuthenticated])
# def cancel_booking(request, pk):
#     try:
#         slot = Slot.objects.get(pk=pk, user=request.user)
#     except Slot.DoesNotExist:
#         return Response({"detail": "Réservation introuvable"}, status=status.HTTP_404_NOT_FOUND)

#     slot.statut = "disponible"
#     slot.user = None
#     slot.save()
#     return Response({"message": "Réservation annulée avec succès"})

# @api_view(["GET"])
# @permission_classes([permissions.IsAuthenticated])
# def available_slots():
#     slot = Slot.objects.filter(statut="available")
#     serializer = SlotSerializer(slot, many=True)
#     return Response(serializer.data)
    
class DriverViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class TruckViewSet(viewsets.ModelViewSet):
    queryset = Truck.objects.all()
    serializer_class = TruckSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]
    
class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class AlertLogViewSet(viewsets.ModelViewSet):
    queryset = AlertLog.objects.all()
    serializer_class = AlertLogSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class LoadViewSet(viewsets.ModelViewSet):
    queryset = Load.objects.all()
    serializer_class = LoadSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class DeclarationViewSet(viewsets.ModelViewSet):
    queryset = Declaration.objects.all()
    serializer_class = DeclarationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class ContainerTypeViewSet(viewsets.ModelViewSet):
    queryset = ContainerType.objects.all()
    serializer_class = ContainerTypeSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class TruckRouteViewSet(viewsets.ModelViewSet):
    queryset = TruckRoute.objects.all()
    serializer_class = TruckRouteSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class GpsPositionViewSet(viewsets.ModelViewSet):
    queryset = GpsPosition.objects.all()
    serializer_class = GpsPositionSerializer
    permission_classes = [permissions.IsAuthenticated]