from django.urls import path
from . import views

app_name = "App"

urlpatterns = [
    path("", views.home,name="home"),
    path("login/", views.loginUser,name="loginUser"),
    path("logout/",views.logoutUser,name="logoutUser"),
    path("register/", views.registerUser,name="registerUser"),
    path("form/",views.Targetform,name="Targetform"),
    path("ograph/",views.OGraphData,name="OGraphData"),
    path("graphs/",views.OGraph,name="OGraph"),
    path("formdata/",views.TargetFormData,name="formdata"),
]
