As of now, browsers cannot directly communicate with a gRPC server. So, the amazing dev community created the gRPC-web framework : it translates browser requests to our server. It is straight forward to implement with envoy.

We will add the http filter grpc-web, and add small configuration to our server route :
```Yml
                http_filters:
                  # New grpc web filter
                  - name: envoy.filters.http.grpc_web
                    typed_config:
                      "@type": type.googleapis.com/envoy.extensions.filters.http.grpc_web.v3.GrpcWeb
                  # Must be the last filter in the chain
                  - name: envoy.filters.http.router
                    typed_config:
                      "@type": type.googleapis.com/envoy.extensions.filters.http.router.v3.Router

                # ...

                    routes:
                        - match:
                            # When we create our front end, we only want request path prefixed with server for our grpc server
                            prefix: "/server/"
                          route:
                            cluster: server_grpc
                            prefix_rewrite: "/"
                            timeout: 0s
                            max_stream_duration:
                              grpc_timeout_header_max: 0s
```

That's it. Let's create the svelte front end to have a visual.


[Continue](/README.md#svelte)


