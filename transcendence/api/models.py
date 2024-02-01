import uuid
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext as _
from django.contrib.auth.models import AbstractUser
from django.db import models
from .imageValidation import validateFileType, validationImageSize, defineNameImage
from django.core.files import File
from django.utils import timezone


class Players(models.Model):
    name = models.CharField(max_length=255)
    score = models.IntegerField(default=0)

class Tournament(models.Model):
    STATE_CHOICES = [
        ('P', 'Pending'),
        ('A', 'Active'),
        ('F', 'Finished'),
    ]

    id = models.AutoField(primary_key=True)
    tournament_name = models.CharField(max_length=255)
    amount = models.IntegerField()
    state = models.CharField(max_length=1, choices=STATE_CHOICES, default='P')
    players = models.ManyToManyField(Players, related_name='tournaments')
    date = models.DateField(default=timezone.now)

class DatabaseManager(BaseUserManager):

    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('Users must have an email address'))
        if not username:
            raise ValueError(_('Users must have a username'))
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('coallition', 'The Foragers')
        extra_fields.setdefault('is42', False)
        try:
            file = open("app/static/images/profileIconWhite.png", "rb")
            djangoFile = File(file)
            extra_fields.setdefault('avatar_image', djangoFile)
        except FileNotFoundError:
            extra_fields.setdefault('avatar_image', None)
        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(username, email, password, **extra_fields)


class Database(AbstractUser):
    online_status = models.BooleanField(default=False)
    is42 = models.BooleanField(default=False)
    friends = models.ManyToManyField('self', blank=True)
    friend_requests = models.ManyToManyField('self', symmetrical=False, blank=True)
    coallition = models.CharField(blank=True)
    access_token = models.CharField(blank=True)
    refresh_token = models.CharField(blank=True)
    expiration_time = models.BigIntegerField(default=0)
    avatar_image = models.FileField(upload_to=defineNameImage, validators=[validationImageSize, validateFileType], blank=True)
    tournament = models.OneToOneField(Tournament, on_delete=models.SET_NULL,  null=True, blank=True)
    completed_matches = models.ManyToManyField(Tournament, blank=True, related_name="completed_matches")
    matches_played = models.IntegerField(default=0)
    matches_won = models.IntegerField(default=0)
    matches_lost = models.IntegerField(default=0)

    objects = DatabaseManager()

    def get_coallition(self):
        return self.coallition

    def __str__(self):
        return self.username

class Users42(models.Model):
    user_in_42 = models.CharField(blank=True)
    user_in_database = models.CharField(blank=True)


