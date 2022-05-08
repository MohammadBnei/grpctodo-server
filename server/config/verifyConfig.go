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
