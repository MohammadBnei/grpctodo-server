package server

import (
	"context"
	"fmt"
	"log"

	"github.com/MohammadBnei/gRPC-web-tuto/server/domain"
	"github.com/MohammadBnei/gRPC-web-tuto/server/todoPB"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
	"gorm.io/gorm"
)

//Server exposed
type Server struct {
	todoPB.UnimplementedTodoServiceServer
	DB            *gorm.DB
	StreamChannel chan *todoPB.StreamResponse
	Listeners     []chan *todoPB.StreamResponse
}

var blankItems = &todoPB.GetItemsResponse{}
var blankItem = &todoPB.GetItemResponse{}

func wrapItem(item *domain.Item) *todoPB.Item {
	return &todoPB.Item{
		Id:          fmt.Sprintf("%d", item.Id),
		Title:       item.Title,
		Description: item.Description,
		Closed:      item.Closed,
	}
}

func CreateServer(db *gorm.DB) *Server {
	var Listeners []chan *todoPB.StreamResponse
	server := &Server{
		DB:            db,
		StreamChannel: make(chan *todoPB.StreamResponse),
		Listeners:     Listeners,
	}

	go server.InitStreamingChannels()
	return server
}

func (s *Server) GetItems(ctx context.Context, r *emptypb.Empty) (*todoPB.GetItemsResponse, error) {
	fmt.Println("GetItems() called")

	md, ok := metadata.FromIncomingContext(ctx)
	authMd := md.Get("authorization")

	var token string
	if len(authMd) > 0 {
		token = authMd[0]
	}
	log.Println(token, ok)

	toRespItems := []*domain.Item{}

	if result := s.DB.Find(&toRespItems); result.Error != nil {
		fmt.Println(result.Error)
		return blankItems, status.Error(codes.Internal, result.Error.Error())
	}

	respItems := []*todoPB.Item{}
	for _, v := range toRespItems {
		respItems = append(respItems, wrapItem(v))
	}

	return &todoPB.GetItemsResponse{
		Items: respItems,
	}, nil

}

func (s *Server) GetItem(ctx context.Context, r *todoPB.GetItemRequest) (*todoPB.GetItemResponse, error) {
	fmt.Println("GetItem() called")

	var item domain.Item

	if result := s.DB.First(&item, r.Id); result.Error != nil {
		fmt.Println(result.Error)
		return blankItem, status.Error(codes.Internal, result.Error.Error())
	}
	fmt.Println(item)

	return &todoPB.GetItemResponse{
		Item: wrapItem(&item),
	}, nil

}

func (s *Server) DeleteItem(ctx context.Context, r *todoPB.GetItemRequest) (*todoPB.GeneralResponse, error) {
	fmt.Println("DeleteItem() called")

	blankResponse := &todoPB.GeneralResponse{}

	var item domain.Item

	if r.Id == "" {
		return blankResponse, status.Error(codes.Internal, "no id provided")
	}

	if result := s.DB.First(&item, r.Id); result.Error != nil {
		fmt.Println(result.Error)
		return blankResponse, status.Error(codes.Internal, result.Error.Error())
	}

	// Delete that item
	s.DB.Delete(&item)

	s.StreamChannel <- &todoPB.StreamResponse{
		Type: todoPB.StreamResponse_DELETED,
		Item: wrapItem(&item),
	}

	return &todoPB.GeneralResponse{
		Message: "Item deleted",
	}, nil

}

func (s *Server) CreateItem(ctx context.Context, r *todoPB.CreateItemRequest) (*todoPB.GetItemResponse, error) {
	fmt.Println("CreateItem() called")
	blankResponse := &todoPB.GetItemResponse{}

	newItem, err := domain.NewItem(r.Item.Title, r.Item.Description)
	if err != nil {
		return blankResponse, err
	}

	if result := s.DB.Create(&newItem); result.Error != nil {
		fmt.Println(result.Error)
		return blankResponse, status.Error(codes.Internal, result.Error.Error())
	}

	s.StreamChannel <- &todoPB.StreamResponse{
		Type: todoPB.StreamResponse_CREATED,
		Item: wrapItem(newItem),
	}

	return &todoPB.GetItemResponse{
		Item: wrapItem(newItem),
	}, nil

}

func (s *Server) CloseItem(ctx context.Context, r *todoPB.GetItemRequest) (*todoPB.GetItemResponse, error) {
	fmt.Println("DeleteItem() called")

	blankResponse := &todoPB.GetItemResponse{}

	if r.Id == "" {
		return blankResponse, status.Error(codes.Internal, "no id provided")
	}

	var item domain.Item

	if result := s.DB.First(&item, r.Id); result.Error != nil {
		fmt.Println(result.Error)
		return blankResponse, status.Error(codes.Internal, result.Error.Error())
	}

	// Close that item
	if result := s.DB.Model(&item).UpdateColumn("closed", true); result.Error != nil {
		fmt.Println(result.Error)
		return blankResponse, status.Error(codes.Internal, result.Error.Error())
	}

	s.StreamChannel <- &todoPB.StreamResponse{
		Type: todoPB.StreamResponse_UPDATED,
		Item: wrapItem(&item),
	}

	return &todoPB.GetItemResponse{
		Item: wrapItem(&item),
	}, nil
}
func (s *Server) OpenItem(ctx context.Context, r *todoPB.GetItemRequest) (*todoPB.GetItemResponse, error) {
	fmt.Println("OpenItem() called")

	blankResponse := &todoPB.GetItemResponse{}

	if r.Id == "" {
		return blankResponse, status.Error(codes.Internal, "no id provided")
	}

	var item domain.Item

	if result := s.DB.First(&item, r.Id); result.Error != nil {
		fmt.Println(result.Error)
		return blankResponse, status.Error(codes.Internal, result.Error.Error())
	}

	// Close that item
	if result := s.DB.Model(&item).UpdateColumn("closed", false); result.Error != nil {
		fmt.Println(result.Error)
		return blankResponse, status.Error(codes.Internal, result.Error.Error())
	}

	s.StreamChannel <- &todoPB.StreamResponse{
		Type: todoPB.StreamResponse_UPDATED,
		Item: wrapItem(&item),
	}

	return &todoPB.GetItemResponse{
		Item: wrapItem(&item),
	}, nil
}
