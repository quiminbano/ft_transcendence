from django.urls import path

from . import views

urlpatterns = [
    path("tournament", views.tournamentManager, name="tournament"),
	path("tournament/<int:id>", views.tournamentManagerID, name="tournamentID"),
    path("tournament/player/<int:id>", views.tournamentManagerPlayerID, name="tournamentPlayerID"),

]
