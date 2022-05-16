We will use a modal to create a new item :

#### src/lib/CreateItem.svelte
```html
<script lang="ts">
    import { createItem } from "../service";

    let title = "";
    let description = "";

    const handleCreate = async () => {
        if (!title || !description) {
            return;
        }

        await createItem({ title, description });
        title = "";
        description = "";
    };
</script>

<!-- The button to open modal -->
<label for="my-modal" class="btn modal-button btn-primary">Create Item</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal" class="modal-toggle" />
<label for="my-modal" class="modal cursor-pointer">
    <label class="modal-box relative" for="">
        <h3 class="font-bold text-lg">Create an item</h3>
        <div class="form-control w-full max-w-xs">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="label">
                <span class="label-text">Title</span>
            </label>
            <input
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs"
                bind:value={title}
            />
        </div>
        <div class="form-control w-full max-w-xs">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="label">
                <span class="label-text">Description</span>
            </label>
            <input
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs"
                bind:value={description}
            />
        </div>
        <div class="modal-action">
            <label
                for="my-modal"
                class="btn btn-primary my-2"
                on:click={handleCreate}>Create</label
            >
        </div>
    </label>
</label>
```

And the item itself :

#### src/lib/Item.svelte
```html
<script lang="ts">
  import type { ItemDto } from "../global";
  import { closeItem, deleteItem } from "../service";

  export let item: ItemDto;
</script>

<div class="card w-96 bg-base-100 shadow-xl m-2">
  <div class="card-body">
    <h2 class="card-title " class:line-through={item.closed}>
      {item.title}
    </h2>
    <p>{item.description}</p>
    <div class="card-actions justify-end">
      {#if !item.closed}
        <button class="btn btn-info mx-2" on:click={() => closeItem(item.id)}
          >Close</button
        >
      {/if}
      <button class="btn btn-warning" on:click={() => deleteItem(item.id)}
        >Delete</button
      >
    </div>
  </div>
</div>
```