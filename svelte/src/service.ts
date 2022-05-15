import { TodoServiceClient } from "./proto/TodoServiceClientPb";
import { GetItemsRequest, CreateItemRequest, Item, GetItemRequest } from "./proto/todo_pb";
import { itemStore } from "./sotres";

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

export const getItems = async () => {
  const req = new GetItemsRequest();
  const response = await todoServer.getItems(req, {
    'Authorization': 'Bearer potatoes'
  });

  itemStore.set(response.getItemsList().map((item) => itemUnwrapper(item)))
};


export const createItem = async (newItem: ItemDto) => {
  const req = new CreateItemRequest();
  const itemDto = itemWrapper(newItem)
  req.setItem(itemDto)

  const response = await todoServer.createItem(req, {});

  itemStore.addItem(itemUnwrapper(response.getItem()))
};

export const deleteItem = async (id: string) => {
  const req = new GetItemRequest();
  req.setId(id)

  await todoServer.deleteItem(req, {});
  itemStore.removeItem(id)

}

export const closeItem = async (id: string) => {
  const req = new GetItemRequest();
  req.setId(id)

  const response = await todoServer.closeItem(req, {});
  itemStore.updateItem(itemUnwrapper(response.getItem()))
}

export const openItem = async (id: string) => {
  const req = new GetItemRequest();
  req.setId(id)

  const response = await todoServer.openItem(req, {});
  itemStore.updateItem(itemUnwrapper(response.getItem()))
}
