### Let's try this

To make sure the environment is setup, we will create an entrypoint for the app. We will create cmd/grpc folders and place our main.go inside them :

#### main.go
```go
package main

import (
	"log"

	"github.com/$GITHUB_USERNAME/grpctodo/server/config"
	"github.com/$GITHUB_USERNAME/grpctodo/server/database"

	"google.golang.org/grpc/credentials"
)

func getServerTLS() credentials.TransportCredentials {
	creds, err := credentials.NewServerTLSFromFile(
		config.Config.ServerConfig.CertPath,
		config.Config.ServerConfig.KeyPath,
	)
	if err != nil {
		log.Fatal("error in server TLS cert : ", err)
	}

	return creds
}

func main() {

	log.Println("starting...")

	DB := database.NewPostgresConn()

	serverConfig := config.Config.ServerConfig

	log.Println(DB, serverConfig, getServerTLS())

}


```

Hold up ! it's not done yet. We need to pass the configuration to viper with a yml file...

#### config.yml

```yml
serverConfig:
  tlsEnabled: true
  port: "4000"
  certPath: "/certs/cert.pem"
  keyPath: "/certs/key.pem"
postgres:
  username: "postgres"
  password: "postgres"
  endpoint: "postgres"
  port: "5432"
  dBName: "grpctodo"
```

...And tell [gowatch](https://github.com/silenceper/gowatch) how to find our entrypoint :

#### gowatch.yml
```yml

# The name of the executable file generated under the current directory execution. The default is the current directory name.
appname: "app"

# Whether to listen to file changes in the 'vendor' folder
vendor_watch: false

# main package path, can also be a single file, multiple files separated by commas
build_pkg: "cmd/grpc/main.go"

# build tags
build_tags: ""

# Whether to prohibit automatic operation
disable_run: false

# log level, support debug, info, warn, error, fatal
log_level: "info"

```

Perfect. Launch the application :
```console
docker-compose exec server gowatch

#Inside the container
gowatch
```

If you see "Postgres Connected", we can continue

[Continue](/README.md#golang)
