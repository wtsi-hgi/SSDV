from django.contrib import admin
from .models import Allowed_User
from .models import Project_Name


class Project_NameInline(admin.StackedInline):
    model = Allowed_User
    extra = 1

class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['project']}),
        ('Allowed User', {'fields': ['project'], 'classes': ['collapse']}),
    ]
    inlines = [Project_NameInline]


admin.site.register(Allowed_User)
admin.site.register(Project_Name)


# class Project_Name(models.Model):
#     project_name = models.CharField(max_length=300)

# class Allowed_User(models.Model):
#     project_name = models.ForeignKey(Project_Name,on_delete=models.CASCADE)
#     username = models.CharField(max_length=200)

# class Question(models.Model):
#     question_text = models.CharField(max_length=200)
#     pub_date = models.DateTimeField('date published')


# class Choice(models.Model):
#     question = models.ForeignKey(Question)
#     choice_text = models.CharField(max_length=200)
#     votes = models.IntegerField(default=0)
