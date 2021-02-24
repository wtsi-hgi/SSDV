# FROM nginxinc/nginx-unprivileged:1-alpine

# COPY ./default.conf /etc/nginx/conf.d/default.conf
# COPY ./uwsgi_params /etc/nginx/uwsgi_params

# USER root

# RUN mkdir -p /vol/static
# RUN chmod 755 /vol/static

# USER nginx




FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
# COPY my_nginx.conf /etc/nginx/sites-available/

# RUN mkdir -p /etc/nginx/sites-enabled/\
#     && ln -s /etc/nginx/sites-available/my_nginx.conf /etc/nginx/sites-enabled/
# RUN mkdir -p /vol/static
# RUN chmod 755 /vol/static
# RUN mkdir -p /etc/nginx/sites-enabled/\
#     && ln -s /etc/nginx/sites-available/my_nginx.conf /etc/nginx/sites-enabled/\
#     && rm /etc/nginx/conf.d/default.conf

# CMD ["nginx", "-g", "daemon off;"]