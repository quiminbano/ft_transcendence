import uuid
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext as _
from django.contrib.auth.models import AbstractUser
from django.db import models




class CustomUserManager(BaseUserManager):
    # uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # onlineStatus = models.BooleanField(default=False)
    """
    Custom user model manager where email is the unique identifier
    for authentication instead of usernames.
    """

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

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(username, email, password, **extra_fields)






class CustomUserData(AbstractUser):
    # uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    onlineStatus = models.BooleanField(default=False)
    friends = models.ManyToManyField('self', blank=True)
    # email = models.EmailField(_('email address'), unique=True)

    # USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ('username',)

    objects = CustomUserManager()

    def __str__(self):
        return self.username



class User(models.Model):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=64)

    def __str__(self):
        return self.username
