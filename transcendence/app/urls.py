from django.urls import path

from . import views

urlpatterns = [
    path("404", views.status_404, name="404"),
    path("", views.index, name="index"),
	path("main", views.index, name="main"),
    path("login", views.index, name="login"),
    path("postLogin", views.loginUser, name="postLogin"),
    path("signup", views.index, name="signup"),
    path("get-template/<path:route>", views.get_template, name="get-template"),
]
