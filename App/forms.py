from django import forms
from django.forms import ModelForm
from django.forms.widgets import TextInput,TimeInput
from .models import TargetModel
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


class UserRegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username','email','password1','password2']

class TargetModelForm(ModelForm):

    class Meta:
        model = TargetModel
        fields = ["target","achieved","error","work_time","date","time"]
    
    def __init__(self,*args,**kwargs):
        super(TargetModelForm,self).__init__(*args,**kwargs)
        
        self.fields["target"].widget = TextInput(
            attrs={
                "id":"target",
                "class":"form-control",
                "placeholder":"Enter Target"
            }
        )

        self.fields["achieved"].widget = TextInput(
            attrs={
                "id":"achieved",
                "class":"form-control",
                "placeholder":"Enter Achievement"
            }
        )

        self.fields["error"].widget = TextInput(
            attrs={
                "id":"error",
                "class":"form-control",
                "placeholder":"Enter Error",
            }
        )

        self.fields['work_time'].widget.attrs.update({
                "id":"work-time",
                "class":"form-select",
        })

        self.fields["date"].widget = forms.SelectDateWidget(
            attrs={
                "id":"date",
                "class":"form-control mb-2",
                "placeholder":"date"
            }
        )

        self.fields["time"].widget = TimeInput(
            attrs={
                "id":"time",
                "class":"form-control",
                "placeholder":"time"
            }
        )