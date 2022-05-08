package main

import (
	"log"
	"net"
	"os"
	"os/signal"

	"github.com/MohammadBnei/gRPC-web-tuto/server/config"
	"github.com/MohammadBnei/gRPC-web-tuto/server/database"
	"github.com/MohammadBnei/gRPC-web-tuto/server/server"
	"github.com/MohammadBnei/gRPC-web-tuto/server/todoPB"

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

	lis, err := net.Listen("tcp", "0.0.0.0:"+serverConfig.Port)
	if err != nil {
		log.Fatal(err)
	}

	var grpcServer *grpc.Server
	tlsStat := ""

	if serverConfig.TLSEnabled {
		tlsStat = "secure"
		grpcServer = grpc.NewServer(
			grpc.Creds(getServerTLS()),
		)
	} else {
		tlsStat = "insecure"
		grpcServer = grpc.NewServer()
	}

	todoPB.RegisterTodoServiceServer(grpcServer, &server.Server{DB: DB})
	reflection.Register(grpcServer)

	go func() {
		log.Println(tlsStat, "gRPC Server Started on :"+serverConfig.Port)
		if err := grpcServer.Serve(lis); err != nil {
			log.Fatalf("failed to serve: %v", err)
		}
	}()

	// Wait for Control C to exit
	ch := make(chan os.Signal, 1)
	signal.Notify(ch, os.Interrupt)

	// Block until a signal is received
	<-ch

	// Stop the server
	log.Println("stopping the server")
	grpcServer.Stop()
	log.Println("server stopped")
}
