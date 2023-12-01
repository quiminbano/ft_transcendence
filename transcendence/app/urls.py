from django.urls import path, re_path

from . import views

urlpatterns = [
    path("404", views.status_404, name="404"),
    path("_404", views.status_404, name="404"),
    path("", views.index, name="index"),
    path("login", views.loginUser, name="login"),
    path("signup", views.signup, name="signup"),
    path("logout", views.logoutUser, name="logout"),
    path("settings", views.settings, name="settings"),
    path("pong", views.pong, name="pong"),
    path("pong/tournament", views.pongTournament, name="pongTournament"),
    path("postLogin", views.loginUser, name="postLogin"),
    path("postSignup", views.signup, name="postSignup"),

    re_path(r'^.*$', views.index, name='catch_all'),
]
