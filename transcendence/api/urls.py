from django.urls import path

from . import views

urlpatterns = [
    path("login42", views.login42, name="login42"),
    path("oauth2/callback", views.callback42, name="callback42"),

    path("user", views.profilePicture, name="user"),
	
    path("getUser", views.getUser, name="getUser"),
    path("deleteUser", views.deleteUser, name="deleteUser"),
    path("putUser", views.putUser, name="putUser"),
	
    path("tournament", views.tournamentManager, name="tournament"),
	path("tournament/<int:id>", views.tournamentManagerID, name="tournamentID"),
    path("tournament/player", views.tournamentPlayer, name="tournament/player"),
    path("tournament/player/<int:id>", views.tournamentManagerPlayerID, name="tournamentPlayerID"),
]
