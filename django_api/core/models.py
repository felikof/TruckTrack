from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

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

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name", "first_name"]

    objects = UserManager()

    def __str__(self):
        return f"{self.first_name} {self.name}"


# class Slot(models.Model):
#     date = models.DateField()
#     heure_debut = models.TimeField()
#     heure_fin = models.TimeField()
#     statut = models.CharField(max_length=20, default="disponible")
#     user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

#     def __str__(self):
#         return f"{self.date} {self.heure_debut}-{self.heure_fin} ({self.statut})"

class Facility(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Slot(models.Model):
    STATUS_CHOICES = [
        ("active", "Active"),
        ("inactive", "Inactive"),
        ("cancelled", "Cancelled"),
        ("completed", "Completed"),
        ("pending", "Pending"),
        ("delayed", "Delayed"),
        ("reserved", "Reserved")
    ]

    CURRENCY_CHOICES = [
        ("USD", "US Dollar"),
        ("EUR", "Euro"),
        ("CFA", "CFA Franc")
    ]

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

    available_facilities = models.ManyToManyField(Facility, related_name="slots", blank=True)

    def __str__(self):
        return f"{self.slot_id} - {self.origin_gate} → {self.destination_terminal}"


class RouteStop(models.Model):
    slot = models.ForeignKey(Slot, related_name="route_stops", on_delete=models.CASCADE)
    location = models.CharField(max_length=100)
    estimated_time = models.TimeField()
    transfer_time = models.PositiveIntegerField(help_text="Minutes de transfert")

    def __str__(self):
        return f"{self.location} ({self.estimated_time})"


class Service(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Route(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Company(models.Model):
    COMPANY_TYPE_CHOICES = [
        ("Private", "Private"),
        ("Public", "Public"),
        ("Government", "Government"),
    ]

    company_name = models.CharField(max_length=200)
    registration_number = models.CharField(max_length=100, blank=True)
    tax_id = models.CharField(max_length=100, blank=True)
    company_type = models.CharField(max_length=50, choices=COMPANY_TYPE_CHOICES, default="Private")
    established_year = models.PositiveIntegerField(null=True, blank=True)

    phone_number = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)
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

    services_offered = models.ManyToManyField(Service, blank=True)
    operating_routes = models.ManyToManyField(Route, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.company_name


class SpecialEquipment(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class OperatingPermit(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

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

    dimensions = models.JSONField(default=dict)  # ex: {"length": "", "width": "", "height": ""}

    registration_date = models.DateField(null=True, blank=True)
    registration_expiry = models.DateField(null=True, blank=True)

    insurance_provider = models.CharField(max_length=100, blank=True)
    insurance_policy_number = models.CharField(max_length=50, blank=True)
    insurance_expiry = models.DateField(null=True, blank=True)

    inspection_date = models.DateField(null=True, blank=True)
    inspection_expiry = models.DateField(null=True, blank=True)

    owner_type = models.CharField(max_length=20, choices=OWNER_TYPE_CHOICES, default="Company")
    owner_name = models.CharField(max_length=100, blank=True)
    owner_contact = models.CharField(max_length=50, blank=True)

    driver_assigned = models.CharField(max_length=100, blank=True)
    gps_installed = models.BooleanField(default=False)
    tracking_device_id = models.CharField(max_length=50, blank=True)

    special_equipment = models.ManyToManyField(SpecialEquipment, blank=True)
    operating_permits = models.ManyToManyField(OperatingPermit, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.plate_number} - {self.make} {self.model}"
    

class Language(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Driver(models.Model):
    LICENSE_TYPE_CHOICES = [
        ("Class A", "Class A"),
        ("Class B", "Class B"),
        ("Class C", "Class C"),
        ("Class D", "Class D"),
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField(null=True, blank=True)
    national_id = models.CharField(max_length=50, blank=True)
    phone_number = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)
    address = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=100, blank=True)

    license_number = models.CharField(max_length=50, blank=True)
    license_type = models.CharField(max_length=20, choices=LICENSE_TYPE_CHOICES, default="Class C")
    license_expiry = models.DateField(null=True, blank=True)

    emergency_contact = models.CharField(max_length=100, blank=True)
    emergency_phone = models.CharField(max_length=50, blank=True)

    experience = models.PositiveIntegerField(null=True, blank=True)  # années d'expérience
    languages = models.ManyToManyField("Language", blank=True, related_name="drivers")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

