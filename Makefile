
gen:
	docker-compose -f compose-gen.yml up 

golang:
	protoc -I /gen/proto --proto_path=/gen/proto todo.proto \
		--go-grpc_out /out/go --go_out /out/go 
				
clear:
	rm -rf /out/go/*
	rm -rf /out/js/*
	
js:
	protoc -I=/gen/proto  --proto_path=/gen/proto todo.proto \
    --js_out=import_style=commonjs,binary:/out/js \
	--plugin=protoc-gen-grpc-web=/bin/protoc-gen-grpc-web \
    --grpc-web_out=import_style=typescript,mode=grpcweb:/out/js
