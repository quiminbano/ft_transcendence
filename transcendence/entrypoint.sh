#!/bin/bash

mkdir -p /var/www/transcendence/media

python manage.py collectstatic --noinput

python manage.py makemigrations api
python manage.py migrate

cat auth.py | python manage.py shell

python manage.py runmodwsgi --user www-data --group www-data --log-to-terminal --reload-on-changes
