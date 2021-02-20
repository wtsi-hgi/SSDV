from django.shortcuts import render
from browserApp.serializers import GroupSerializer, UserSerializer
# Create your views here.
from rest_framework import routers, serializers, viewsets
from django.contrib.auth.models import User, Group
from backend import settings
import os
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework import views
# ViewSets define the view behavior.
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import fileModel
from rest_framework import status
from .serializers import FileSerializer


class UserViewSet(viewsets.ModelViewSet):
    # url = serializers.HyperlinkedIdentityField(view_name="api:user")
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class Existing_File_Viewset(viewsets.ModelViewSet):
    queryset = fileModel.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = FileSerializer

# class FileView(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def post(self, request, *args, **kwargs):
#       file_serializer = FileSerializer(data=request.data)
#       if file_serializer.is_valid():
#         file_serializer.save()
#         return Response(file_serializer.data, status=status.HTTP_201_CREATED)
#       else:
#         return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



