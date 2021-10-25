from django.contrib.auth.models import User
from django.shortcuts import render
from .models import TargetModel
from django.http import HttpResponseRedirect,HttpResponse
from django.core import serializers
from .forms import TargetModelForm,UserRegisterForm
import json
from django.contrib import messages
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required


@login_required(login_url="/app/login")
def logoutUser(request):
    logout(request)
    return HttpResponseRedirect("/app/login")


def loginUser(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect("/app/")
    
    else:
        if request.method == "POST":
            username = request.POST.get("username")
            password = request.POST.get("password")

            user = authenticate(request,username=username,password=password)

            if user is not None:
                login(request,user)
                return HttpResponseRedirect("/app/")
            else:
                messages.info(request,"Username or Password is incorrect da punda")
                
        return render(request,"login.html")


def registerUser(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect("/app/")
    
    else:
        form = UserRegisterForm()

        if request.method == "POST":
            form = UserRegisterForm(request.POST)
            if form.is_valid():
                form.save()
                username = form.cleaned_data.get("username")
                messages.success(request,"Account created for suthu koolupu pudicha {}".format(username))
                return HttpResponseRedirect("/app/login")
        
        context = {"form":form}
        
        return render(request,"register.html",context)

@login_required(login_url="/app/login")
def home(request):

    date = None
    shift = None
    
    if request.method == "POST":
        date = request.POST.get("date",None)
        shift = request.POST.get("shift",None)

        request.session["date"] = date
        request.session["shift"] = shift

        return HttpResponseRedirect("/app/form")
        

    request.session["date"] = date
    request.session["shift"] = shift

    return render(request,"home.html",None)

@login_required(login_url="/app/login")
def Targetform(request):
    
    querySet = None
    date = request.session["date"]
    shift = request.session["shift"]
    user = User.objects.get(username=request.user.username)
    
    try:
        querySet = TargetModel.objects.get(date=date,work_time=shift,user=user)
    except:
        querySet = None

    form = TargetModelForm(instance=querySet)

    if request.method == "POST":
        
        form = TargetModelForm(request.POST,instance=querySet)
        
        if form.is_valid():
            form = form.save(commit=False)
            form.user = user
            form.save()
            return HttpResponseRedirect("/app/form")
   
    context = {
        "form" : form,
        "date" : date,
        "shift" : shift
    }

    return render(request,"form.html",context)

@login_required(login_url="/app/login")
def TargetFormData(request):

    if request.method == "GET":
        user = User.objects.get(username=request.user.username)
        try:
            data = TargetModel.objects.get(date=request.session["date"],work_time=request.session["shift"],user=user)
            print("data :: ",data)
            
            data = {
                "target" : data.target,
                "achieved" : data.achieved,
                "error" : data.error
            }
            data = json.dumps(data,indent=4)
            return HttpResponse(data)

        except:
            data = {
                "target" : 0,
                "achieved" : 0,
                "error" : 0
            }
            data = json.dumps(data,indent=4)
            return HttpResponse(data)

@login_required(login_url="/app/login")
def OGraphData(request):
    
    if request.method == "GET":
        user = User.objects.get(username=request.user.username)
        all_data = TargetModel.objects.filter(user=user)
        all_data_json = serializers.serialize('json', all_data)
        return HttpResponse(all_data_json)

@login_required(login_url="/app/login")
def OGraph(request):

    return render(request,"ographs.html")