#!/bin/bash

python manage.py collectstatic --noinput

python manage.py makemigrations app
python manage.py migrate

python manage.py runmodwsgi --user www-data --group www-data --log-to-terminal