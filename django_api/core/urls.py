from django.urls import include, path
from .views import (
    UserSignView, SlotListCreateView, SlotDetailView,
    book_slot, cancel_booking, available_slots
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from .views import DriverViewSet

router = DefaultRouter()
router.register(r'drivers', DriverViewSet, basename='driver')
urlpatterns = router.urls

urlpatterns = [
    path("users/sign/", UserSignView.as_view(), name="sign"),
    path("users/login/", TokenObtainPairView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("users/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("users/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path("admins/slots/", SlotListCreateView.as_view(), name="slots"),
    path("admins/slots/<int:pk>/", SlotDetailView.as_view(), name="slot_detail"),

    path("users/slots/available/", available_slots, name="available_slots"),
    path("users/slots/<int:pk>/book/", book_slot, name="book"),
    path("users/slots/<int:pk>/cancel/", cancel_booking, name="cancel"),
    
    path('', include(router.urls)),
]

