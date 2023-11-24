from django.urls import path

from . import views

urlpatterns = [
    path("404", views.status_404, name="404"),
    path("", views.index, name="index"),
	path("main", views.main, name="main"),
    path("login", views.loginUser, name="login"),
    path("signup", views.signup, name="signup"),
]
