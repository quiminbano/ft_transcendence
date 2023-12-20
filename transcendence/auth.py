from django.contrib.auth import get_user_model
from os import getenv

User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser(getenv('DJANGO_SUPERUSER'), getenv('DJANGO_SUPERUSER_EMAIL'), getenv('DJANGO_SUPERUSER_PASS'))