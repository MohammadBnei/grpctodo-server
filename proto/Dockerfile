FROM golang

RUN apt-get update && apt-get install -y protobuf-compiler
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
RUN go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

ARG PROTOC_GEN_GRPC_WEB_VERSION=1.3.1

RUN curl -L -o /bin/protoc-gen-grpc-web https://github.com/grpc/grpc-web/releases/download/1.3.1/protoc-gen-grpc-web-1.3.1-linux-x86_64 && \
    chmod +x /bin/protoc-gen-grpc-web

RUN export PATH="$PATH:$(go env GOPATH)/bin"