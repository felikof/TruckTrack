import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from multiselectfield import MultiSelectField

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

class Slot(models.Model):
    STATUS_CHOICES = [
        ("active", "Active"),
        ("inactive", "Inactive"),
        ("cancelled", "Cancelled"),
        ("completed", "Completed"),
    ]

    CURRENCY_CHOICES = [
        ("USD", "US Dollar"),
        ("EUR", "Euro"),
        ("CFA", "CFA Franc")
    ]
    FACILITIES_CHOICES = [
        ("Restrooms", "Restrooms"),
        ("Food Services", "Food Services"),
        ("Waiting Area", "Waiting Area"),
        ("WiFi", "WiFi"),
        ("Parking", "Parking"),
        ("Fuel Station", "Fuel Station"),
        ("Maintenance Services", "Maintenance Services"),
        ("Customs Inspection", "Customs Inspection"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    slot_id = models.CharField(max_length=20, unique=True)  # ex: SLOT-002
    slot_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    duration = models.CharField(max_length=20)  # ex: "3h 15m"
    origin_gate = models.CharField(max_length=100)
    destination_terminal = models.CharField(max_length=100)

    total_slots = models.PositiveIntegerField()
    available_slots = models.PositiveIntegerField(default=0)
    reserved_slots = models.PositiveIntegerField(blank=True)

    base_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    currency = models.CharField(max_length=10, choices=CURRENCY_CHOICES, default="CFA")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="active")
    operator_name = models.CharField(max_length=100)
    contact_person = models.CharField(max_length=100, default="Port Autonome de Lomé")
    contact_phone = models.CharField(max_length=20, blank=True, default="+228 90909090")
    contact_email = models.EmailField(default="portAutonomeLome@mail.tg")

    created_at = models.DateTimeField(auto_now_add=True, blank=True)

    available_facilities = MultiSelectField(choices=FACILITIES_CHOICES, blank=True)
    
    class Meta:
        ordering = ["-slot_date", "start_time"]

    def __str__(self):
        return f"{self.slot_id} - {self.origin_gate} → {self.destination_terminal} ({self.status}) on {self.slot_date} at {self.start_time} to {self.end_time}"

class Company(models.Model):
    COMPANY_TYPE_CHOICES = [
        ("Private", "Private"),
        ("Public", "Public"),
        ("Government", "Government"),
    ]
    SERVICES_CHOICES = [
        ("Freight Transport", "Freight Transport"),
        ("Logistics", "Logistics"),
        ("Warehousing", "Warehousing"),
        ("Courier Services", "Courier Services"),
        ("Customs Brokerage", "Customs Brokerage"),
        ("Other", "Other"),
    ]
    ROUTES_CHOICES = [
        ("Lome-Ouagadougou", "Lome-Ouagadougou"),
        ("Lome-Niamey", "Lome-Niamey"),
        ("Lome-Bamako", "Lome-Bamako"),
        ("Lome-Cinkasse", "Lome-Cinkasse"),
        ("Other", "Other"),
    ]
    CERTIFICATIONS_CHOICES = [
        ("ISO 9001", "ISO 9001"),
        ("ISO 14001", "ISO 14001"),
        ("OHSAS 18001", "OHSAS 18001"),
        ("Other", "Other"),
    ]
    

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company_name = models.CharField(max_length=200)
    registration_number = models.CharField(max_length=100, blank=True, unique=True)
    tax_id = models.CharField(max_length=100, blank=True)
    company_type = models.CharField(max_length=50, choices=COMPANY_TYPE_CHOICES, default="Private")
    established_year = models.PositiveIntegerField(null=True, blank=True)

    phone_number = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True, unique=True)
    website = models.URLField(blank=True)

    address = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=100, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)

    contact_person_name = models.CharField(max_length=100, blank=True)
    contact_person_title = models.CharField(max_length=100, blank=True)
    contact_person_phone = models.CharField(max_length=50, blank=True)
    contact_person_email = models.EmailField(blank=True)

    fleet_size = models.PositiveIntegerField(null=True, blank=True)
    operating_license = models.CharField(max_length=100, blank=True)
    license_expiry = models.DateField(null=True, blank=True)
    insurance_provider = models.CharField(max_length=100, blank=True)
    insurance_policy_number = models.CharField(max_length=100, blank=True)
    insurance_expiry = models.DateField(null=True, blank=True)

    services_offered = MultiSelectField(choices=SERVICES_CHOICES, blank=True)
    operating_routes = MultiSelectField(choices=ROUTES_CHOICES, blank=True)
    certifications = models.CharField(max_length=50, choices=CERTIFICATIONS_CHOICES, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.company_name

class Driver(models.Model):
    LICENSE_TYPE_CHOICES = [
        ("Class A", "Class A"),
        ("Class B", "Class B"),
        ("Class C", "Class C"),
        ("Class D", "Class D"),
    ]
    LANGUAGE_CHOICES = [
        ("English", "English"),
        ("French", "French"),
        ("Spanish", "Spanish"),
        ("German", "German"),
        ("Chinese", "Chinese"),
        ("Arabic", "Arabic"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="drivers")
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField(null=True, blank=True)
    national_id = models.CharField(max_length=50, blank=True, unique=True)
    phone_number = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True, unique=True)
    address = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=100, blank=True)

    license_number = models.CharField(max_length=50, blank=True)
    license_type = models.CharField(max_length=20, choices=LICENSE_TYPE_CHOICES, default="Class C")
    license_expiry = models.DateField(null=True, blank=True)

    emergency_contact = models.CharField(max_length=100, blank=True)
    emergency_phone = models.CharField(max_length=50, blank=True)

    experience = models.PositiveIntegerField(null=True, blank=True)  # années d'expérience
    languages = MultiSelectField(choices=LANGUAGE_CHOICES, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
class Truck(models.Model):
    FUEL_CHOICES = [
        ("Diesel", "Diesel"),
        ("Petrol", "Petrol"),
        ("Electric", "Electric"),
        ("Hybrid", "Hybrid"),
    ]
    TRUCK_TYPE_CHOICES = [
        ("Standard", "Standard"),
        ("Refrigerated", "Refrigerated"),
        ("Tanker", "Tanker"),
        ("Flatbed", "Flatbed"),
        ("Heavy Duty", "Heavy Duty"),
    ]
    CARGO_TYPE_CHOICES = [
        ("Container", "Container"),
        ("Bulk", "Bulk"),
        ("Liquid", "Liquid"),
    ]
    OWNER_TYPE_CHOICES = [
        ("Company", "Company"),
        ("Individual", "Individual"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="trucks")
    # drivers = models.ManyToManyField(Driver, related_name="trucks", blank=True)
    driver_assigned = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name="trucks", blank=True, null=True)
    plate_number = models.CharField(max_length=20, unique=True)
    chassis_number = models.CharField(max_length=50, blank=True)
    engine_number = models.CharField(max_length=50, blank=True)
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.PositiveIntegerField(null=True, blank=True)
    color = models.CharField(max_length=30, blank=True)
    fuel_type = models.CharField(max_length=20, choices=FUEL_CHOICES, default="Diesel")
    truck_type = models.CharField(max_length=20, choices=TRUCK_TYPE_CHOICES, default="Standard")
    cargo_type = models.CharField(max_length=20, choices=CARGO_TYPE_CHOICES, default="Container")
    max_weight = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    registration_date = models.DateField(null=True, blank=True)
    registration_expiry = models.DateField(null=True, blank=True)

    insurance_provider = models.CharField(max_length=100, blank=True)
    insurance_expiry = models.DateField(null=True, blank=True)

    owner_type = models.CharField(max_length=20, choices=OWNER_TYPE_CHOICES, default="Company")
    owner_name = models.CharField(max_length=100, blank=True)
    owner_contact = models.CharField(max_length=50, blank=True)

    gps_installed = models.BooleanField(default=False)
    tracking_device_id = models.CharField(max_length=50, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.plate_number} - {self.make} {self.model}"

class Booking(models.Model):
    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Confirmed", "Confirmed"),
        ("Cancelled", "Cancelled"),
        ("Completed", "Completed"),
    ]

    PAYMENT_STATUS_CHOICES = [
        ("Unpaid", "Unpaid"),
        ("Paid", "Paid"),
        ("Refunded", "Refunded"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    book_num = models.CharField(max_length=30, unique=True)  # ex: BOOK-001
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE, related_name="bookings")
    truck = models.ForeignKey(Truck, on_delete=models.CASCADE, related_name="bookings", null=True, blank=True)
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name="bookings", null=True, blank=True)
    booked_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bookings", null=True, blank=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="bookings", null=True, blank=True)

    booking_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Pending")
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default="Unpaid")

    total_amount = models.DecimalField(max_digits=10, decimal_places=0, default=0.00)
    currency = models.CharField(max_length=10, choices=Slot.CURRENCY_CHOICES, default="CFA")
    payment_method = models.CharField(max_length=50, blank=True, default="Virement")  # ex: Credit Card, PayPal

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking {self.id} - {self.slot.slot_id} by {self.booked_by.email} for {self.company.company_name if self.company else 'Particular'}"

class Notification(models.Model):
    NOTIFICATION_CHOICES = [
        ("email", "Email"),
        ("sms", "SMS"),
        ("whatsapp", "Whatsapp Notification"),
    ]
    
    STATUS_CHOICES = [
        ("sent", "Sent"),
        ("failed", "Failed"),
        ("pending", "Pending"),
    ]
    PRIORITY_CHOICES = [
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="notifications", null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notifications", null=True, blank=True)
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE, related_name="notifications", null=True, blank=True)
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_CHOICES, default="email")
    recipient = models.CharField(max_length=100)  # email or phone number
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Sent")
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default="Medium")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Notification {self.id} to {self.recipient} via {self.notification_type}"

class AlertLog(models.Model):
    ALERT_LEVEL_CHOICES = [
        ("info", "Info"),
        ("warning", "Warning"),
        ("high", "High"),
        ("critical", "Critical"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    alert_level = models.CharField(max_length=20, choices=ALERT_LEVEL_CHOICES, default="info")
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    resolved = models.BooleanField(default=False)
    resolved_at = models.DateTimeField(null=True, blank=True)
    resolved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"AlertLog {self.id} - {self.alert_level} - Resolved: {self.resolved}"

class Load(models.Model):
    LOAD_TYPE_CHOICES = [
        ("Full Truckload", "Full Truckload"),
        ("Less than Truckload", "Less than Truckload"),
        ("Containerized", "Containerized"),
        ("Bulk", "Bulk"),
        ("Liquid", "Liquid"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    container = models.ForeignKey("ContainerType", on_delete=models.CASCADE, related_name="loads")
    description = models.CharField(max_length=200)
    weight = models.DecimalField(max_digits=10, decimal_places=2)  # in kg
    volume = models.DecimalField(max_digits=10, decimal_places=2)  # in cubic meters
    load_type = models.CharField(max_length=30, choices=LOAD_TYPE_CHOICES, default="Full Truckload")
    special_handling = models.TextField(blank=True)  # ex: Fragile, Hazardous

    pickup_location = models.CharField(max_length=200)
    delivery_location = models.CharField(max_length=200)
    pickup_date = models.DateField(null=True, blank=True)
    delivery_date = models.DateField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Load {self.id} - {self.description} ({self.weight}kg, {self.volume}m³)"

class Declaration(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    num = models.CharField(max_length=20, unique=True)  # ex: DEC-001
    date = models.DateTimeField()
    description = models.TextField()
    marchandises = models.ManyToManyField("Load", related_name="declarations", blank=True)
    container_type = models.ForeignKey("ContainerType", on_delete=models.CASCADE, related_name="declarations", null=True, blank=True)
    transitaire = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="declarations", null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Declaration {self.num} on {self.date}"

class ContainerType(models.Model):
    TYPE_CHOICES = [
        ("Standard", "Standard"),
        ("Refrigerated", "Refrigerated"),
        ("Open Top", "Open Top"),
        ("Flat Rack", "Flat Rack"),
        ("Tank", "Tank"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    num = models.CharField(max_length=20, unique=True)  # ex: CONT-001
    type = models.CharField(max_length=50, choices=TYPE_CHOICES, default="Standard")
    length = models.DecimalField(max_digits=5, decimal_places=2)  # in meters
    width = models.DecimalField(max_digits=5, decimal_places=2)   # in meters
    height = models.DecimalField(max_digits=5, decimal_places=2)  # in meters
    max_weight = models.DecimalField(max_digits=10, decimal_places=2)  # in kg
    tare_weight = models.DecimalField(max_digits=10, decimal_places=2) # in kg
    payload_capacity = models.DecimalField(max_digits=10, decimal_places=2) # in kg
    volume = models.DecimalField(max_digits=10, decimal_places=2)  # in cubic meters

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.num} - {self.type} ({self.length}m x {self.width}m x {self.height}m)"
    
class TruckRoute(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    truck = models.ForeignKey(Truck, on_delete=models.CASCADE, related_name="routes")
    start_location = models.CharField(max_length=200)
    end_location = models.CharField(max_length=200)
    waypoints = models.JSONField(default=list, blank=True)  # ex: [{"lat": "", "lng": ""}, ...]
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
    