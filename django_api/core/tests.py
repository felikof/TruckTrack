from django.test import TestCase
# Create your tests here.
from django.contrib.auth.models import UserManager
from .models import User
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.contrib.auth import get_user_model
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

