from django.db import models

from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    age = models.IntegerField()

class User(models.Model):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=64)

    def __str__(self):
        return self.username