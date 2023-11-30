from django.urls import path, re_path

from . import views

urlpatterns = [
    path("404", views.status_404, name="404"),
    path("_404", views.status_404, name="404"),
    path("", views.index, name="index"),
	path("main", views.index, name="main"),
    path("_main", views.main, name="main"),
    path("login", views.index, name="login"),
    path("_login", views.loginUser, name="login"),
    path("signup", views.index, name="signup"),
    path("_signup", views.signup, name="signup"),
    path("logout", views.logoutUser, name="logout"),
    #path("dashboard", views.index, name="dashboard"),
    #path("_dashboard", views.dashboard, name="dashboard"),
    path("settings", views.index, name="settings"),
    path("_settings", views.settings, name="settings"),
    path("pong", views.index, name="pong"),
    path("_pong", views.pong, name="pong"),
    path("postLogin", views.loginUser, name="postLogin"),
    path("postSignup", views.signup, name="postSignup"),

    re_path(r'^.*$', views.index, name='catch_all'),
]
