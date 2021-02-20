from django.db import models
from django.dispatch import receiver
from django.utils.translation import ugettext_lazy as _
import os
import shutil
from django.utils import timezone,dateformat
timestamp_now=timezone.now()
formatted_date = dateformat.format(timezone.now(), 'Y-m-d H:i:s')
from datetime import datetime 

def UploadedConfigPath(instance, filename):
        timestamp_now=timezone.now()
        formatted_date = dateformat.format(timezone.now(), 'Y-m-d H:i:s')
        return os.path.join(instance.project, dateformat.format(datetime.now(), 'Y-m-d H:i:s'), filename)

# need another model which holds all the uploaded files
class All_files(models.Model):

    file3 = models.FileField(blank=True, null=True)
    file4 = models.FileField(blank=True, null=True)

class fileModel(models.Model):

    # this data is used to order the datasets on the frontend
    project = models.CharField(default='test',max_length=200)
    user_grouping = models.CharField(default='irods',max_length=200)
    pipeline = models.CharField(default='irods', max_length=500)
    timestamp = models.DateTimeField(default=datetime.now)

    # these are all the files that may be visualised on the frontend.
    Metadata_PDF = models.FileField(default=None,blank=False, null=False,upload_to=UploadedConfigPath)
    Metadata_CellCount = models.FileField(default=None,blank=False, null=False,upload_to=UploadedConfigPath)
    Metadata_CSV = models.FileField(default=None, blank=False, null=False,upload_to=UploadedConfigPath)
    Deconvolution_File = models.FileField(default=None,blank=True, null=True,upload_to=UploadedConfigPath)
    QC_metrics_JPGs = models.FileField(default=None,blank=True, null=True,upload_to=UploadedConfigPath)
    QC_metrics_PDFs1 = models.FileField(default=None,blank=True, null=True,upload_to=UploadedConfigPath)
    QC_metrics_PDFs2 = models.FileField(default=None,blank=True, null=True,upload_to=UploadedConfigPath)

@receiver(models.signals.post_delete, sender=fileModel)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding `fileModel` object is deleted.

    Users can delete entire project, entire timestamp or different files
    """
    path_to_delete=""
    try:
        path_to_delete=instance.Metadata_PDF.path
    except:
        path_to_delete=instance.Deconvolution_File.path

    if dateformat.format(instance.timestamp,'Y-m-d H:i:s'):  
        path2 = path_to_delete.split("/")
        path2.pop()
        path3='/'.join(path2)
        shutil.rmtree(path3) 
        # check if the project directory is empty, if it is then remove it
        path2.pop()
        path_project='/'.join(path2)
        try:
            os.rmdir(path_project)
        except:
            _ = "dir not empty"

# @receiver(models.signals.pre_save, sender=fileModel)
# def auto_delete_file_on_change(sender, instance, **kwargs):
#     """
#     Deletes old file from filesystem
#     when corresponding `MediaFile` object is updated
#     with new file.
#     """
#     if not instance.pk:
#         return False

#     try:
#         old_file = fileModel.objects.get(pk=instance.pk).file
#     except fileModel.DoesNotExist:
#         return False

#     new_file = instance.file
#     if not old_file == new_file:
#         if os.path.isfile(old_file.path):
#             os.remove(old_file.path)