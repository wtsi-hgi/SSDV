from django.urls import path
from . import views

urlpatterns=[    
    path('',views.index),
    path('info',views.index),
    path('Cummulitive_Stats',views.index)
]
