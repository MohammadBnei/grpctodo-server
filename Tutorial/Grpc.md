As grpc is already installed, we will proceed with the protobuf file. [Protocol Buffers (a.k.a., protobuf) are Google's language-neutral, platform-neutral, extensible mechanism for serializing structured data](https://github.com/protocolbuffers/protobuf).
It's where a lot of the magic happens. With a single file, you can define **messages** and **services** that the protoc compiler can translate into js/ts and go language. 

### Protobuf

Our rpc definition looks like this :

#### proto/todo.proto

```proto
syntax = "proto3";

package server;

option go_package = "./todoPB";

// Messages

message GetItemsRequest {
    string message = 1;
}

message GetItemRequest {
    string id = 1;
}

message Item {
    string id = 1;
    string title = 2;
    string description = 3;
    bool closed = 4;
}

message CreateItemRequest {
    Item item = 1;
}

message GetItemsResponse {
    repeated Item items = 1;
}

message GetItemResponse {
    Item item = 1;
}

message GeneralResponse {
    string message = 1;
}

service TodoService {

    rpc GetItems(GeneralResponse) returns (GetItemsResponse) {};

    rpc GetItem(GetItemRequest) returns (GetItemResponse) {};

    rpc CreateItem(CreateItemRequest) returns (GetItemResponse) {};    

    rpc CloseItem(GetItemRequest) returns (GetItemResponse) {};

    rpc OpenItem(GetItemRequest) returns (GetItemResponse) {};

    rpc DeleteItem(GetItemRequest) returns (GeneralResponse) {};
    
}
```

### Protoc

You can install [protoc](https://grpc.io/docs/protoc-installation/) and the grpc dependancies (see the first 3 RUN install) on your device, or you can use the dockerfile I provide :

```Dockerfile
FROM golang

RUN apt-get update && apt-get install -y protobuf-compiler
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
RUN go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

ARG PROTOC_GEN_GRPC_WEB_VERSION=1.3.1

RUN curl -L -o /bin/protoc-gen-grpc-web https://github.com/grpc/grpc-web/releases/download/1.3.1/protoc-gen-grpc-web-1.3.1-linux-x86_64 && \
    chmod +x /bin/protoc-gen-grpc-web

RUN export PATH="$PATH:$(go env GOPATH)/bin"
```

We also get protoc for grpc-web, who can produce ts files from our proto definition.

The command to execute the comilation is tedious, so we will put it in a Makefile :
```Makefile

FLAGS=-I /gen/proto --proto_path=/gen/proto todo.proto

gen:
	docker-compose -f compose-gen.yml up 

golang:
	protoc FLAGS=-I /gen/proto --proto_path=/gen/proto todo.proto \
		--go-grpc_out /out/go --go_out /out/go 

clear:
	rm -rf /out/go/*
	rm -rf /out/js/*
	
js:
	protoc -I=/gen/proto  --proto_path=/gen/proto todo.proto \
    --js_out=import_style=commonjs,binary:/out/js \
	--plugin=protoc-gen-grpc-web=/bin/protoc-gen-grpc-web \
    --grpc-web_out=import_style=typescript,mode=grpcweb:/out/js

```

Lastly, create a specific docker-compose :
#### compose-gen.yml

```yml
version: '3.9'

services:
  grpc-gen:
    build:
      dockerfile: ./proto/Dockerfile
      context: ./
    volumes:
      - ./proto:/gen/proto
      - ./proto/go:/out/go
      - ./proto/js:/out/js
      - ./Makefile:/Makefile
    command: bash -c "make clear && make golang && make js"
    working_dir: /

```

Then start the container.
```console
make gen
```

You should see a bunch of file inside the proto folder. The go files are for the server, and the js/ts ones are for the client (with the use of [protoc-gen-grpc-web](https://github.com/grpc/grpc-web)). 

[Continue](/README.md#golang)
