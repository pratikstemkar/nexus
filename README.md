# Nexus - Real-Time Chat

Chat with anyone in a room.

## Tech

-   Go Gin
-   Gorilla Websockets
-   Next.js
-   TailwindCSS
-   PostgreSQL
-   Docker

## How to run?

-   Clone repository from `git clone https://github.com/pratikstemkar/nexus`.
-   Run Postgres image from docker using `make postgresinit`.
-   Create DB `nexusdb` using `make createdb`.
-   Run DB migrations to create `users` table using `make migrateup`.
-   Start server command `go run cmd/main.go`.
-   Run Next.js app using `npm run dev`.
-   Visit `https://localhost:3000`.
