postgresinit:
	docker run --name nexus-postgres -p 5433:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=password -d postgres

postgres:
	docker exec -it nexus-postgres psql

createdb:
	docker exec -it nexus-postgres createdb --username=root --owner=root nexusdb

dropdb:
	docker exec -it nexus-postgres dropdb nexusdb

migrateup:
	migrate -path internal/database/migrations -database "postgresql://root:password@localhost:5433/nexusdb?sslmode=disable" -verbose up

migratedown:
	migrate -path internal/database/migrations -database "postgresql://root:password@localhost:5433/nexusdb?sslmode=disable" -verbose down

.PHONY: postgresinit postgres createdb dropdb migrateup migratedown
