
FLAGS=-I proto -I proto/googleapis --proto_path=proto

protoc:
	protoc $(FLAGS) \
		--go-grpc_out . --go_out . proto/*.proto
	protoc-go-inject-tag -input="**/*.pb.go"