from django.db import models
from django.core.serializers.json import DjangoJSONEncoder
import json

class MockUser(models.Model):
   uuid = models.UUIDField(primary_key=True)
   onlineStatus = models.BooleanField()
   loginName = models.CharField(max_length=100)
   loginPassword = models.CharField(max_length=100)
   email = models.EmailField()


class Friend(models.Model):
   mockUser = models.ForeignKey(MockUser, on_delete=models.CASCADE)
   uuid = models.UUIDField()
   addedDate = models.DateTimeField()
