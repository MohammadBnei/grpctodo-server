package server

import (
	"context"
	"fmt"
	"log"
	"strconv"

	"github.com/MohammadBnei/grpctodo/server/domain"
	"github.com/MohammadBnei/grpctodo/server/todoPB"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
	"gorm.io/gorm"
)

//Server exposed
type Server struct {
	todoPB.UnimplementedTodoServiceServer
	DB *gorm.DB
}

var blankItems = &todoPB.GetItemsResponse{}

func (s *Server) GetItems(ctx context.Context, r *todoPB.General) (*todoPB.GetItemsResponse, error) {
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

func (s *Server) DeleteItem(ctx context.Context, r *todoPB.GetItemRequest) (*todoPB.General, error) {
	fmt.Println("DeleteItem() called")

	blankResponse := &todoPB.General{}

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

	return &todoPB.General{
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

	return &todoPB.GetItemResponse{
		Item: &todoPB.Item{
			Id:          fmt.Sprintf("%d", newItem.Id),
			Title:       newItem.Title,
			Description: newItem.Description,
			Closed:      newItem.Closed,
		},
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

	return &todoPB.GetItemResponse{
		Item: &todoPB.Item{
			Id:          fmt.Sprintf("%d", item.Id),
			Title:       item.Title,
			Description: item.Description,
			Closed:      item.Closed,
		},
	}, nil
}
