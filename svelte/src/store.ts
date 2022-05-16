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