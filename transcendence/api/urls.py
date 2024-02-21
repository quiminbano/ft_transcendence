from django.urls import path

from . import views

urlpatterns = [
    path("exit", views.onlineStatus.handleOnlineStatus, name="exit"),

    path("oauth2/callback", views.api42.callback42, name="callback42"),

    path("getRestInfo", views.api42.getRestInfo, name="getRestInfo"),
	
    path("userProfilePicture", views.userController.profilePicture, name="user"),
	
    path("friends", views.userController.getFriends, name="getFriends"),
    path("searchUsers/<str:search>", views.userController.searchUsers, name="getUsers"),
    path("user", views.userController.Users, name="User"),
    path("user/<str:userName>", views.userController.getUser, name="getUser"),
	
    path("friend_request/<str:friendName>", views.userController.friendRequest, name="friendRequest"),
    path("friend_request", views.userController.friendRequest, name="friendRequest"),
    path("friend/<str:friendName>", views.userController.friends, name="addFriend"),
	
    path("tournament", views.tournamentController.tournamentManager, name="tournament"),
	path("tournament/<int:id>", views.tournamentController.tournamentManagerID, name="tournamentID"),
    path("tournament/<int:id>/player", views.tournamentController.tournamentPlayerManager, name="tournamentPlayerID"),
    path("tournament/<int:id>/match", views.tournamentController.tournamentMatchManager, name="tournamentPlayerID"),
]
