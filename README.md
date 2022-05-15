# Informations

## Goal

We want to create a Todo App. The functionallities will be basic (CRUD), so we can focus on the technical aspect of gRPC.

We will see step by step how to implement a golang grpc server, with full TLS encryption. 
This server will be made avalaible by the envoy proxy with a grpc-web filter, to translate browser sent request.

Once the backend part is done, we will develop the frontend with svelte. Enforced by typescript and tailwindcss, implementing an application with svelte is a breeze.

## Prerequesites

- [mkcert](https://mkcert.org)
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

# Tutorial

## Certificates

As gRPC heavily relies on http/2 and its multiplexing abilities, we need to create valid certificates to upgrade the connection to https. This can easily be done with mkcert, which creates the certificates and the CA to authenticate them. For more informations, [click here](https://mkcert.org).