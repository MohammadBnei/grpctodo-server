We have all our grpc functions, we can now focus on how the front end will interact with the user. To simplify the process, we will use a [svelte store](https://svelte.dev/tutorial/writable-stores) to handle all the reactivity :

#### src/store.ts
```javascript
import { get, writable } from 'svelte/store'
import type { ItemDto } from './global';

const createItemsStore = () => {
    const store = writable<ItemDto[]>([]);

    return {
        ...store,
        addItem(item: ItemDto) {
            store.update(s => [...s, item])
        },
        removeItem(id: string) {
            store.update(s => s.filter(({ id: _id }) => _id !== id))
        },
        updateItem(item: ItemDto) {
            const currentStore = get(store)
            const index = currentStore.findIndex(({ id }) => item.id === id)
            if (index === -1) return

            currentStore.splice(index, 1, item)

            store.set(currentStore)
        }
    }
}

export const itemStore = createItemsStore()
```

Update our grpc functions to connect with the store :

#### src/service.ts
```javascript
import { itemStore } from "./store";

// ...

export const getItems = async () => {
    const req = new GetItemsRequest();
    const response = await todoServer.getItems(req, {});

    itemStore.set(response.getItemsList().map((item) => itemUnwrapper(item)))
};


export const createItem = async (newItem: ItemDto) => {
    try {
        const req = new CreateItemRequest();
        const itemDto = itemWrapper(newItem)
        req.setItem(itemDto)

        const response = await todoServer.createItem(req, {});

        itemStore.addItem(itemUnwrapper(response.getItem()))
    }
    catch (e) {
        console.log({ e, message: e.message });
    }
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
```

Now, create the ui components for the items :
[UI](UI.md)

Update the App.svelte to connect everything :

#### App.svelte
```html
<script lang="ts">
	import { onMount } from "svelte";
	import CreateItem from "./lib/CreateItem.svelte";
	import Item from "./lib/Item.svelte";
	import { getItems } from "./service";
	import { itemStore } from "./store";
  
	onMount(getItems);
  </script>
  
  <div class="hero min-h-screen bg-base-200">
	<div class="w-screen grid grid-cols-[1fr_auto_1fr] place-items-center">
	  <div class="flex flex-wrap justify-center ">
		{#each $itemStore.filter(({closed}) => !closed) as item (item.id)}
		  <Item {item} />
		{:else}
		  <h1>No item</h1>
		{/each}
	  </div>
	  <div class="divider divider-horizontal">Closed →</div>
	  <div class="flex flex-wrap justify-center">
		{#each $itemStore.filter(({closed}) => !!closed) as item (item.id)}
		  <Item {item} />
		{:else}
		  <h1>No item</h1>
		{/each}
	  </div>
	</div>
  </div>
  
  <div class="fixed right-2 top-2">
	<CreateItem />
  </div>
  
  <style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
  </style>
  
```

Done. Go to https://localhost to test it out.

[Continue](/README.md#svelte)
