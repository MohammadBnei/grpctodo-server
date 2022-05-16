### Domain

We will define here an item object, and with annotations and gorm we can link it to the database model.

We also install the grpc module because we define grpc errors in the validation process :
```console
docker-compose exec server go get google.golang.org/grpc


#Inside the container

go get -u google.golang.org/grpc
```

Inside a domain folder, create the item struct :
#### item.go
```go
package domain

import (
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Item struct {
	Id          uint   `json:"id"`
	Title       string `json:"title" gorm:"unique"`
	Description string `json:"description"`
	Closed      bool   `json:"closed"`
}

func NewItem(title string, description string) (*Item, error) {

	blankItem := &Item{}

	// title input checks

	if title == "" {
		return blankItem, status.Error(codes.InvalidArgument, "title cannot be empty")
	}
	if len(title) > 100 {
		return blankItem, status.Error(codes.InvalidArgument, "title cannot be longer than 100 characters")
	}

	// description input checks

	if description == "" {
		return blankItem, status.Error(codes.InvalidArgument, "description cannot be empty")
	}
	if len(description) > 500 {
		return blankItem, status.Error(codes.InvalidArgument, "description cannot be longer than 500 characters")
	}

	// return new item

	return &Item{
		Title:       title,
		Description: description,
		Closed:      false,
	}, nil
}
```

We also added a function for basic validation of raw data. 
See [here](https://gorm.io/docs/models.html) for more options on the gorm model.

### Database 

Since we have a model, we want to load the db with it's SQL definition. Fortunately, gorm does that for us. 
```console
docker-compose exec server go get -u gorm.io/gorm
# postgres drivers
docker-compose exec server go get -u gorm.io/driver/postgres


#Inside the container
go get -u gorm.io/gorm
go get -u gorm.io/driver/postgres
```

Inside the database folder, write a new file :
#### postgres.go
```go
package database

import (
	"fmt"
	"log"

	"github.com/$GITHUB_USERNAME/grpctodo/server/config"
	"github.com/$GITHUB_USERNAME/grpctodo/server/domain"
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

	// Synchronization of the model with the database
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

```

Nothing fancy here, we are instanciating a database singleton, which will provide access to the manipulating functions of the item model.

[Continue](/README.md#golang)
