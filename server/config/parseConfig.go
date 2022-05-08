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
