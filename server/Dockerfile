FROM golang

WORKDIR /go/src/github.com/MohammadBnei/gRPC-web-tuto/server

COPY . .

RUN go mod download

RUN go install github.com/silenceper/gowatch@latest