from rest_framework import serializers
from .models import User, Slot

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


class SlotSerializer(serializers.ModelSerializer):
    user_id = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = Slot
        fields = "__all__"
