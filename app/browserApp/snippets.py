from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as pd
import os
from glob import glob
from backend.settings import MEDIA_ROOT,MEDIA_URL

def edit_metadata(metadata,All_Data_for_stats,Experiment_Name,TSV_Name,column):
    # print('metadata')
    # metadata={}
    All_Data_for_stats=All_Data_for_stats.to_dict()
    try:
       metadata[Experiment_Name][TSV_Name][column]=All_Data_for_stats
    except:
        try:
            metadata[Experiment_Name][TSV_Name]={}
            metadata[Experiment_Name][TSV_Name][column]=All_Data_for_stats
        except:
            try:
                metadata[Experiment_Name]={}
                metadata[Experiment_Name][TSV_Name]={}
                metadata[Experiment_Name][TSV_Name][column]=All_Data_for_stats
            except:
                _='something went wrong, investigate this.'         
    return metadata
    

@api_view(['GET'])
def retrieve_files(request):
    # this function takes in the api inputs and filters the domains that the protein contains and retrieves it back to the user.
    # subsequently user will be able to perform susceptibility calculations per domain on fly in the frontend
    # written by M.Ozols
    try:
        user =request.environ['UWSGI_USER']
    except:
        user ='user'

    if request.method == 'POST':
        return Response({"message": "Got some data!", "data": request.data})
    if request.method == 'GET':
        # here list alll the drectories that are present in the dedicated storage folder
        # we send in the querry param to locate which project we should display to user.
        all_projects = glob(f'{MEDIA_ROOT}/*')
        Other_projects = list(pd.Series(all_projects).str.split('/').str[-1])
        project_selector = request.query_params['project']
        if(project_selector=='null'):
            # this is when user first access the website, it will default to the first project.
            project_to_use=all_projects[0]
            project_in_use=project_to_use.split('/')[-1]
        else:
            project_in_use=project_selector
            project_to_use=(f'{MEDIA_ROOT}/{project_selector}')
            # this is where we select the specific project user is looking for.
        dataset={}
        dataset2={}
        metadata={}
        for experiment in glob(f'{project_to_use}/*'):
            Unix_timestamp_modified =os.path.getmtime(experiment) 
            Experiment_Name =  (experiment.split('/')[-1])
            dataset[Experiment_Name] = {}
            for pipeline in glob(f'{experiment}/*'):
                Pipeline_Name =  (pipeline.split('/')[-1])
                # For the csv and tsv files in 'Summary' folder, we extract the numeric metadata for the experiment.
                if(Pipeline_Name=='Summary' or Pipeline_Name=='Fetch Pipeline'):
                    all_tsv_files =[]
                    for root, dirs, files in os.walk(pipeline):
                        for file in files:
                            if file.endswith('.tsv'):
                                all_tsv_files.append(f'{root}/{file}')
                    # now loop through each of the tsv files and extract all the numeric data.
                    # print('these are the summary plots')
                    for tsv_file in all_tsv_files:
                        # print(tsv_file)
                        TSV_Name = tsv_file.split('/')[-1].split('.')[0]
                        Data = pd.read_csv(tsv_file,sep='\t',index_col=0)
                        if(len(Data.columns)==0):
                            Data = pd.read_csv(tsv_file,sep=',',index_col=0)
                        for column in Data:
                            All_Data_for_stats = Data[column]
                            if (pd.to_numeric(All_Data_for_stats, errors='coerce').notnull().all()):
                                # this is where everything is numeric.
                                metadata = edit_metadata(metadata,All_Data_for_stats,Experiment_Name,TSV_Name,column)
                            else:
                                # if all not numeric, then replace the , and % and check again.
                                All_Data_for_stats = All_Data_for_stats.str.replace(',','').replace('%','')
                                if (pd.to_numeric(All_Data_for_stats, errors='coerce').notnull().all()):
                                    metadata = edit_metadata(metadata,All_Data_for_stats,Experiment_Name,TSV_Name,column)
                                
                            


                            All_Data_for_stats


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
        dataset2['experiment_in_use']=project_in_use
        dataset2['other_available_experiments']=Other_projects
        dataset2['all_experiment_data']=dataset
        dataset2['metadata']=metadata
        dataset2['user']=user
        return Response({"dataset":dataset2})

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


