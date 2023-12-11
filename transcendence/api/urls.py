from django.urls import path

from . import views

urlpatterns = [
    path("tournament", views.tournamentManager, name="tournament"),
	path("tournament/<int:id>", views.tournamentManager, name="tournamentID"),
    path("tournament/player", views.tournamentManager, name="tournamentPlayer"),
    path("tournament/player/<int:id>", views.tournamentManager, name="tournamentPlayerID"),

]
