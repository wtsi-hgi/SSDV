from rest_framework import routers
from .views import UserViewSet, GroupViewSet,Existing_File_Viewset
from django.urls import re_path, path, include
from django.conf.urls import url

router=routers.DefaultRouter()
router.register('user',UserViewSet,'user')
router.register('group',GroupViewSet,'group')
router.register('files',Existing_File_Viewset,'files')
# router.register('upload', FileView.as_view(), name='file-upload')

urlpatterns = [
    # ...
    # url(r'upload', FileView.as_view(), name='file-upload'),
    re_path('', include((router.urls))),

]
