from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "email", "name", "first_name", "password"]
        read_only_fields = ["id"]

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            name=validated_data["name"],
            first_name=validated_data["first_name"],
            password=validated_data["password"],
        )
        return user

class SlotSerializer(serializers.ModelSerializer):

    class Meta:
        model = Slot
        fields = [
            "id",
            "slot_id",
            "slot_date",
            "start_time",
            "end_time",
            "duration",
            "origin_gate",
            "destination_terminal",
            "total_slots",
            "available_slots",
            "reserved_slots",
            "base_price",
            "currency",
            "status",
            "operator_name",
            "contact_person",
            "created_at",
            "route_stops",
            "available_facilities",
        ]
        read_only_fields = ["id", "created_at"]

class CompanySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Company
        fields = [
            "id",
            "company_name",
            "registration_number",
            "tax_id",
            "company_type",
            "established_year",
            "phone_number",
            "email",
            "website",
            "address",
            "city",
            "postal_code",
            "contact_person_name",
            "contact_person_title",
            "contact_person_phone",
            "contact_person_email",
            "fleet_size",
            "operating_license",
            "license_expiry",
            "insurance_provider",
            "insurance_policy_number",
            "insurance_expiry",
            "services_offered",
            "operating_routes",
            "certifications",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

class DriverSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Driver
        fields = [
            "id",
            "company",
            "first_name",
            "last_name",
            "date_of_birth",
            "national_id",
            "phone_number",
            "email",
            "address",
            "city",
            "license_number",
            "license_type",
            "license_expiry",
            "emergency_contact",
            "emergency_phone",
            "experience",
            "languages",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]
        
class DriverDetailSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.company_name', read_only=True)
    
    class Meta:
        model = Driver
        fields = [
            "id",
            "first_name",
            "last_name",
            "company",
            "company_name",
        ]
        
class TruckSerializer(serializers.ModelSerializer):
    drivers = DriverSerializer(many=True, read_only=True)
    
    class Meta:
        model = Truck
        fields = [
            "id",
            "company",
            "drivers",
            "plate_number",
            "chassis_number",
            "engine_number",
            "make",
            "model",
            "year",
            "color",
            "fuel_type",
            "truck_type",
            "cargo_type",
            "max_weight",
            "dimensions",
            "registration_date",
            "registration_expiry",
            "insurance_provider",
            "insurance_policy_number",
            "insurance_expiry",
            "inspection_date",
            "inspection_expiry",
            "owner_type",
            "owner_name",
            "owner_contact",
            "driver_assigned",
            "gps_installed",
            "tracking_device_id",
            "special_equipment",
            "operating_permits",
            "created_at",
        ]
        
        read_only_fields = ["id", "created_at"]
        
class TruckDetailSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.company_name', read_only=True)
    
    class Meta:
        model = Truck
        fields = [
            "id",
            "plate_number",
            "make",
            "model",
            "company",
            "company_name",
        ]
        
class BookingSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Booking
        fields = [
            "id",
            "book_num",
            "slot",
            "truck",
            "driver",
            "booked_by",
            "company",
            "booking_date",
            "status",
            "payment_status",
            "total_amount",
            "currency",
            "payment_method",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]
        
class BookingDetailSerializer(serializers.ModelSerializer):
    slot_number = serializers.CharField(source='slot.slot_id', read_only=True)
    company_name = serializers.CharField(source='company.company_name', read_only=True)
    driver_info = serializers.SerializerMethodField(read_only=True)
    truck_info = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Booking
        fields = ['id', 'book_num', 'slot_number', 'company_name', 'truck_info', 'driver_info']
    
    def get_driver_info(self, obj):
        if obj.driver:
            return {
                'full_name': f"{obj.driver.first_name} {obj.driver.last_name}",
                'phone': obj.driver.phone_number,
                'license': obj.driver.license_number
            }
        return None
    
    def get_truck_info(self, obj):
        if obj.truck:
            return {
                'plate_number': obj.truck.plate_number,
                'make': obj.truck.make,
                'model': obj.truck.model
            }
        return None
    
class BookingHistorySerializer(serializers.ModelSerializer):
    slot_info = serializers.SerializerMethodField()
    company_name = serializers.CharField(source='company.company_name', read_only=True)
    
    class Meta:
        model = Booking
        fields = ['id', 'book_num', 'slot_info', 'company_name', 'status', 'payment_status', 'total_amount', 'created_at']
    
    def get_slot_info(self, obj):
        if obj.slot:
            return {
                'slot_id': obj.slot.slot_id,
                'slot_date': obj.slot.slot_date,
                'start_time': obj.slot.start_time,
                'end_time': obj.slot.end_time,
                'origin_gate': obj.slot.origin_gate,
                'destination_terminal': obj.slot.destination_terminal
            }
        return None
        
class CompanyWithDetailsSerializer(serializers.ModelSerializer):
    trucks = TruckSerializer(many=True, read_only=True)
    drivers = DriverSerializer(many=True, read_only=True)
    stats = serializers.SerializerMethodField()
    
    def get_stats(self, obj):
        return {
            'total_trucks': obj.trucks.count(),
            'total_drivers': obj.drivers.count(),
            'active_trucks': obj.trucks.filter(is_active=True).count()
        }
    
    class Meta:
        model = Company
        fields = ['id', 'name', 'trucks', 'drivers', 'stats']
        
class CompanyWithTrucksSerializer(serializers.ModelSerializer):
    trucks = TruckSerializer(many=True, read_only=True)
    
    class Meta:
        model = Company
        fields = ['id', 'company_name', 'trucks']
        
class CompanyWithDriversSerializer(serializers.ModelSerializer):
    drivers = DriverSerializer(many=True, read_only=True)
    
    class Meta:
        model = Company
        fields = ['id', 'company_name', 'drivers']
        
class SlotWithBookingsSerializer(serializers.ModelSerializer):
    bookings = BookingSerializer(many=True, read_only=True)
    
    class Meta:
        model = Slot
        fields = ['id', 'slot_id', 'slot_date', 'start_time', 'end_time', 'bookings']
        
class NotificationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Notification
        fields = [
            "id",
            "company",
            "user",
            "driver",
            "notification_type",
            "recipient",
            "subject",
            "message",
            "sent_at",
            "status",
            "priority",
            "created_at",
        ]
        read_only_fields = ["id", "sent_at", "created_at"]
        
class NotificationDetailSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.company_name', read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)
    driver_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Notification
        fields = [
            "id",
            "company_name",
            "user_email",
            "driver_name",
            "notification_type",
            "recipient",
            "subject",
            "message",
            "sent_at",
            "status",
            "priority",
        ]
        
    def get_driver_name(self, obj):
        if obj.driver:
            return f"{obj.driver.first_name} {obj.driver.last_name}"
        return None
    
class AlertLogSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = AlertLog
        fields = [
            "id",
            "alert_level",
            "message",
            "created_at",
            "resolved",
            "resolved_at",
            "resolved_by",
        ]
        read_only_fields = ["id", "created_at"]
        
class LoadSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Load
        fields = [
            "id",
            "container",
            "description",
            "weight",
            "volume",
            "load_type",
            "special_handling",
            "pickup_location",
            "delivery_location",
            "pickup_date",
            "delivery_date",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]
        
class DeclarationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Declaration
        fields = [
            "id",
            "num",
            "date",
            "description",
            "marchandises",
            "container_type",
            "transitaire",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]
        
class ContainerTypeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ContainerType
        fields = [
            "id",
            "num",
            "type",
            "length",
            "width",
            "height",
            "max_weight",
            "tare_weight",
            "payload_capacity",
            "volume",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]
        
class TruckRouteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = TruckRoute
        fields = [
            "id",
            "truck",
            "start_location",
            "end_location",
            "waypoints",
            "distance_km",
            "estimated_time",
            "route_date_time",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]
        
class TruckRouteDetailSerializer(serializers.ModelSerializer):
    truck_plate = serializers.CharField(source='truck.plate_number', read_only=True)
    truck_make = serializers.CharField(source='truck.make', read_only=True)
    truck_model = serializers.CharField(source='truck.model', read_only=True)
    
    class Meta:
        model = TruckRoute
        fields = [
            "id",
            "truck_plate",
            "truck_make",
            "truck_model",
            "start_location",
            "end_location",
            "waypoints",
            "distance_km",
            "estimated_time",
            "route_date_time",
        ]
        
        read_only_fields = ["id"]

class GpsPositionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = GpsPosition
        fields = [
            "id",
            "truck",
            "latitude",
            "longitude",
            "timestamp",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]