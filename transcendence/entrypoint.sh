#!/bin/bash

python manage.py collectstatic --noinput

python manage.py makemigrations app
python manage.py migrate

cat auth.py | python manage.py shell

python manage.py runmodwsgi --user www-data --group www-data --log-to-terminal --reload-on-changes
