import { TodoServiceClient } from "./proto/TodoServiceClientPb";
import { GetItemsRequest, CreateItemRequest, Item, GetItemRequest, StreamResponse } from "./proto/todo_pb";
import { itemStore } from "./store";

const todoServer = new TodoServiceClient("/server");

export interface ItemDto {
  id?: string;
  title: string;
  description: string;
  closed?: boolean;
}

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

export const itemStream = () => {
  const req = new GetItemsRequest();
  const stream = todoServer.getItemsStream(req, {})
  stream.on("data", function (response) {
    const [type, item] = [response.getType(), itemUnwrapper(response.getItem())]
    console.log({type})
    switch (type) {
      case StreamResponse.TYPE.CREATED:
        itemStore.addItem(item)
        break;
      case StreamResponse.TYPE.UPDATED:
        itemStore.updateItem(item)
        break;
      case StreamResponse.TYPE.DELETED:
        itemStore.removeItem(item.id)
        break;
    }
  });

  stream.on("error", (err) => console.log({ err }));

  return stream.cancel;
}

export const getItems = async () => {
  const req = new GetItemsRequest();
  const response = await todoServer.getItems(req, {
    'Authorization': 'Bearer potatoes'
  });

  // itemStore.set(response.getItemsList().map((item) => itemUnwrapper(item)))
};


export const createItem = (newItem: ItemDto) => {
  const req = new CreateItemRequest();
  const itemDto = itemWrapper(newItem)
  req.setItem(itemDto)

  todoServer.createItem(req, {});
};

export const deleteItem = (id: string) => {
  const req = new GetItemRequest();
  req.setId(id)

  todoServer.deleteItem(req, {});

}

export const closeItem = (id: string) => {
  const req = new GetItemRequest();
  req.setId(id)

  todoServer.closeItem(req, {});
}

export const openItem = (id: string) => {
  const req = new GetItemRequest();
  req.setId(id)

  todoServer.openItem(req, {});
}
