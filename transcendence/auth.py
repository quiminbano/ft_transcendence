from django.contrib.auth import get_user_model
from os import getenv
from django.db.models import Q
from api.models import Tournament
User = get_user_model()
if not User.objects.filter(Q(username='admin')
                            | Q(username='Lucas')
                            | Q(username='Andre')
                            | Q(username='Carlos')
                            | Q(username='Joao')
                            | Q(username='Hans')).exists():
    admin = User.objects.create_superuser(getenv('DJANGO_SUPERUSER'), getenv('DJANGO_SUPERUSER_EMAIL'), getenv('DJANGO_SUPERUSER_PASS'))
    Lucas = User.objects.create_user("lucas", "Lucas@test.com", "1234")
    Andre = User.objects.create_user("andre", "Andre@test.com", "1234")
    Carlos = User.objects.create_user("carlos", "Carlos@test.com", "1234")
    Joao = User.objects.create_user("joao", "Joao@test.com", "1234")
    Hans = User.objects.create_user("hans", "Hans@test.com", "1234")

    admin.friends.add(Lucas)
    admin.friends.add(Andre)
