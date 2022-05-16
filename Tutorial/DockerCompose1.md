## Docker-Compose

We will be using docker compose to create 5 containers : 
- grpc-gen (to generate the protobuf compiled files)
- golang
- svelte
- envoy
- postgres

To initalize it, create a compose.yml file with a postgres image :
```yaml
version: '3.9'

services:
    postgres:
        image: postgres
        ports:
        - 5432:5432
        environment:
        POSTGRES_PASSWORD: postgres
        POSTGRES_USER: postgres
        POSTGRES_DB: grpctodo
```

[Continue](/README.md#golang)
