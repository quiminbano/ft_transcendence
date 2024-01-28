#!/bin/bash

python manage.py collectstatic --noinput

python manage.py makemigrations api
python manage.py migrate

cat auth.py | python manage.py shell

python manage.py runmodwsgi --user www-data --group www-data \
    --host 0.0.0.0 --port 8000 --https-port 443 \
    --ssl-certificate /etc/apache2/ssl/ssl \
    --server-name localhost --allow-localhost \
    --log-to-terminal --reload-on-changes
