ifneq (,$(wildcard ./.env))
include .env
export
ENV_FILE_PARAM = --env-file .env

endif

build:
	docker compose up --build --remove-orphans

build-d:
	docker compose up --build -d --remove-orphans

up:
	docker compose up

up-d:
	docker compose up -d

down:
	docker compose down



show-logs:
	docker compose logs


down-v:
	docker compose down -v

volume:
	docker volume inspect estate-src_postgres_data


# prune build:
# 	docker builder prune

# prune:
# 	docker image prune

