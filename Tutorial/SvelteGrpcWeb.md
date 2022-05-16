If you look into our src folder, you should see the generated proto js and ts files. They encapsulate the necessary interface and client setup to use grpc web. But, we still need to install the npm packages :

```console
docker-compose exec front ni -D google-protobuf grpc-web

# From inside the container
ni -D google-protobuf grpc-web
```

Good. Let's open the connection and write the functions to speak to our server :

#### src/services.ts
```javascript
import type { ItemDto } from "./global";
import { TodoServiceClient } from "./proto/TodoServiceClientPb";
import { GetItemsRequest, CreateItemRequest, Item, GetItemRequest } from "./proto/todo_pb";

const todoServer = new TodoServiceClient("/server");

export const itemUnwrapper = (item: Item) => ({
  id: item.getId(),
  title: item.getTitle(),
  description: item.getDescription(),
  closed: item.getClosed(),
});

export const itemWrapper = ({ title, description, closed }: ItemDto) => {
  const itemWrapped = new Item()
  itemWrapped.setTitle(title)
  itemWrapped.setDescription(description)
  closed && itemWrapped.setClosed(closed)

  return itemWrapped
};

export const getItems = async () => {
  const req = new GetItemsRequest();
  return todoServer.getItems(req, {});
};


export const createItem = async (newItem: ItemDto) => {
  try {
    const req = new CreateItemRequest();
    const itemDto = itemWrapper(newItem)
    req.setItem(itemDto)

    return todoServer.createItem(req, {});

  }
  catch (e) {
    console.log({ e, message: e.message });
  }
};

export const deleteItem = async (id: string) => {
  const req = new GetItemRequest();
  req.setId(id)

  await todoServer.deleteItem(req, {});

}

export const closeItem = async (id: string) => {
  const req = new GetItemRequest();
  req.setId(id)

  return todoServer.closeItem(req, {});
}
```

The ItemDto is an interface that is created in global.d.ts :

#### global.d.ts
```javascript
/// <reference types="svelte" />

export interface ItemDto {
    id?: string;
    title: string;
    description: string;
    closed?: boolean;
  }
```

Nice. Now, to see if the connection works, use the getItems in App.svelte :
```html
<script lang="ts">
  import { onMount } from "svelte";
  import { getItems } from "./service";

  export let name: string;

  onMount(() => {
    getItems().then((r) => {
      console.log({ r });
    });
  });
</script>
```

Start svelte, connect to https://localhost.

You should see 
```console
{r: p…o.s…r.GetItemsResponse}
```
In the console of the browser


[Continue](/README.md#svelte)