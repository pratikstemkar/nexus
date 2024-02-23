package main

import (
	"log"

	"github.com/pratikstemkar/nexus/internal/database"
	"github.com/pratikstemkar/nexus/internal/router"
	"github.com/pratikstemkar/nexus/internal/user"
	"github.com/pratikstemkar/nexus/internal/websocket"
)

func main() {
	dbConn, err := database.NewDatabase()
	if err != nil {
		log.Fatalf("could not initialize database connection: %s", err)
	}

	userRep := user.NewRepository(dbConn.GetDB())
	userSvc := user.NewService(userRep)
	userHandler := user.NewHandler(userSvc)

	hub := websocket.NewHub()
	wsHandler := websocket.NewHandler(hub)
	go hub.Run()

	router.InitRouter(userHandler, wsHandler)
	router.Start("0.0.0.0:8080")
}
