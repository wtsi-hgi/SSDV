# [Choice] Python version: 3, 3.8, 3.7, 3.6
FROM nikolaik/python-nodejs:python3.9-nodejs15-slim
EXPOSE 8081
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements.txt /app/
RUN pip install -r requirements.txt
COPY /frontend/ /app/frontend/
COPY manage.py /app/
COPY /backend/ /app/backend/
COPY /browserApp/ /app/browserApp/
COPY /media/ /app/media/
COPY .env /app/
RUN export $(grep -v '^#' .env| xargs)
RUN rm /app/.env

# RUN apt-get update -y && apt-get install nodejs -y
# RUN cd frontend &&npm i webpack webpack-cli --save-dev && npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev && npm i react react-dom --save-dev
RUN cd frontend && npm run build
RUN python manage.py collectstatic --noinput
# RUN cd frontend && npm i redux react-redux redux-thunk redux-devtools-extension