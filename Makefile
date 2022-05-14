
FLAGS=-I /gen/proto --proto_path=/gen/proto todo.proto

gen:
	docker-compose exec -t grpc-gen bash -c "make go && make js" 

golang:
	protoc $(FLAGS) \
		--go-grpc_out /out/go --go_out /out/go 
				
	protoc-go-inject-tag -input="/out/go/**/*.pb.go"

	
js:
	protoc -I=/gen/proto  --proto_path=/gen/proto todo.proto \
    --js_out=import_style=commonjs,binary:/out/js \
	--plugin=protoc-gen-grpc-web=/bin/protoc-gen-grpc-web \
    --grpc-web_out=import_style=commonjs,mode=grpcweb:/out/js