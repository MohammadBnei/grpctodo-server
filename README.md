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

[DOCKER COMPOSE PART 1](/Tutorial/DockerCompose1.md)

# Golang
Let's start with the server

[GOLANG INIT](/Tutorial/GolangInit.md)

[CONFIG](/Tutorial/Config.md)

[DATABASE](/Tutorial/Database.md)

[START](/Tutorial/TryDB.md)

[GRPC](/Tutorial/Grpc.md)

[SERVER](/Tutorial/Server.md)

[REAL START](/Tutorial/RStart.md)

# Envoy

[DOCKER COMPOSE PART 2](/Tutorial/DockerCompose2.md)

[ROUTER](/Tutorial/Router.md)

[GRPC WEB](/Tutorial/GrpcWeb.md)

# Svelte

[DOCKER COMPOSE PART 3](/Tutorial/DockerCompose3.md)

[SVELTE INIT](/Tutorial/SvelteInit.md)

[GRPC WEB](/Tutorial/SvelteGrpcWeb.md)

[TODO APP](/Tutorial/TodoApp.md)

# Conclusion

The gR