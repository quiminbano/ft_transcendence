from django.urls import path

from . import views

urlpatterns = [
    path("media/", views.profilePicture, name="media"),
    path("tournament", views.tournament, name="tournament"),
	path("tournament/<int:id>", views.tournamentWithID, name="tournament"),
    path("tournament/player", views.tournamentPlayer, name="tournament/player"),
	path("tournament/player/<int:id>", views.tournamentPlayer, name="tournament/player"),
]
