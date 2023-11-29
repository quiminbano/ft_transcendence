#!/bin/bash

python manage.py collectstatic --noinput

until pg_isready -h $POSTGRES_HOST -U $POSTGRES_USER
do
	echo "Waiting for the database to be ready"
	sleep 2
done
echo "Database is ready to be used!!"

python manage.py makemigrations app
python manage.py migrate

cat auth.py | python manage.py shell

python manage.py runmodwsgi --user www-data --group www-data --log-to-terminal
