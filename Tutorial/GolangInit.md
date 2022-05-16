Create the server directory, and inside it a Dockerfile. It will install all the dev dependencies in a container :

```Dockerfile
FROM golang

WORKDIR /go/src/github.com/$GITHUB_USERNAME/grpctodo/server

RUN go install github.com/ramya-rao-a/go-outline@latest
RUN go install golang.org/x/tools/gopls@latest
RUN go install honnef.co/go/tools/cmd/staticcheck@latest
RUN go install github.com/go-delve/delve/cmd/dlv@latest

RUN go install github.com/silenceper/gowatch@latest
```

Once the docker file is ready, let's create the service in docker compose file (compose.yml). Add the following lines in the services part :

```yml
  server:
    build:
      dockerfile: ./server/Dockerfile
      # We set the context to the base direcotry to inject the certificates and the proto files
      context: ./
    # For mac m1 users only
    # platform: linux/amd64
    ports:
      # The local port on which the server will be avalaible
      - 4000:4000
    volumes:
      - ./dev/certs/grpctodo.dev+1-key.pem:/certs/key.pem:ro
      - ./dev/certs/grpctodo.dev+1.pem:/certs/cert.pem:ro
      - ./server:/go/src/github.com/$GITHUB_USERNAME/grpctodo/server
    # This is to keep the container running even when there is no process, only for initialization
    stdin_open: true
```

Spin up the containers :

```console
docker-compose up -d
```

Initialize the go module
```console
docker-compose exec server go mod init
```

If you see the go.mod file, we are ready to code.

*At this point, I advise you to open VSCode or equivalent [inside the container](https://code.visualstudio.com/docs/remote/containers), as golang binairies are not on the host machine*

[Continue](/README.md#golang)