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