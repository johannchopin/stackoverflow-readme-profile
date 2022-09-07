<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/stores";

  import { API_BASEURL } from "$lib/constants";

  let tags: string[] = [];
  $: selectedTag = $page.url.searchParams.get("tag");
  let selectedTagScorePercentile: number[];

  const getTagRandomDelay = (): string => {
    return (Math.random() * (0 - 1.2) + 1.2).toFixed(4);
  };

  const fetchTagScoreRanking = async (tag: string): Promise<void> => {
    try {
      const res = await (
        await fetch(
          `${API_BASEURL}/tags-league/tags/${encodeURIComponent(tag)}`
        )
      ).json();
      selectedTagScorePercentile = res.scorePercentile;
    } catch (error) {}
  };

  $: {
    if (selectedTag) {
      fetchTagScoreRanking(selectedTag);
    }
  }

  onMount(async () => {
    tags = await (await fetch(`${API_BASEURL}/tags-league/tags`)).json();
  });
</script>

<h1 class="mb-0 mt-3 fs-3 fw-bold">Welcome to the Tags League</h1>

<div class="d-flex justify-content-center flex-wrap mt-5">
  {#each tags as tag}
    <a
      href={"?tag=" + encodeURIComponent(tag)}
      class="so-tag rounded-2 text-bg-dark m-1 p-1 px-2 text-decoration-none"
      class:selected={tag === selectedTag}
      style="animation-delay: {getTagRandomDelay()}s;">{tag}</a
    >
  {/each}
</div>

{#if selectedTag}
  {selectedTag}
{/if}

<style lang="scss">
  .so-tag {
    opacity: 0;
    animation: apparition 0.3s forwards;
    color: #9cc1db;
    background-color: #3d4951;
    font-size: 0.8rem;
    border: solid 2px transparent;

    &:hover,
    &:focus,
    &.selected {
      color: #cde1ee;
      background-color: #435460;
    }

    &.selected {
      border-color: #cde1ee;
    }
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
