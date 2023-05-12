# (SSDV) Summary Statistics: Data Visualiser
This file repo is used to produce a production version of the Django, Postgres, ReactJS app - we use uwsgi - (alternitively gunicorn can be used, however we have chosen to use uwsgi as it has many benifits for fast interactions). A multi stage build is utilised to reduce the image size for the production version which. (More detailed info about the deployment is [available here](https://confluence.sanger.ac.uk/x/yo4KAg).

This web app is intended to provide users with a quick and easy way to access the important plots and datasets that are generated by pipelines. The websites design is based on the same principles as https://www.manchesterproteome.manchester.ac.uk/#/ providing a powerful backend computations powered by python and django and scalable frontetend with class based components design.

Website is written in a dynamic maner i.e its not dependant on hard paths or specific folder structures and is capable in visalising 1) Different projects, 2) Different subfolders and 3) Different sub-sub folders, as per example belolow (data types capable in displaying: PDF, xml, html, png, gpg, csv, tsv):
<p align="center">
  <img src="https://github.com/wtsi-hgi/scRNA_webBrowser/blob/1.47/illutrator_files/sample.png" width="70%"/>
</p>
In this example Conect_Val is a tranche, celltype-assignment = sub-folder, prediction score upap = sub,sub-folder.

For the particular website the higher the number in the branch the more recent version of the website is. Currently version 1.47 operates the https://apps.hgi.sanger.ac.uk/scrna

The interface is developed using React frontend and Django backend which are integrated and wrapped up in a docker container (for Django and React integration please refer to tutorials, which will also provide a [crash course in how to expand the app](https://www.youtube.com/watch?embeds_referring_euri=https%3A%2F%2Fconfluence.sanger.ac.uk%2F&source_ve_path=MTY0OTksMjg2NjQsMTY0NTAz&feature=emb_share&v=Uyei2iDA4Hs&ab_channel=TraversyMedia)): 

!! When deploying in devcontainer please change your mount directory [here](https://github.com/wtsi-hgi/SSDV/blob/414790362d41de78d40fb9f10e34d8f6ac6c98d7/.devcontainer/docker-compose.yml#LL21C23-L21C23):, as well as the database mount point path (here)[https://github.com/wtsi-hgi/SSDV/blob/414790362d41de78d40fb9f10e34d8f6ac6c98d7/.devcontainer/docker-compose.yml#LL40C13-L40C13]

The app is then deployed using swarm and Nginx. For the purpose of expansion we have also integrated a postgres database that is capable to interact with django and allows content management of the website, however currently app is not utilizing the database for the content management. The code of the website is available https://github.com/wtsi-hgi/scRNA_webBrowser

Template can be used to deploy any other Django, React, Postgres apps in production with uWSGI and in the subfolders (hence hosting multiple apps on the same server - as per swarm).

# Frontend:
\
[Frontend](https://github.com/wtsi-hgi/scRNA_webBrowser/tree/new_interface/app/frontend) in developed a modular design of React class based components. For styling we have used a combination of [Bootstrap](https://getbootstrap.com/docs/) and [Materials UI](https://material-ui.com/). For the routing on the frontend we use Browser BrowserRouter from [react-router-dom](https://reactrouter.com/web/api/BrowserRouter). 
\
# Backend:
\
[Backend](https://github.com/wtsi-hgi/scRNA_webBrowser/tree/new_interface/app/backend) is developed using Django and Django-rest api which delivers the content to the frontend.

For Django deployment we have used [uwsgi](https://uwsgi-docs.readthedocs.io/en/latest/) since it provides a fast interactions and no latency: 

Since we are deploying multiple apps on a subpaths using swarm additional configurations had to be made to make Django form the paths accordingly.


Originally written by M.Ozols

