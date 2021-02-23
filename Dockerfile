# [Choice] Python version: 3, 3.8, 3.7, 3.6

# FROM nikolaik/python-nodejs:python3.9-nodejs15-slim
FROM node

WORKDIR /nodebuild
COPY /frontend/ /nodebuild/frontend/
RUN cd frontend &&npm i webpack webpack-cli --save-dev && npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev && npm i react react-dom --save-dev

ADD .env /nodebuild
RUN export $(grep -v '^#' .env | xargs) 
RUN cd frontend &&npm i webpack webpack-cli --save-dev && npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev && npm i react react-dom --save-dev
RUN cd frontend && npm install
RUN cd frontend && npm run build


FROM tiangolo/uwsgi-nginx
EXPOSE 8081
ENV PYTHONUNBUFFERED=1
ENV HOME=/app
ENV APP_HOME=/app/backend
WORKDIR /app
COPY requirements.txt /app/
RUN pip install -r requirements.txt
COPY /frontend/ /app/frontend/
COPY manage.py /app/
COPY /backend/ /app/backend/
COPY /browserApp/ /app/browserApp/
COPY uwsgi.ini /app/
ENV UWSGI_INI /app/uwsgi.ini
COPY .env /app/
RUN export $(grep -v '^#' .env| xargs)
RUN rm /app/.env
COPY --from=0 /nodebuild/frontend/static/frontend /app/frontend/static/frontend
# RUN apt-get update -y && apt-get install nodejs -y
# RUN cd frontend &&npm i webpack webpack-cli --save-dev && npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev && npm i react react-dom --save-dev
# RUN cd frontend && npm install
# RUN cd frontend && npm run build
RUN python3 manage.py collectstatic --noinput
# RUN cd frontend && npm i redux react-redux redux-thunk redux-devtools-extension