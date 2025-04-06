.PHONY: dump_db_dev

COMPOSE=docker compose
PG_EXEC=$(COMPOSE) exec -it ticklab-db
PG_DUMP_STG=$(PG_EXEC) pg_dump -d ticklab -h 14.253.139.39 -p 8234 -U ticklab

dump_db_dev:
	$(COMPOSE) down ticklab-db --volumes --remove-orphans
	$(COMPOSE) up ticklab-db -d
	echo "Dumping staging database..."
	$(PG_DUMP_STG) -x -O -f dump.sql
	echo "Dumped staging database"
	echo "Restoring staging database..."
	$(PG_EXEC) psql -d ticklab -U postgres -f dump.sql
reset:
	$(COMPOSE) down ticklab-db --volumes
	$(COMPOSE) up ticklab-db -d