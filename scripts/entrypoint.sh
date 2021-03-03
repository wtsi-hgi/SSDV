#!/bin/sh

set -e

python manage.py collectstatic --noinput
echo "Apply database migrations"
python manage.py makemigrations
python manage.py migrate
uwsgi --master --enable-threads

# uwsgi --socket subdirectories.sock --master --enable-threads --module backend.wsgi
# uwsgi --socket :8000 --module backend.wsgi --route-run="fixpathinfo:"
# uwsgi --ini /app/uwsgi.ini