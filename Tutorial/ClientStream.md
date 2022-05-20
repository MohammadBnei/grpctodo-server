You already now the client side implentation is easy. The òajority of the work is done by the structure of our app. So, now, we just need to call the generated function to use the stream service :

#### service.ts

```javascript
export const itemStream = () => {
  const req = new GetItemsRequest();
  let stream = todoServer.getItemsStream(req, {});

  stream.on("data", function (response) {
    const [type, item] = [
      response.getType(),
      itemUnwrapper(response.getItem()),
    ];
    switch (type) {
      case StreamResponse.TYPE.CREATED:
        itemStore.addItem(item);
        break;
      case StreamResponse.TYPE.UPDATED:
        itemStore.updateItem(item);
        break;
      case StreamResponse.TYPE.DELETED:
        itemStore.removeItem(item.id);
        break;
    }
  });

  stream.on("error", (err) => console.log({ err }));

  // try to relaunch the stream in case of a server failure.
  stream.on("end", () => (stream = todoServer.getItemsStream(req, {})));
  stream.on("status", (status) => console.log({ status }));

  // Returning the cancel function to be called on Unmount
  return stream.cancel;
};
```
Since we use the stream to handle synchonization of the items, you can remove all the lines where our CRUD functions updated the store.

Then simply update our App entrypoint : 
```javascript
onMount(() => itemStream());
```

And it's complete. All our actions are synchronized trough streams, open multiple tabs of https://localhost to see it in action.

[Continue](/README.md#conclusion)