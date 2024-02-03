from django.contrib.auth import get_user_model
from os import getenv
from django.db.models import Q
from api.models import Tournament
from api.models import Players
User = get_user_model()
if not User.objects.filter(Q(username='admin')
                            | Q(username='Lucas')
                            | Q(username='Andre')
                            | Q(username='Carlos')
                            | Q(username='Joao')
                            | Q(username='Hans')).exists():
    admin = User.objects.create_superuser(getenv('DJANGO_SUPERUSER'), getenv('DJANGO_SUPERUSER_EMAIL'), getenv('DJANGO_SUPERUSER_PASS'))
    Lucas = User.objects.create_user("Lucas", "Lucas@test.com", "1234")
    Andre = User.objects.create_user("Andre", "Andre@test.com", "1234")
    Carlos = User.objects.create_user("Carlos", "Carlos@test.com", "1234")
    Joao = User.objects.create_user("Joao", "Joao@test.com", "1234")
    Hans = User.objects.create_user("Hans", "Hans@test.com", "1234")

    admin.friends.add(Lucas)
    admin.friends.add(Andre)

    player1 = Players.objects.create(name="admin1")
    player2 = Players.objects.create(name="admin2")
    player3 = Players.objects.create(name="admin3")
    player4 = Players.objects.create(name="admin4")

    tournament = Tournament.objects.create(tournament_name="Tour1", amount=4)
    tournament.players.add(player1)
    tournament.players.add(player2)
    tournament.players.add(player3)
    tournament.players.add(player4)
    admin.completed_matches.add(tournament)

    tournament1 = Tournament.objects.create(tournament_name="Tour2", amount=4)
    # tournament1.players.add(player1)
    # tournament1.players.add(player2)
    # tournament1.players.add(player3)
    # tournament1.players.add(player4)
    admin.completed_matches.add(tournament1)
    admin.save()