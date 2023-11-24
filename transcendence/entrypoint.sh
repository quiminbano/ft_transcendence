#!/bin/bash

python manage.py collectstatic --noinput

python manage.py makemigrations app
python manage.py migrate

echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', 'cljha@example.com', 'CoolPassword123.')" | python manage.py shell

python manage.py runmodwsgi --user www-data --group www-data --log-to-terminal
