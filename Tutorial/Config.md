### Config

Let's use viper to import the config (postgres url, certs...) from a yml file.
First, intall the module
```console
docker-compose exec server go get github.com/spf13/viper

#Inside the container
go get github.com/spf13/viper
```

We will create 3 files inside a config folder :
- configStruct.go
- parseConfig.go
- verifyConfig.go

#### configStruct.go
```go
package config

type ServerConfig struct {
	Port       string
	TLSEnabled bool
	CertPath   string
	KeyPath    string
}

type PostgresConn struct {
	Username string
	Password string
	Endpoint string
	Port     string
	DBName   string
}

type config struct {
	ServerConfig ServerConfig
	Postgres     PostgresConn
}
```

#### parseConfig.go
```go
package config

import (
	"flag"
	"log"

	"github.com/spf13/viper"
)

func ParseFlags() string {
	ConfigFilePath := flag.String("config", ".", "path to config file")

	flag.Parse()
	return *ConfigFilePath
}

// Flags returned from the function
var ConfigFilePath = ParseFlags()

func ParseConfig() config {
	readConfig := config{}

	log.Println("parsing config file")

	viper.SetConfigName("config") // name of config file (without extension)
	// viper.SetConfigType("yaml")         // REQUIRED if the config file does not have the extension in the name
	viper.AddConfigPath(ConfigFilePath) // optionally look for config in the working directory
	err := viper.ReadInConfig()         // Find and read the config file

	if err != nil {
		log.Fatal("error parsing config file : ", err)
	}

	err = viper.Unmarshal(&readConfig)
	if err != nil {
		log.Fatal("error unmarshing config file in struct : ", err)
	}

	log.Println("config file parsed successfully")

	return readConfig
}

var parsedConfig = ParseConfig()

```
#### verifyConfig.go
```go
package config

import "log"

func VerifyConfig() config {

	if parsedConfig.ServerConfig.Port == "" {
		log.Fatal("No port specified")
	}

	if parsedConfig.ServerConfig.TLSEnabled {
		if parsedConfig.ServerConfig.CertPath == "" {
			log.Fatal("no CertPath provided")
		}
		if parsedConfig.ServerConfig.KeyPath == "" {
			log.Fatal("no KeyPath provided")
		}
	}

	if parsedConfig.Postgres.Username == "" {
		log.Fatal("Postgres username not specified")
	}
	if parsedConfig.Postgres.Password == "" {
		log.Fatal("Postgres password not specified")
	}
	if parsedConfig.Postgres.Endpoint == "" {
		log.Fatal("Postgres endpoint not specified")
	}
	if parsedConfig.Postgres.Port == "" {
		log.Fatal("Postgres port not specified")
	}
	if parsedConfig.Postgres.DBName == "" {
		log.Fatal("Postgres DB name not specified")
	}

	return parsedConfig

}

var Config = VerifyConfig()

```

[Continue](/README.md#golang)
