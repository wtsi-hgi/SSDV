#!/bin/sh

set -e

python manage.py collectstatic --noinput
echo "Apply database migrations"
python manage.py makemigrations
python manage.py migrate
uwsgi --socket :8000 --master --enable-threads --static-map /static=/vol/static --module backend.wsgi

# uwsgi --socket subdirectories.sock --master --enable-threads --module backend.wsgi
# uwsgi --socket :8000 --module backend.wsgi --route-run="fixpathinfo:"
# uwsgi --ini /app/uwsgi.ini