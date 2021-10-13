from django.shortcuts import render
from .models import TargetModel
from django.http import HttpResponseRedirect,HttpResponse
from django.core import serializers
from .forms import TargetModelForm
import json


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

def Targetform(request):
    
    querySet = None
    date = request.session["date"]
    shift = request.session["shift"]

    try:
        querySet = TargetModel.objects.get(date=date,work_time=shift)
    except:
        querySet = None

    form = TargetModelForm(instance=querySet)

    if request.method == "POST":
        form = TargetModelForm(request.POST,instance=querySet)
        
        if form.is_valid():
            form.save()
   
    context = {
        "form" : form,
        "date" : date,
        "shift" : shift
    }

    return render(request,"form.html",context)


def TargetFormData(request):

    if request.method == "GET":
        try:
            data = TargetModel.objects.get(date=request.session["date"],work_time=request.session["shift"])
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

def OGraphData(request):
    
    if request.method == "GET":
        all_data = TargetModel.objects.all()
        all_data_json = serializers.serialize('json', all_data)
        return HttpResponse(all_data_json)


def OGraph(request):

    return render(request,"ographs.html")