from django.urls import path
from . import views

urlpatterns=[    
    path('',views.index),
    path('info',views.index),
    path('Cumulative_Stats',views.index)
]
