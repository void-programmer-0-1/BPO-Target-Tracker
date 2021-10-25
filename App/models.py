from django.db import models
from datetime import datetime
from django.contrib.auth.models import User

class TargetModel(models.Model):

    work_shift = [
        ("Morning","Morning"),
        ("Afternoon","Afternoon"),
    ]

    date = models.DateField(default=datetime.now().date())
    time = models.TimeField(default=datetime.now().time(),editable=True)
    target = models.SmallIntegerField()
    achieved = models.SmallIntegerField()
    error = models.SmallIntegerField(default=0)
    work_time = models.CharField(choices=work_shift,max_length=20)
    user = models.ForeignKey(User,on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user) + "-" + str(self.date)

