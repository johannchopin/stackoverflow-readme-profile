<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/animate";

  import { API_BASEURL } from "$lib/constants";

  let tags: string[] = [];

  const getTagRandomDelay = (): string => {
    return (Math.random() * (0 - 1.2) + 1.2).toFixed(4);
  };

  onMount(async () => {
    tags = await (await fetch(`${API_BASEURL}/badges-league/badges`)).json();
  });
</script>

<h1 class="mb-0 mt-3 fs-3 fw-bold">Welcome to the Badges League</h1>

<div class="d-flex justify-content-center flex-wrap mt-5">
  {#each tags as tag}
    <span
      class="so-tag rounded-2 text-bg-dark m-1 p-1 px-2"
      style="animation-delay: {getTagRandomDelay()}s;">{tag}</span
    >
  {/each}
</div>

<style>
  .so-tag {
    opacity: 0;
    animation: apparition 0.3s forwards;
    color: #9cc1db;
    background-color: #3d4951;
    font-size: 0.8rem;
  }

  @keyframes apparition {
    from {
      opacity: 0;
      transform: translateY(0.5em);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
