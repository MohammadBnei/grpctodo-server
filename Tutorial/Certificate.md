## Certificate

As gRPC heavily relies on http/2 and its multiplexing abilities, we need to create valid certificates to upgrade the connection to https. This can easily be done with mkcert, which creates the certificates and the CA to authenticate them. For more informations, [click here](https://github.com/FiloSottile/mkcert).

To generate the appropriate files, open a terminal in the root directory of the project :

```console
mkcert grpctodo.dev localhost
```

This will create two files, the cert and the key. Move them to dev/certs/. 

*Verify the permissions on the certificates (specially the key). Add a read permission accordingly*

And that's it for the certificates.

[Continue](/README.md#certificate--images)
