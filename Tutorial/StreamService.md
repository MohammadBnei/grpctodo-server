We will create a new file under the server package, and implement the grpc server streaming functionnalities.

First, the grpc function :

#### stream.go

```go
package server

import (
	"fmt"

	"github.com/MohammadBnei/gRPC-web-tuto/server/domain"
	"github.com/MohammadBnei/gRPC-web-tuto/server/todoPB"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
)

func (s *Server) GetItemsStream(_ *todoPB.General, srv todoPB.TodoService_GetItemsStreamServer) error {
	fmt.Println("GetItemsStream() called")

    // Send all the current items in the databse through stream
	go func() {
		toRespItems := []*domain.Item{}

		if result := s.DB.Find(&toRespItems); result.Error != nil {
			fmt.Println(result.Error)
			return
		}

		for _, v := range toRespItems {
			srv.Send(&todoPB.StreamResponse{
				Type: todoPB.StreamResponse_CREATED,
				Item: wrapItem(v),
			})
		}
	}()

    // Create the channel per client connection
	channel := make(chan *todoPB.StreamResponse)
    // The creation functions will return the removal function
	removeStreamClient := s.NewStreamClient(channel)
    // Whe this function returns, remove the channel from the listeners list (safely)
	defer removeStreamClient()

	for {
		select {
		case event := <-channel:
			if err := srv.Send(event); err != nil {
				return err
			}
		case <-srv.Context().Done():
			return nil
		}
	}
}
```

Now, create the functions to initialize our streaming service, and add or remove channels :

```go
func (s *Server) InitStreamingChannels() {

	for event := range s.streamChannel {
		s.mut.Lock()
		for _, l := range s.listeners {
			go func(l chan *todoPB.StreamResponse, event *todoPB.StreamResponse) {
				l <- event
			}(l, event)
		}
		s.mut.Unlock()
	}
}

func (s *Server) NewStreamClient(channel chan *todoPB.StreamResponse) func() error {
	s.listeners = append(s.listeners, channel)
	index := len(s.listeners) - 1

	return func() error {
		return s.RemoveStreamClient(index)
	}
}

func (s *Server) RemoveStreamClient(index int) error {
	s.mut.Lock()
	s.listeners = append(s.listeners[:index], s.listeners[index+1:]...)
	s.mut.Unlock()
	return nil
}
```

Allright. Let's get to the client side.


[Continue](/README.md#server-stream)
