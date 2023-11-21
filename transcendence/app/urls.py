from django.urls import path

from . import views

urlpatterns = [
    path("404", views.status_404, name="404"),
    path("", views.index, name="index"),
<<<<<<< HEAD
	path("scores", views.scores, name="scores"),
=======
    path("main", views.main, name="main"),
    path("login", views.login, name="login"),
>>>>>>> e3927fdde6b36f80ffc298d5c95857378feaa9ee
]
