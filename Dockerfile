# Here we are using multi stage build to get the app work in production,
# Esentially what this means is that we use a container to build a front end firs and then load the output in a final container.

FROM node

WORKDIR /nodebuild
COPY ./app/frontend/ /nodebuild/frontend/
ADD .env /nodebuild
RUN export $(grep -v '^#' .env | xargs) 
RUN cd frontend &&npm i webpack webpack-cli --save-dev && npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev && npm i react react-dom --save-dev
RUN cd frontend && npm install
RUN cd frontend && npm run build
RUN ls -l /nodebuild/frontend
RUN ls -l /nodebuild/frontend/src
RUN ls -l /nodebuild/frontend/static/frontend

FROM tiangolo/uwsgi-nginx
ENV PATH="/scripts:${PATH}"
COPY ./requirements.txt /requirements.txt
WORKDIR /app
RUN pip install -r /requirements.txt
COPY ./app /app
# ENV UWSGI_INI uwsgi.ini
COPY .env /app/
RUN rm -r /app/frontend
COPY ./scripts /scripts
RUN chmod +x /scripts/*

COPY --from=0 /nodebuild/frontend/static/frontend/main.js /app/frontend/static/frontend/main.js


RUN ls -l /app/frontend/static/frontend/
RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static

RUN chmod -R 755 /vol/web
RUN ls -l /vol/web/static
RUN python manage.py collectstatic --noinput
RUN ls -l /vol/web/static/frontend
CMD ["entrypoint.sh"]