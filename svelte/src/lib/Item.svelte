<script lang="ts">
    import { closeItem, deleteItem, openItem, type ItemDto } from "../service";

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
                <button
                    class="btn btn-info mx-2"
                    on:click={() => closeItem(item.id)}>Close</button
                >
            {:else}
                <button
                    class="btn btn-info mx-2"
                    on:click={() => openItem(item.id)}>Open</button
                >
                <!-- else content here -->
            {/if}
            <button class="btn btn-warning" on:click={() => deleteItem(item.id)}
                >Delete</button
            >
        </div>
    </div>
</div>
