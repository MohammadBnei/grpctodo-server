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
      {#each $itemStore.filter(({ closed }) => !closed) as item (item.id)}
        <Item {item}/>
      {/each}
    </div>
    <div class="divider divider-horizontal">Closed →</div>
    <div class="flex flex-wrap justify-center">
      {#each $itemStore.filter(({ closed }) => !!closed) as item (item.id)}
        <Item {item}/>
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
