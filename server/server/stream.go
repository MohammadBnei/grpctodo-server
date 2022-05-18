package server

import (
	"fmt"

	"github.com/MohammadBnei/gRPC-web-tuto/server/domain"
	"github.com/MohammadBnei/gRPC-web-tuto/server/todoPB"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
)

func (s *Server) InitStreamingChannels() {
	for {
		select {
		case event := <-s.StreamChannel:
			for _, l := range s.Listeners {
				fmt.Println(l, event)
				l <- event
			}
		}
	}
}

func (s *Server) NewStreamClient(channel chan *todoPB.StreamResponse) error {
	s.Listeners = append(s.Listeners, channel)

	return nil
}

func (s *Server) RemoveStreamClient(channel chan *todoPB.StreamResponse) error {
	var index int
	for i, l := range s.Listeners {
		if l == channel {
			index = i
			break
		}
	}
	s.Listeners = append(s.Listeners[:index], s.Listeners[index+1:]...)
	return nil
}

func (s *Server) GetItemsStream(_ *emptypb.Empty, srv todoPB.TodoService_GetItemsStreamServer) error {
	fmt.Println("GetItemsStream() called")
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

	channel := make(chan *todoPB.StreamResponse)
	s.NewStreamClient(channel)
	defer s.RemoveStreamClient(channel)
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
