from django.urls import include, path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'drivers', DriverViewSet, basename='driver')
router.register(r'languages', LanguageViewSet, basename='language')
router.register(r'slots', SlotViewSet, basename='slot')
router.register(r'facilities', FacilityViewSet, basename='facility')
router.register(r'routeStops', RouteStopViewSet, basename='routeStop')

urlpatterns = [
    path("users/sign/", UserSignView.as_view(), name="sign"),
    path("users/login/", TokenObtainPairView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("users/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("users/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # path("users/slots/available/", available_slots, name="available_slots"),
    # path("users/slots/<int:pk>/book/", book_slot, name="book"),
    # path("users/slots/<int:pk>/cancel/", cancel_booking, name="cancel"),
    
    path("", include(router.urls)),
]

