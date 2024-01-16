from django.urls import path

from . import views

urlpatterns = [
    path("user", views.profilePicture, name="user"),
	
    path("getUser", views.getUser, name="getUser"),
    path("deleteUser", views.deleteUser, name="deleteUser"),
    path("putUser", views.putUser, name="putUser"),
	
    path("tournament", views.tournamentManager, name="tournament"),
	path("tournament/<int:id>", views.tournamentManagerID, name="tournamentID"),
    path("tournament/player", views.tournamentPlayer, name="tournament/player"),
    path("tournament/player/<int:id>", views.tournamentManagerPlayerID, name="tournamentPlayerID"),

]
