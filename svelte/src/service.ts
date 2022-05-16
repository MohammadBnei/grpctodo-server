import type { ItemDto } from "./global";
import { GetItemRequest, Item } from "./proto/todo_pb";
import { itemStore } from "./store";

const itemUnwrapper = (item: Item): ItemDto => ({
    id: item.getId(),
    title: item.getTitle(),
    description: item.getDescription(),
    closed: item.getClosed()
})

export const itemWrapper = ({ title, description, closed }: ItemDto) => {
    const itemWrapped = new Item()
    itemWrapped.setTitle(title)
    itemWrapped.setDescription(description)
    closed && itemWrapped.setClosed(closed)

    return itemWrapped
};


export const getItems = async () => {
}

export const createItem = async ({ title, description }: ItemDto) => {
};

export const deleteItem = async (id: string) => {
    const req = new GetItemRequest();
    req.setId(id)

    await todoService.deleteItem(req, {});
    itemStore.removeItem(id)

}

export const closeItem = async (id: string) => {
    const req = new GetItemRequest();
    req.setId(id)

    const response = await todoService.closeItem(req, {});
    itemStore.updateItem(itemUnwrapper(response.getItem()))
}
