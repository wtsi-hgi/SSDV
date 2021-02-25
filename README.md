# scRNA_webBrowser
This file repo is used to produce a production version of the app - we use uwsgi - (alternitively gunicorn can be used, however we have chosen to use uwsgi as it has many benifits for fast interactions). A multi stage build is utilised to reduce the image size for the production version which. 

Currently th app works if using a proxy nginx folder configuration with Dockerfile, however this is not possible for the production setup.

Also we need to use ugwi.sock files to enable the sub folder routing.

To test whether the app works some usefull comands are:
***
    docker-compose -f docker-compose_prod.yml --build
    docker-compose -f docker-compose_prod.yml down
    docker ps -a
***

If the small changes in the apps JSX code are not updated this means that docker volumes are not being overwritten. To resolve this you can do the folowing command (use with caution in production servers as you would not want to remove other important permentent data storages for other apps):

    docker volume rm Volume_Name