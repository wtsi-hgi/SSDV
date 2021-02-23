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
        return os.path.join(instance.project,instance.user_grouping,instance.pipeline, dateformat.format(datetime.now(), 'Y-m-d H:i:s'), filename)

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
    Metadata_PDF = models.FileField(default=None,blank=True, null=True,upload_to=UploadedConfigPath)
    Metadata_CellCount = models.FileField(default=None,blank=True, null=True,upload_to=UploadedConfigPath)
    Metadata_CSV = models.FileField(default=None, blank=True, null=True,upload_to=UploadedConfigPath)
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
    all_files = ["Metadata_PDF",
    "Metadata_CellCount",
    "Metadata_CSV",
    'Deconvolution_File',
    'QC_metrics_JPGs',
    'QC_metrics_PDFs1',
    'QC_metrics_PDFs2'
    ]



    for file_entity in all_files:
        
        
        path_to_delete = instance.__dict__[file_entity]
        if instance.__dict__[file_entity]!='':
            if dateformat.format(instance.timestamp,'Y-m-d H:i:s'):  
                path2 = path_to_delete.split("/")
                path2.pop()
                path3=os.getcwd()+'/media/'+'/'.join(path2)

                try:
                    shutil.rmtree(path3)
                except:
                    _="this error happens if pertial delete happened before (ie- files deleted from serer but not database)"
                # check if the project directory is empty, if it is then remove it
                path_propagation = path3.split("/")
                for i in range(len(path_propagation), 2, -1):
                    path_project='/'.join(path_propagation)
                    
                    path_propagation.pop()
                    try:
                        os.rmdir(path_project)
                    except:
                        _ = "dir not empty"
                break

           