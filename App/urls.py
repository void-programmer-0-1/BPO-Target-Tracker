from django.urls import path
from . import views

app_name = "App"

urlpatterns = [
    path("", views.home,name="home"),
    path("form/",views.Targetform,name="Targetform"),
    path("ograph/",views.OGraphData,name="OGraphData"),
    path("graphs/",views.OGraph,name="OGraph"),
    path("formdata/",views.TargetFormData,name="formdata"),
]
