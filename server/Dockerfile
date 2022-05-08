FROM golang

ENV PROTOC_ZIP=protoc-3.19.3-linux-x86_64.zip

RUN apt-get update && apt-get install -y protobuf-compiler
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@vlatest
RUN go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

RUN export PATH="$PATH:$(go env GOPATH)/bin"

RUN go install github.com/silenceper/gowatch@latest
