package main

import (
	"log"
	"net"
	"os"
	"os/signal"

	"github.com/MohammadBnei/grpctodo/server/config"
	"github.com/MohammadBnei/grpctodo/server/database"
	"github.com/MohammadBnei/grpctodo/server/server"
	"github.com/MohammadBnei/grpctodo/server/todoPB"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/reflection"
)

func getServerTLS() credentials.TransportCredentials {
	creds, err := credentials.NewServerTLSFromFile(
		config.Config.ServerConfig.CertPath,
		config.Config.ServerConfig.KeyPath,
	)
	if err != nil {
		log.Fatal("error in server TLS cert : ", err)
	}

	return creds
}

func main() {

	log.Println("starting...")

	DB := database.NewPostgresConn()

	serverConfig := config.Config.ServerConfig

	// Wait for Control C to exit
	ch := make(chan os.Signal, 1)
	signal.Notify(ch, os.Interrupt)

	// Block until a signal is received
	<-ch

	// Stop the server
	log.Println("stopping the server")
	log.Println("server stopped")

}
