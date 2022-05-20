With our stream stubs generated, we can define how and when we will send response to the client. We are going to make use of go channels, as it is a particularly convenient way to pass data around.
It has some caveats though : sending data to a channel will block the process until that data is receive.
We also need to make sure the channels are locked when removing a client.

This will be technical, so bear with me.

First, modify our server struct to add the necessary elements :

#### server.go

```go
type Server struct {
	todoPB.UnimplementedTodoServiceServer
	DB            *gorm.DB
    // This channel is used to broadcast data from all modifying functions
	streamChannel chan *todoPB.StreamResponse
    // This is the proxy array, containing all connected streaming clients
	listeners     []chan *todoPB.StreamResponse
    // This is the golang lock mechanism, useful to prevent sending data on a closed channel (client disconnected)
	mut           sync.Mutex
}
```

We then need to initialize (and stop) the server :

#### server.go

```go
func CreateServer(db *gorm.DB) *Server {
	var listeners []chan *todoPB.StreamResponse
	server := &Server{
		DB:            db,
		streamChannel: make(chan *todoPB.StreamResponse, 200),
		listeners:     listeners,
	}

    // Start the streaming process in a goroutine
	go server.InitStreamingChannels()
	return server
}

func (s *Server) Stop() {
	s.mut.Lock()
	close(s.streamChannel)
    s.mut.Unlock()
}
```

And modify our entrypoint :

#### main.go

```go
server := server.CreateServer(DB)

todoPB.RegisterTodoServiceServer(grpcServer, server)
reflection.Register(grpcServer)

// ...

// Stop the server
log.Println("stopping the server")
server.Stop()
grpcServer.Stop()
log.Println("server stopped")
```

Cool. We updated our server to handle streaming. Let's implement the service.

[Continue](StreamService.md)
