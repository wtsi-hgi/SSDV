from django.contrib.auth.models import User, Group
from rest_framework import serializers
from browserApp.models import fileModel,All_files,Allowed_User


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Allowed_User
        fields = ['project_name', 'username']



class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']

class Files_all(serializers.ModelSerializer):
    class Meta:
        model = All_files
        fields = '__all__' 

class FileSerializer(serializers.ModelSerializer):
    # action = serializers.SerializerMethodField(method_name="get_data_for_action")
    
    class Meta():
        model = fileModel
        fields = '__all__'
        ordering = ['timestamp']
    #     extra_fields = ['All_Files__file3']

    # def get_field_names(self, declared_fields, info):
    #     expanded_fields = super(FileSerializer, self).get_field_names(declared_fields, info)
    #     if getattr(self.Meta, 'extra_fields', None):
    #         return expanded_fields + self.Meta.extra_fields
    #     else:
    #         return expanded_fields
