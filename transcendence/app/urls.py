from django.urls import path, re_path
from . import views

urlpatterns = [
    path("404", views.errors.status_404, name="404"),
    path("_404", views.errors.status_404, name="404"),
    path("login", views.userInterface.loginUser, name="login"),
    path("signup", views.userInterface.signup, name="signup"),
    path("logout", views.userInterface.logoutUser, name="logout"),
    path("settings", views.userInterface.settings, name="settings"),
    path("pong", views.pongTournament.pongInterface, name="pong"),
	path("pong/1v1", views.pongTournament.pongInterface, name="pong1v1"),
    path("pong/tournament", views.pongTournament.pongInterface, name="pongTournament"),
    path("pong/tournament/<int:id>", views.pongTournament.pongInterfaceWithId, name="pongTournamentLobby"),
    path("pong/tournament/<int:id>/start", views.pongTournament.pongInterfaceWithId, name="pongTournamentStart"),
    path("pong/remoteTournament", views.pongTournament.pongInterface, name="remoteTournament"),
	path("pong/remoteTournament/<int:id>", views.pongTournament.pongInterfaceWithId, name="remoteLobby"),
    path("postLogin", views.userInterface.loginUser, name="postLogin"),
    path("postSignup", views.userInterface.signup, name="postSignup"),
	path("users/<str:name>", views.userInterface.usersPage, name="friendsPage"),
	path("pong/tournament/localTournament>", views.pongTournament.pongTournamentGame, name="localTournament"),

	path("getDoc/registerPlayer", views.getRegisterPlayersTemplate, name="registerPlayerTemplate"),
	path("getDoc/circleChart", views.getCircleChartTemplate, name="circleChartTemplate"),
	path("getDoc/searchItem", views.getSearchItem, name="searchItem"),
    path("getDoc/invitationItemTemplate", views.invitationItemTemplate, name="invitationItemTemplate"),
	path("getDoc/invitedItemTemplate", views.invitedItemTemplate, name="invitedItemTemplate"),
	path("getDoc/youAreInvitedItem", views.youAreInvitedItemTemplate, name="youAreInvitedItemTemplate"),
    path("getDoc/bracket4", views.bracketFourTemplate, name="bracket4Template"),
    path("getDoc/bracket8", views.bracketEightTemplate, name="bracket8Template"),
    path("getDoc/bracket16", views.bracketSixteenTemplate, name="bracket16Template"),
    re_path(r'^.*$', views.mainPage.index, name='catch_all'),
    path("", views.mainPage.index, name="index"),
]
