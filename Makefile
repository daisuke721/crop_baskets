# 開発環境
# Docker環境
dev_build:
	docker compose -f docker-compose-dev.yml --env-file .env.dev up -d --build

dev_up:
	docker compose -f docker-compose-dev.yml --env-file .env.dev up -d

dev_stop:
	docker compose -f docker-compose-dev.yml --env-file .env.dev stop

dev_down:
	docker compose -f docker-compose-dev.yml --env-file .env.dev down -v

dev_restart:
	docker compose -f docker-compose-dev.yml --env-file .env.dev restart

# MySQL環境
dev_sql:
	docker compose -f docker-compose-dev.yml exec db mysql -u root -p

# Frontend環境
dev_front:
	docker compose -f docker-compose-dev.yml --env-file .env.dev exec frontend bash

dev_lint:
	docker compose -f docker-compose-dev.yml --env-file .env.dev exec frontend yarn lint

# Backend環境
dev_back:
	docker compose -f docker-compose-dev.yml --env-file .env.dev exec backend bash

dev_db:
	docker compose -f docker-compose-dev.yml --env-file .env.dev exec backend rails db:create db:migrate db:seed

dev_cop:
	docker compose -f docker-compose-dev.yml --env-file .env.dev exec backend rubocop

dev_cop_a:
	docker compose -f docker-compose-dev.yml --env-file .env.dev exec backend rubocop -a

# 本番環境
# Docker環境
prod_build:
	docker compose -f docker-compose-prod.yml --env-file .env.prod up -d --build

prod_up:
	docker compose -f docker-compose-prod.yml --env-file .env.prod up -d

prod_down:
	docker compose -f docker-compose-prod.yml --env-file .env.prod down

prod_stop:
	docker compose -f docker-compose-prod.yml --env-file .env.prod stop

prod_restart:
	docker compose -f docker-compose-prod.yml --env-file .env.prod restart

prod_back_restart:
	docker compose -f docker-compose-prod.yml --env-file .env.prod restart backend

prod_nginx_restart:
	docker compose -f docker-compose-prod.yml --env-file .env.prod restart nginx

# Backend環境
prod_back:
	docker compose -f docker-compose-prod.yml --env-file .env.prod exec backend bash

prod_db:
	docker compose -f docker-compose-prod.yml --env-file .env.prod exec backend rails db:create db:migrate db:seed

prod_back_logs:
	docker compose -f docker-compose-prod.yml --env-file .env.prod logs -f backend

# Nginx環境
prod_nginx:
	docker compose -f docker-compose-prod.yml --env-file .env.prod exec nginx sh

prod_nginx_logs:
	docker compose -f docker-compose-prod.yml --env-file .env.prod logs -f nginx
