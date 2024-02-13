NAME_I = ft_transcendence_transcendence:latest postgres:16.0-bookworm
NAME_C = ft_transcendence_transcendence_1 ft_transcendence_db_1
VOL = ft_transcendence_pgdata

all:
	docker-compose up -d

down:
	docker-compose down

fclean: down
	docker rmi $(NAME_I)

reset: down
	docker stop $(NAME_C) ; docker rm $(NAME_C) ; \
	docker rmi -f $(NAME_I) ; docker volume rm $(VOL)

reboot: down all

dev:
	docker-compose exec transcendence python manage.py collectstatic --noinput

runserver:
	docker-compose exec transcendence python manage.py runserver 0.0.0.0:8080

re: reset all

prune:
	docker system prune --all --force --volumes

.PHONY: all down fclean reset reboot re prune
