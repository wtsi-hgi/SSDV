from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from . import views
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView
router = routers.DefaultRouter()


urlpatterns = [
    path('', include('frontend.urls')),
    path('favicon.ico', RedirectView.as_view(url=staticfiles_storage.url('frontend/favicon.ico'))),
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api_scrna/',include('browserApp.urls')),
    
    
    
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)



