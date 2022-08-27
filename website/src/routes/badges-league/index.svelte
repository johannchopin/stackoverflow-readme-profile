<script lang="ts">
  import { onMount } from "svelte";
  import { API_BASEURL } from "$lib/constants";

  let tags: string[] = [];

  onMount(async () => {
    tags = await (await fetch(`${API_BASEURL}/badges-league/badges`)).json();
  });
</script>

<h1 class="mb-0 mt-3 fs-3 fw-bold">Welcome to the Badges League</h1>

<div class="d-flex justify-content-center flex-wrap mt-5">
  {#each tags as tag}
    <span
      class="badge rounded-2 text-bg-dark border border-primary border-2 m-1"
      >{tag}</span
    >
  {/each}
</div>
