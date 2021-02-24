#!/bin/sh

set -e

python manage.py collectstatic --noinput

# uwsgi --socket :8000 --master --enable-threads --module backend.wsgi
# uwsgi --socket subdirectories.sock --master --enable-threads --module backend.wsgi
uwsgi --socket :8000 --module backend.wsgi --route-run="fixpathinfo:"
# uwsgi --ini /app/uwsgi.ini