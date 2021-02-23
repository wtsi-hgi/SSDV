# Generated by Django 3.1.6 on 2021-02-20 01:48

import browserApp.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('browserApp', '0004_auto_20210220_0138'),
    ]

    operations = [
        migrations.AlterField(
            model_name='filemodel',
            name='Metadata_CSV',
            field=models.FileField(blank=True, default=None, null=True, upload_to=browserApp.models.UploadedConfigPath),
        ),
        migrations.AlterField(
            model_name='filemodel',
            name='Metadata_CellCount',
            field=models.FileField(blank=True, default=None, null=True, upload_to=browserApp.models.UploadedConfigPath),
        ),
        migrations.AlterField(
            model_name='filemodel',
            name='Metadata_PDF',
            field=models.FileField(blank=True, default=None, null=True, upload_to=browserApp.models.UploadedConfigPath),
        ),
    ]