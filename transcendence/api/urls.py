from django.urls import path

from . import views

urlpatterns = [
    path("oauth2/callback", views.api42.callback42, name="callback42"),
    path("user", views.userController.profilePicture, name="user"),
	
    path("friends", views.userController.getFriends, name="getFriends"),
    path("searchUsers/<str:search>", views.userController.searchUsers, name="getUsers"),
    path("users", views.userController.Users, name="getUser"),
    path("users/<str:userName>", views.userController.getUser, name="getUser"),
	
    path("deleteUser", views.userController.Users, name="deleteUser"),
	
    path("tournament", views.tournamentController.tournamentManager, name="tournament"),
	path("tournament/<int:id>", views.tournamentController.tournamentManagerID, name="tournamentID"),
    path("tournament/player", views.tournamentController.tournamentPlayer, name="tournament/player"),
    path("tournament/player/<int:id>", views.tournamentController.tournamentManagerPlayerID, name="tournamentPlayerID"),
]
