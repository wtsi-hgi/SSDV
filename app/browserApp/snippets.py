from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as pd
import os
from glob import glob
from backend.settings import MEDIA_ROOT,MEDIA_URL

@api_view(['GET'])
def hello_world(request):
    # this function takes in the api inputs and filters the domains that the protein contains and retrieves it back to the user.
    # subsequently user will be able to perform susceptibility calculations per domain on fly in the frontend
    # written by M.Ozols

    if request.method == 'POST':
        return Response({"message": "Got some data!", "data": request.data})
    if request.method == 'GET':
        # here list alll the drectories that are present in the dedicated storage folder
        dataset={}
        for experiment in glob(f'{MEDIA_ROOT}/*'):
            Unix_timestamp_modified =os.path.getmtime(experiment) 
            Experiment_Name =  (experiment.split('/')[-1])
            dataset[Experiment_Name] = {}
            for pipeline in glob(f'{experiment}/*'):
                Pipeline_Name =  (pipeline.split('/')[-1])
                for plot_name in glob(f'{pipeline}/*'):
                    plot_name = plot_name.replace(MEDIA_ROOT+'/',MEDIA_URL)
                    try:
                        dataset[Experiment_Name][Pipeline_Name].append(plot_name)
                    except:
                        dataset[Experiment_Name][Pipeline_Name]=[]
                        dataset[Experiment_Name][Pipeline_Name].append(plot_name)
            dataset[Experiment_Name]['Unix_timestamp_modified']=Unix_timestamp_modified
        return Response({"dataset":dataset})
