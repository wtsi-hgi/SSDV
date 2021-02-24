# scRNA_webBrowser
This file repo is used to produce a production version of the app - we use uwsgi - alternitively gunicorn can be used. A multi stage build is utilised to reduce the image size. 

Currently th app works if using a proxy nginx folder configuration with Dockerfile, however this is not possible for the production setup.

Also we need to use ugwi.sock files to enable the sub folder routing.

To test whether the app works some usefull comands are:
    docker-compose -f docker-compose_prod.yml up
    docker-compose -f docker-compose_prod.yml down
    docker ps -a