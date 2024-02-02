from django.urls import path

from . import views

urlpatterns = [
    path("oauth2/callback", views.api42.callback42, name="callback42"),
	
    path("userProfilePicture", views.userController.profilePicture, name="user"),
	
    path("friends", views.userController.getFriends, name="getFriends"),
    path("searchUsers/<str:search>", views.userController.searchUsers, name="getUsers"),
    path("user", views.userController.Users, name="User"),
    path("user/<str:userName>", views.userController.getUser, name="getUser"),
    path("matchHistory/<str:userName>", views.userController.getMatchHistory, name="getMatchHistory"),
	
    path("friend_request/<str:friendName>", views.userController.friendRequest, name="friendRequest"),
    path("friend_request", views.userController.friendRequest, name="friendRequest"),
    path("friend/<str:friendName>", views.userController.friends, name="addFriend"),
	
    path("match", views.matchController.matchManager, name="match"),
	path("match/<int:id>", views.matchController.matchManagerID, name="matchID"),
    path("match/player", views.matchController.matchPlayer, name="match/player"),
    path("match/player/<int:id>", views.matchController.matchManagerPlayerID, name="matchPlayerID"),
]
