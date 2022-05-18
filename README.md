# Informations

## Goal

We want to create a Todo App. The functionallities will be basic (CRUD), so we can focus on the technical aspect of gRPC.

We will see step by step how to implement a golang grpc server, with full TLS encryption. 
This server will be made avalaible by the envoy proxy with a grpc-web filter, to translate browser sent request.

Once the backend part is done, we will develop the frontend with svelte. Enforced by typescript and tailwindcss, implementing an application with svelte is a breeze.

## Prerequesites

- [mkcert](https://github.com/FiloSottile/mkcert)
- [docker](https://www.docker.com/get-started/) & [docker-compose](https://docs.docker.com/compose/)
- envoy (docker or local)

## Backend

Golang
- [gorm](https://gorm.io/index.html)
- [grpc](https://grpc.io/docs/languages/go/)


## Frontend

Svelte
- [rollup](https://rollupjs.org/guide/en/)
- [tailwindcss](https://tailwindcss.com)
- [daisyui](https://daisyui.com)
- [typescript](https://www.typescriptlang.org)
- [grpcweb](https://github.com/grpc/grpc-web)

## Reverse Proxy

Envoy

## Database 

Postgres

# Certificate & Images

[CERTIFICATE](/Tutorial/Certificate.md)

[DOCKER COMPOSE](/Tutorial/DockerCompose1.md)

# Golang

[GOLANG INIT](/Tutorial/GolangInit.md)

[CONFIG](/Tutorial/Config.md)

[DATABASE](/Tutorial/Database.md)

[START](/Tutorial/TryDB.md)

[GRPC](/Tutorial/Grpc.md)

[SERVER](/Tutorial/Server.md)

[REAL START](/Tutorial/RStart.md)

# Envoy

[ENVOY SERVICE](/Tutorial/EnvoyService.md)

[GRPC WEB](/Tutorial/GrpcWeb.md)

# Svelte

[SVELTE INIT](/Tutorial/SvelteInit.md)

[GRPC WEB](/Tutorial/SvelteGrpcWeb.md)

[TODO APP](/Tutorial/TodoApp.md)

# Server Stream

To test out more of the grpc possibilities, let's implement a server side streaming service. This will be used to update the view, and synchronize all the pages that are open on our todo app.

[PROTO UPDATE](/Tutorial/StreamProto.md)

[SERVER STREAM](/Tutorial/ServerStream.md)


# Conclusion

gRPC on the browser is now possible. It is a little complex to put in place, but once the foundation are set up it becomes a breeze to develop new functionalities, have a nice and secure bi-directionnal stream, backward and forward compatibility... 