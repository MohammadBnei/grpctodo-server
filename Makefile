
FLAGS=-I /gen/proto --proto_path=/gen/proto todo.proto

gen:
	docker-compose -f compose-gen.yml up 

golang:
	protoc $(FLAGS) \
		--go-grpc_out /out/go --go_out /out/go 
				
	protoc-go-inject-tag -input="/out/go/**/*.pb.go"

clear:
	rm -rf /out/go/*
	rm -rf /out/js/*
	
js:
	protoc -I=/gen/proto  --proto_path=/gen/proto todo.proto \
    --js_out=import_style=commonjs,binary:/out/js \
	--plugin=protoc-gen-grpc-web=/bin/protoc-gen-grpc-web \
    --grpc-web_out=import_style=typescript,mode=grpcweb:/out/js