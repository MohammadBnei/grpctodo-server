[Postman](https://www.postman.com/product/what-is-postman/) is now permitting gRPC connection. If you intend to use it, don't forget to add the certificates by going into the settings. You'll find it there :
```console
mkcert -CAROOT
```

We implemented server reflection, so the services and messages are directly avalaible to the client.

![postman example](postman.jpg)

[Continue](/README.md#golang)
