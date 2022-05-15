FROM golang

WORKDIR /go/src/github.com/MohammadBnei/gRPC-web-tuto/server

RUN go install github.com/ramya-rao-a/go-outline@latest
RUN go install golang.org/x/tools/gopls@latest
RUN go install honnef.co/go/tools/cmd/staticcheck@latest
RUN go install github.com/go-delve/delve/cmd/dlv@latest

RUN go install github.com/silenceper/gowatch@latest