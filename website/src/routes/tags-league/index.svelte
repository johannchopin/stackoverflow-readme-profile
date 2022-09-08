<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/stores";

  import { API_BASEURL } from "$lib/constants";
  import TagDetails from "$lib/components/tags-league/TagDetails.svelte";
  import SoCup from "$lib/components/icons/SoCup.svelte";

  let tags: string[] = [];
  let filter = "";
  $: selectedTag = $page.url.searchParams.get("tag");

  const getTagRandomDelay = (): string => {
    return (Math.random() * (0 - 1.2) + 1.2).toFixed(4);
  };

  onMount(async () => {
    tags = await (await fetch(`${API_BASEURL}/tags-league/tags`)).json();
  });
</script>

<h1 class="mb-0 mt-3 fs-3 fw-bold d-flex flex-wrap align-items-center">
  Welcome to the
  <span class="fs-3 so-tag w-fit-content d-flex align-items-center ms-2">
    <span class="me-2"><SoCup /></span>
    Tags League
  </span>
</h1>

<div class="input-group m-0  mt-5 row">
  <div class="col-6 col-md-4 ms-auto p-0">
    <input
      type="text"
      class="form-control"
      placeholder="Filter tags"
      bind:value={filter}
    />
  </div>
</div>

<ul class="d-flex justify-content-center flex-wrap mt-2 list-unstyled">
  {#each tags as tag}
    <li class="my-1" style="animation-delay: {getTagRandomDelay()}s;">
      <a
        href={"?tag=" + encodeURIComponent(tag)}
        class="mx-1 so-tag clickable text-bg-dark text-decoration-none"
        class:selected={tag === selectedTag}
        class:d-none={filter.length > 0 && !tag.includes(filter)}
        >{tag}
      </a>
    </li>
  {/each}
</ul>

{#if selectedTag}
  <TagDetails tag={selectedTag} />
{/if}

<style lang="scss">
  h1 :global(svg) {
    height: 1.8rem;
    width: 1.8rem;
  }

  ul li {
    opacity: 0;
    animation: apparition 0.3s forwards;
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
