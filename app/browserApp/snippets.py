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
                # these are all the plots in the directory, since we have a sub structure, we also loop through to dettect any underlying substructures          
                dataset[Experiment_Name][Pipeline_Name]={}
                dataset[Experiment_Name][Pipeline_Name]['plots']=[]
                dataset[Experiment_Name][Pipeline_Name]['sub_dirs']={}
                count=0
                # this loops through subdirectories.
                for dir in os.walk(f'{pipeline}/'):
                    if(count==0):
                        next
                    else:
                        dir1 = dir[0]
                        Subdir_Name =  (dir1.split('/')[-1])
                        dataset[Experiment_Name][Pipeline_Name]['sub_dirs'][Subdir_Name]=[]
                        for plot_name in glob(f'{dir1}/*.*'):
                            plot_name = plot_name.replace(MEDIA_ROOT+'/',MEDIA_URL) 
                            dataset[Experiment_Name][Pipeline_Name]['sub_dirs'][Subdir_Name].append(plot_name)
                    count+=1
                
                # this loops through only the first type of plots.
                for plot_name in glob(f'{pipeline}/*.*'):
                    plot_name = plot_name.replace(MEDIA_ROOT+'/',MEDIA_URL)
                    dataset[Experiment_Name][Pipeline_Name]['plots'].append(plot_name)

            dataset[Experiment_Name]['Unix_timestamp_modified']=Unix_timestamp_modified
        return Response({"dataset":dataset})

@api_view(['GET'])
def json_retrieve(request):
    import json
    if request.method == 'GET':
        link = request.query_params.get('link')
        link = link.replace(MEDIA_URL,MEDIA_ROOT+'/')
        with open(link, 'r') as myfile:
            All_proteins=myfile.read()
        All_proteins=json.loads(All_proteins)   
        return Response({"dataset":All_proteins})


