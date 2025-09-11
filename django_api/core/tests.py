from django.test import TestCase
# Create your tests here.
from django.contrib.auth.models import UserManager
from .models import *
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
User = get_user_model()

class UserTests(TestCase):

    def setUp(self):
        # Création d'un utilisateur de test
        self.user = User.objects.create_user(
            name="felix",
            first_name="dupont",
            email="felix@example.com",
            password="password123"
        )
        self.token = Token.objects.create(user=self.user)

    def test_inscription_utilisateur(self):
        """Tester que l'inscription fonctionne"""
        data = {
            "name": "nouveau",
            "first_name": "utilisateur",
            "email": "nouveau@example.com",
            "password": "pass1234"
        }
        response = self.client.post("/users/sign/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)  # l'utilisateur a été ajouté

    def test_connexion_utilisateur(self):
        """Tester la connexion avec mot de passe"""
        data = {"email": "felix@example.com", "password": "password123"}
        response = self.client.post("/users/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

class DriverAPITestCase(APITestCase):
    def setUp(self):
        
        self.user = User.objects.create_user(
            email="test@example.com",
            name="Test",
            first_name="User",
            password="password123"
        )
        
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")
        
        # Créer quelques langues
        self.lang1 = Language.objects.create(name="Français")
        self.lang2 = Language.objects.create(name="Anglais")


    def test_create_driver(self):
        url = reverse("driver-list")  # correspond au ViewSet Driver
        data = {
            "first_name": "Felix",
            "last_name": "Agbavo",
            "date_of_birth": "1995-07-12",
            "national_id": "TG123456",
            "phone_number": "+22890123456",
            "email": "felix@example.com",
            "address": "123 Rue des Camions",
            "city": "Lomé",
            "license_number": "LIC123456",
            "license_type": "Class C",
            "license_expiry": "2030-12-31",
            "emergency_contact": "Adjovi Marie",
            "emergency_phone": "+22899887766",
            "experience": 5,
        }
        

        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Driver.objects.count(), 1)
        driver = Driver.objects.first()
        driver.languages.set([self.lang1, self.lang2])
        self.assertEqual(driver.first_name, "Felix")
        self.assertEqual(driver.last_name, "Agbavo")
        self.assertEqual(driver.email, "felix@example.com")
        self.assertEqual(driver.languages.count(), 2)
