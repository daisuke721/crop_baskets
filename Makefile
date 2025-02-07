# 開発環境
dev_build:
	docker compose -f docker-compose-dev.yml --env-file .env.dev up -d --build

dev_up:
	docker compose -f docker-compose-dev.yml --env-file .env.dev up -d

dev_stop:
	docker compose -f docker-compose-dev.yml --env-file .env.dev stop

dev_down:
	docker compose -f docker-compose-dev.yml --env-file .env.dev down -v

dev_db:
	docker compose -f docker-compose-dev.yml --env-file .env.dev exec backend rails db:create

dev_sql:
	docker compose -f docker-compose-dev.yml exec db mysql -u root -p

dev_front:
	docker compose -f docker-compose-dev.yml --env-file .env.dev exec frontend bash

dev_back:
	docker compose -f docker-compose-dev.yml --env-file .env.dev exec backend bash

dev_cop:
	docker compose -f docker-compose-dev.yml --env-file .env.dev exec backend rubocop

dev_cop_a:
	docker compose -f docker-compose-dev.yml --env-file .env.dev exec backend rubocop -a
