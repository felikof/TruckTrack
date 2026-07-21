from django.urls import include, path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'drivers', DriverViewSet, basename='driver')
router.register(r'slots', SlotViewSet, basename='slot')
router.register(r'trucks', TruckViewSet, basename='truck')
router.register(r'companies', CompanyViewSet, basename='company')
router.register(r'bookings', BookingViewSet, basename='booking')
# router.register(r'notifications', NotificationViewSet, basename='notification')
router.register(r'alertlogs', AlertLogViewSet, basename='alertlog')
router.register(r'gpspositions', GpsPositionViewSet, basename='gpsposition')

urlpatterns = [
    path("users/sign/", UserSignView.as_view(), name="sign"),
    path("users/login/", TokenObtainPairView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("users/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("admins/sign/", AdminRegistrationView.as_view(), name="admin_register"),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    
    path("", include(router.urls)),
]

