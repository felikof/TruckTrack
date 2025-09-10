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


class Slot(models.Model):
    date = models.DateField()
    heure_debut = models.TimeField()
    heure_fin = models.TimeField()
    statut = models.CharField(max_length=20, default="disponible")
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.date} {self.heure_debut}-{self.heure_fin} ({self.statut})"

