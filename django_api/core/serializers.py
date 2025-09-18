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

# class SlotSerializer(serializers.ModelSerializer):
#     user_id = serializers.ReadOnlyField(source='user.id')

#     class Meta:
#         model = Slot
#         fields = "__all__"

# class RouteStopSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = RouteStop
#         fields = ["id", "location", "estimated_time", "transfer_time"]

# class FacilitySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Facility
#         fields = ["id", "name"]

class SlotSerializer(serializers.ModelSerializer):
    # available_facilities = FacilitySerializer(many=True, read_only=True)

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

# class ServiceSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Service
#         fields = ["id", "name"]
#         read_only_fields = ["id"]

# class RouteSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Route
#         fields = ["id", "name"]
#         read_only_fields = ["id"]


class CompanySerializer(serializers.ModelSerializer):
    # services_offered = ServiceSerializer(many=True, read_only=True)
    # operating_routes = RouteSerializer(many=True, read_only=True)

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

# class SpecialEquipmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SpecialEquipment
#         fields = ["id", "name"]
#         read_only_fields = ["id"]

# class OperatingPermitSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = OperatingPermit
#         fields = ["id", "name"]
#         read_only_fields = ["id"]

class TruckSerializer(serializers.ModelSerializer):
    # special_equipment = SpecialEquipmentSerializer(many=True, read_only=True)
    # operating_permits = OperatingPermitSerializer(many=True, read_only=True)

    class Meta:
        model = Truck
        fields = [
            "id",
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

# class LanguageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Language
#         fields = ["id", "name"]

class DriverSerializer(serializers.ModelSerializer):
    # languages = serializers.SlugRelatedField(
    #     many=True,
    #     slug_field='name',
    #     queryset=Language.objects.all()
    # )

    class Meta:
        model = Driver
        fields = [
            "id",
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