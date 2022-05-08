package database

import (
	"fmt"
	"log"

	"github.com/MohammadBnei/gRPC-web-tuto/server/config"
	"github.com/MohammadBnei/gRPC-web-tuto/server/domain"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

const ItemsTable = "items"

func NewPostgresConn() *gorm.DB {

	log.Println("connecting Postgres")

	connStr := fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s",
		config.Config.Postgres.Username, config.Config.Postgres.Password,
		config.Config.Postgres.Endpoint, config.Config.Postgres.Port, config.Config.Postgres.DBName,
	)

	DB, err := gorm.Open(postgres.Open(connStr), &gorm.Config{})
	if err != nil {
		log.Fatal("error opening Postgres : ", err)
	}

	err = DB.AutoMigrate(&domain.Item{})
	if err != nil {
		log.Fatal("error migratiting Postgres : ", err)
	}

	log.Println("Postgres Connected")

	return DB
}

func GetDbInstance() *gorm.DB {
	return DB
}
