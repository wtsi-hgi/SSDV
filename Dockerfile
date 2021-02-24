# [Choice] Python version: 3, 3.8, 3.7, 3.6

# FROM nikolaik/python-nodejs:python3.9-nodejs15-slim
FROM node

WORKDIR /nodebuild
COPY /app/frontend/ /nodebuild/frontend/
RUN cd frontend &&npm i webpack webpack-cli --save-dev && npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev && npm i react react-dom --save-dev

ADD .env /nodebuild
RUN export $(grep -v '^#' .env | xargs) 
RUN cd frontend &&npm i webpack webpack-cli --save-dev && npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev && npm i react react-dom --save-dev
RUN cd frontend && npm install
RUN cd frontend && npm run build


FROM tiangolo/uwsgi-nginx
ENV PATH="/scripts:${PATH}"
COPY ./requirements.txt /requirements.txt
WORKDIR /app
RUN pip install -r /requirements.txt
COPY ./app /app
ENV UWSGI_INI uwsgi.ini
COPY .env /app/
COPY ./scripts /scripts
COPY ./uwsgi.ini /uwsgi.ini
RUN chmod +x /scripts/*

COPY --from=0 /nodebuild/frontend/static/frontend /app/frontend/static/frontend
RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static
RUN chmod -R 755 /vol/web
RUN python3 manage.py collectstatic --noinput
CMD ["entrypoint.sh"]