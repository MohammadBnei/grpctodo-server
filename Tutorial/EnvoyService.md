We are going to [install envoy v1.22](https://www.envoyproxy.io/docs/envoy/v1.22.0/start/install) with docker.

Inside the dev folder, create the envoy conf file :

#### envoy.yml
```yml
admin:
  address:
    socket_address: { address: 0.0.0.0, port_value: 9901 }
# For mac only
# layered_runtime:
#   layers:
#     - name: disable_apple_dns
#       static_layer:
#         envoy.restart_features.use_apple_api_for_dns_lookups: false

static_resources:
  # Listeners handle the exposition of our proxy
  listeners:
    - name: listener_0
      address:
        socket_address:
          address: 0.0.0.0
          port_value: 8081
      filter_chains:
        - filters:
            - name: envoy.filters.network.http_connection_manager
              typed_config:
                "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
                codec_type: auto
                stat_prefix: todo_service

                http_filters:
                  - name: envoy.filters.http.router
                    typed_config:
                      "@type": type.googleapis.com/envoy.extensions.filters.http.router.v3.Router

                route_config:
                  name: server_route
                  virtual_hosts:
                    - name: grpc_server
                      domains:
                        - "*"
                      routes:
                        # Tell envoy where to proxy the request
                        - match:
                            prefix: "/server/"
                          route:
                            # Cluster is the service that will handle the request
                            cluster: server_grpc
                            prefix_rewrite: "/"
                            timeout: 0s
                            max_stream_duration:
                              grpc_timeout_header_max: 0s

          # Add TLS support
          transport_socket:
            name: envoy.transport_sockets.tls
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.transport_sockets.tls.v3.DownstreamTlsContext
              common_tls_context:
                alpn_protocols: ["h2,http/1.1"]
                tls_certificates:
                  - certificate_chain:
                      filename: /etc/certs/cert.pem
                    private_key:
                      filename: /etc/certs/key.pem

  clusters:
    - name: server_grpc
      connect_timeout: 0.25s
      type: logical_dns
      http2_protocol_options: {}
      lb_policy: round_robin
      load_assignment:
        cluster_name: cluster_0
        endpoints:
          - lb_endpoints:
              - endpoint:
                  address:
                    socket_address:
                      # Docker compose network address
                      address: server
                      port_value: 4000
      transport_socket:
        name: envoy.transport_sockets.tls
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.transport_sockets.tls.v3.UpstreamTlsContext

```
Yml are tricky when it comes to indentation, so be careful.

We will now create the fronte nd route, starting with the cluster :
```yml
    - name: svelte_grpc
      connect_timeout: 0.25s
      type: logical_dns
      http2_protocol_options: {}
      lb_policy: round_robin
      load_assignment:
        cluster_name: cluster_0
        endpoints:
          - lb_endpoints:
              - endpoint:
                  address:
                    socket_address:
                      address: front
                      port_value: 5000
      transport_socket:
        name: envoy.transport_sockets.tls
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.transport_sockets.tls.v3.UpstreamTlsContext
```

And configure the route :

```Yml
                      routes:
                        # Server route ...
                        - match:
                            prefix: "/"
                          route:
                            cluster: svelte_grpc
```

Add a new service in the compose.yml file :

#### compose.yml
```yml
  envoy:
    image: envoyproxy/envoy:v1.22.0
    volumes:
      - ./dev/envoy.yml:/etc/envoy/envoy.yml
      - ./dev/certs/grpctodo.dev+1-key.pem:/etc/certs/key.pem
      - ./dev/certs/grpctodo.dev+1.pem:/etc/certs/cert.pem
    ports:
      - 443:8081
      - 9901:9901
    command: envoy -c /etc/envoy/envoy.yml
```
We are injecting the certs and the config file we just created.
Awesome. Let's start the container :
```console
docker-compose up -d
```

If you log the output of the envoy container, you should see the following line :
```console
[info][config] [source/server/listener_manager_impl.cc:789] all dependencies initialized. starting workers
```

It means envoy is correctly setup and ready to go.

[TEST](Test.md#envoy)


[Continue](/README.md#envoy)
