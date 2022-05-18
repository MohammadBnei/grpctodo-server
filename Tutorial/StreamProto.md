To implement our server streaming, we need to create a new message, with a type as an enum. This will be used by the client to understand what is the type of data being sent.

#### todo.proto
```
message StreamResponse {
    enum TYPE {
        CREATED = 0;
        DELETED = 1;
        UPDATED = 2;
    }
    TYPE type = 4;
    Item item = 5;
}
```

We also need to serve this stream message, with a rpc function definition :

#### todo.proto
```
    rpc GetItemsStream(General) returns (stream StreamResponse);
```

Good. Don't forget to regenerate the proto stubs.

[Continue](/README.md#server-stream)
