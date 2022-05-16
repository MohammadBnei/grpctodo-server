With all the proto files generated for us, we are ready to put the last pieces for our server.

### Proto Files
First, we need to link the proto files to our server container. We can do this by adding a volume :

#### compose.yml
```yml
    server:
        build:
            dockerfile: ./server/Dockerfile
        # ...
        
        volumes:
        # ...

        # New line
        - ./proto/go/todoPB:/go/src/github.com/$GITHUB_USERNAME/gRPC-web-tuto/server/todoPB:ro
        stdin_open: true

    # ...
    
```

Restart the container 
```
docker-compose up -d
```

You should see the pb files inside todoPB.

### gRPC Server

We create a struct that can hold the DB pointer, and use a provided trick to embed grpc into our server (providing forward compatibility) :

#### server/server.go

```golang
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
```

Then add the [CRUD](ServerCRUD.md) functions.

[Continue](/README.md#golang)

