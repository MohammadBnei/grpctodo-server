<script lang="ts">
    let title = "";
    let description = "";

    const handleCreate = async () => {
        if (!title || !description) {
            return;
        }

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
