package server

import (
	"context"
	"fmt"
	"log"
	"strconv"

	"github.com/MohammadBnei/gRPC-web-tuto/server/domain"
	"github.com/MohammadBnei/gRPC-web-tuto/server/todoPB"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"gorm.io/gorm"
)

//Server exposed
type Server struct {
	todoPB.UnimplementedTodoServiceServer
	DB *gorm.DB
}

func (s *Server) GetItems(ctx context.Context, r *todoPB.GetItemsRequest) (*todoPB.GetItemsResponse, error) {
	fmt.Println("GetItems() called")

	blankItems := &todoPB.GetItemsResponse{}

	toRespItems := []*domain.Item{}

	if result := s.DB.Find(&toRespItems); result.Error != nil {
		fmt.Println(result.Error)
		return blankItems, status.Error(codes.Internal, result.Error.Error())
	}

	respItems := []*todoPB.Item{}
	for _, v := range toRespItems {
		respItems = append(respItems, &todoPB.Item{
			Id:          strconv.FormatUint(uint64(v.Id), 10),
			Title:       v.Title,
			Description: v.Description,
			Closed:      v.Closed,
		})
	}

	return &todoPB.GetItemsResponse{
		Items: respItems,
	}, nil

}

func (s *Server) GetItem(ctx context.Context, r *todoPB.GetItemRequest) (*todoPB.GetItemResponse, error) {
	fmt.Println("GetItem() called")

	toRespItem := &todoPB.Item{}

	if result := s.DB.Find(&toRespItem); result.Error != nil {
		fmt.Println(result.Error)
	}

	return &todoPB.GetItemResponse{
		Item: toRespItem,
	}, nil

}

func (s *Server) DeleteItem(ctx context.Context, r *todoPB.Item) (*todoPB.GeneralResponse, error) {
	fmt.Println("DeleteItem() called")

	blankResponse := &todoPB.GeneralResponse{}

	var item domain.Item

	if result := s.DB.First(&item, r.Id); result.Error != nil {
		fmt.Println(result.Error)
		return blankResponse, status.Error(codes.Internal, result.Error.Error())
	}

	// Delete that item
	s.DB.Delete(&item)

	return &todoPB.GeneralResponse{
		Message: "Item deleted",
	}, nil

}

func (s *Server) CreateItem(ctx context.Context, r *todoPB.Item) (*todoPB.Item, error) {
	fmt.Println("CreateItem() called")
	blankItem := &todoPB.Item{}

	newItem := &domain.Item{
		Title:       r.GetTitle(),
		Description: r.GetDescription(),
		Closed:      r.GetClosed(),
	}

	if result := s.DB.Create(&newItem); result.Error != nil {
		fmt.Println(result.Error)
		return blankItem, status.Error(codes.Internal, result.Error.Error())
	}

	log.Println(newItem)

	return &todoPB.Item{
		Id:          fmt.Sprintf("%d", newItem.Id),
		Title:       newItem.Title,
		Description: newItem.Description,
		Closed:      newItem.Closed,
	}, nil

}

func (s *Server) CloseItem(ctx context.Context, r *todoPB.Item) (*todoPB.GeneralResponse, error) {
	fmt.Println("DeleteItem() called")

	blankResponse := &todoPB.GeneralResponse{}

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

	return &todoPB.GeneralResponse{
		Message: "Item closed",
	}, nil
}
