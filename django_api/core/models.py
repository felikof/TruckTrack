import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings
# Create your models here.

# Gestionnaire d'utilisateurs
class UserManager(BaseUserManager):
    def create_user(self, email, name, first_name, password=None):
        if not email:
            raise ValueError("L'email est obligatoire")
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, first_name=first_name)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, first_name, password):
        user = self.create_user(email, name, first_name, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # pour accès admin Django
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ["-created_at"]

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name", "first_name"]

    objects = UserManager()

    def __str__(self):
        return f"{self.first_name} {self.name}"

class Admin(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='admin_profile'
    )
    badge_number = models.CharField(max_length=20, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.badge_number} - {self.user.email}"

class Slot(models.Model):
    STATUS_CHOICES = [
        ("active", "Active"),
        ("inactive", "Inactive"),
        ("cancelled", "Cancelled"),
        ("completed", "Completed"),
    ]
    
    OPERATION_CHOICES = [
        ("loading", "Loading"),
        ("unloading", "Unloading"),
        ("transit", "Transit"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    slot_id = models.CharField(max_length=20, unique=True)  # ex: SLOT-002
    slot_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    origin_gate = models.CharField(max_length=100)
    destination_terminal = models.CharField(max_length=100)

    total_slots = models.PositiveIntegerField()
    available_slots = models.PositiveIntegerField(default=0)
    reserved_slots = models.PositiveIntegerField(blank=True)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="active")
    operation = models.CharField(max_length=20, choices=OPERATION_CHOICES, default="transit")

    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    
    class Meta:
        ordering = ["-slot_date", "start_time"]

    def __str__(self):
        return f"{self.slot_id} - {self.origin_gate} → {self.destination_terminal} ({self.status}) on {self.slot_date} at {self.start_time} to {self.end_time}"

class Company(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company_name = models.CharField(max_length=200)
    registration_number = models.CharField(max_length=100, blank=True, unique=True)
    established_year = models.PositiveIntegerField(null=True, blank=True)

    phone_number = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True, unique=True)

    address = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.company_name

class Driver(models.Model):
    LICENSE_TYPE_CHOICES = [
        ("Class B", "B"),
        ("Class C", "C"),
        ("Class D", "D"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="drivers")
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=50, blank=True)

    license_number = models.CharField(max_length=50, blank=True)
    license_type = models.CharField(max_length=20, choices=LICENSE_TYPE_CHOICES, default="Class C")
    license_expiry = models.DateField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
class Truck(models.Model):
    TRUCK_TYPE_CHOICES = [
        ("Standard", "Standard"),
        ("Refrigerated", "Refrigerated"),
        ("Tanker", "Tanker"),
        ("Flatbed", "Flatbed"),
        ("Heavy Duty", "Heavy Duty"),
    ]
    
    STATUS_CHOICES = [
        ("APPROACHING", "Approaching"),
        ("WAITING_ZONE", "In the waiting zone"),
        ("IN_PORT", "Within the port boundaries"),
        ("OUT_PORT", "Out of the port"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="trucks")
    plate_number = models.CharField(max_length=20, unique=True)
    make = models.CharField(max_length=50)
    truck_type = models.CharField(max_length=20, choices=TRUCK_TYPE_CHOICES, default="Standard")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="APPROACHING")

    insurance_provider = models.CharField(max_length=100, blank=True)
    insurance_expiry = models.DateField(null=True, blank=True)

    gps_installed = models.BooleanField(default=False)
    tracking_device_id = models.CharField(max_length=50, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.plate_number} - {self.make}"

class Booking(models.Model):
    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Confirmed", "Confirmed"),
        ("Cancelled", "Cancelled"),
        ("Completed", "Completed"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    book_num = models.CharField(max_length=30, unique=True)  # ex: BOOK-001
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE, related_name="bookings")
    truck = models.ForeignKey(Truck, on_delete=models.CASCADE, related_name="bookings", null=True, blank=True)
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name="bookings", null=True, blank=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="bookings", null=True, blank=True)

    booking_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Pending")
    
    cancelled_by = models.CharField(
        max_length=10,
        choices=[('company', 'Transporteur'), ('admin', 'Administrateur')],
        null=True, blank=True
    )

    def __str__(self):
        return f"Booking {self.id} - {self.slot.slot_id} by {self.company.company_name}"
    
class TruckRoute(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    truck = models.ForeignKey(Truck, on_delete=models.CASCADE, related_name="routes")
    start_location = models.CharField(max_length=200)
    end_location = models.CharField(max_length=200)
    distance_km = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    estimated_time = models.TimeField(null=True, blank=True)  # in minutes
    route_date_time = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Route for {self.truck.plate_number} from {self.start_location} to {self.end_location}"
    
class GpsPosition(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    truck = models.ForeignKey(Truck, on_delete=models.CASCADE, related_name="gps_positions")
    latitude = models.DecimalField(max_digits=9, decimal_places=6)   # ex: 12.345678
    longitude = models.DecimalField(max_digits=9, decimal_places=6)  # ex: 98.765432
    timestamp = models.DateTimeField(auto_now_add=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"GPS Position of {self.truck.plate_number} at {self.timestamp}: ({self.latitude}, {self.longitude})"
    
class Alert(models.Model):
    ALERT_TYPE_CHOICES = [
        ("INFO", "Information"),
        ("WARNING", "Warning"),
        ("CRITICAL", "Critical"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    truck = models.ForeignKey(Truck, on_delete=models.CASCADE, related_name="alerts")
    alert_type = models.CharField(max_length=20, choices=ALERT_TYPE_CHOICES, default="INFO")
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Alert for {self.truck.plate_number} at {self.timestamp}: [{self.alert_type}] {self.message}"
    
class Notification(models.Model):
    TYPE_CHOICES = [
        ('pending', 'Validation requise'),
        ('cancelled', 'Annulation transporteur'),
        ('no_show', 'Créneau non utilisé'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    admin = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='notifications',
        null=True, blank=True,
        help_text="Si null, la notification est visible par tous les admins"
    )
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    booking = models.ForeignKey(
        'Booking',
        on_delete=models.CASCADE,
        related_name='notifications'
    )
    message = models.CharField(max_length=255)
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.type} — {self.booking.id}"
    
class History(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='histories'
    )
    booking = models.ForeignKey(
        Booking,
        on_delete=models.CASCADE,
        related_name='histories'
    )
    
    action = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.user.email} - {self.action} at {self.timestamp}"