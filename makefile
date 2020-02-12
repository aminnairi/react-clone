# List of commands that should not be treated as files/folders
.PHONY: start stop restart

# make start
start:
	docker-compose up --detach

# make stop
stop:
	docker-compose down --remove-orphans --volumes --rmi local

# make restart
restart: stop start
