from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "email", "name", "first_name", "password"]

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

class RouteStopSerializer(serializers.ModelSerializer):
    class Meta:
        model = RouteStop
        fields = ["location", "estimated_time", "transfer_time"]

class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = ["name"]

class SlotSerializer(serializers.ModelSerializer):
    route_stops = RouteStopSerializer(many=True, read_only=True)
    available_facilities = FacilitySerializer(many=True, read_only=True)

    class Meta:
        model = Slot
        fields = [
            "slot_id", "slot_date", "start_time", "end_time", "duration",
            "origin_gate", "destination_terminal", "total_slots", "available_slots",
            "reserved_slots", "base_price", "currency", "status", "operator_name",
            "contact_person", "created_at", "route_stops", "available_facilities"
        ]

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ["id", "name"]

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ["id", "name"]


class CompanySerializer(serializers.ModelSerializer):
    services_offered = ServiceSerializer(many=True, read_only=True)
    operating_routes = RouteSerializer(many=True, read_only=True)

    class Meta:
        model = Company
        fields = [
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

class SpecialEquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialEquipment
        fields = ["id", "name"]

class OperatingPermitSerializer(serializers.ModelSerializer):
    class Meta:
        model = OperatingPermit
        fields = ["id", "name"]

class TruckSerializer(serializers.ModelSerializer):
    special_equipment = SpecialEquipmentSerializer(many=True, read_only=True)
    operating_permits = OperatingPermitSerializer(many=True, read_only=True)

    class Meta:
        model = Truck
        fields = [
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
            "certifications",
            "operating_permits",
            "created_at",
        ]


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ["id", "name"]

class DriverSerializer(serializers.ModelSerializer):
    languages = LanguageSerializer(many=True, read_only=True, queryset=list(Language.objects.values_list("name", flat=True)))

    class Meta:
        model = Driver
        fields = "__all__"