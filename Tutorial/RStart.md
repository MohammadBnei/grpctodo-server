Update import and main in our main.go to use the server we just created :
 ```go
 import (
	"log"
	"net"
	"os"
	"os/signal"

	"github.com/$GITHUB_USERNAME/grpctodo/server/config"
	"github.com/$GITHUB_USERNAME/grpctodo/server/database"
	"github.com/$GITHUB_USERNAME/grpctodo/server/server"
	"github.com/$GITHUB_USERNAME/grpctodo/server/todoPB"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/reflection"
)
 ```

```go
func main() {
    // Previous code

    lis, err := net.Listen("tcp", "0.0.0.0:"+serverConfig.Port)
	if err != nil {
		log.Fatal(err)
	}

	var grpcServer *grpc.Server
	tlsStat := ""

    tlsStat = "secure"
    grpcServer = grpc.NewServer(
        grpc.Creds(getServerTLS()),
    )

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

```

Allright. Launch the grpc server with gowatch.

[TEST](Test.md)

You can modify the compose file to start the server with the container :
```Yml
server:
    build:
      dockerfile: ./server/Dockerfile
      # We set the context to the base direcotry to inject the certificates and the proto files
      context: ./
    # For mac m1 users only
    # platform: linux/amd64
    ports:
      # The local port on which the server will be avalaible
      - 4000:4000
    volumes:
      - ./dev/certs/grpctodo.dev+1-key.pem:/certs/key.pem:ro
      - ./dev/certs/grpctodo.dev+1.pem:/certs/cert.pem:ro
      - ./server:/go/src/github.com/$GITHUB_USERNAME/grpctodo/server
-   # This is to keep the container running even when there is no process, only for initialization
-   stdin_open: true
+	command: gowatch
```

[Continue](/README.md#golang)
