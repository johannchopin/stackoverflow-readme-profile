<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/stores";

  import { API_BASEURL } from "$lib/constants";
  import TagDetails from "$lib/components/tags-league/TagDetails.svelte";
  import SoCup from "$lib/components/icons/SoCup.svelte";
  import TagsList from "$lib/components/tags-league/TagsList.svelte";
  import ConsultScoreSection from "./components/ConsultScoreSection.svelte";
  import Graph from "$lib/components/icons/Graph.svelte";
  import SoTagLink from "$lib/components/tags-league/SoTagLink.svelte";
  import Eye from "$lib/components/icons/Eye.svelte";

  let tags: string[] = [];
  let revealInsights = false;
  $: selectedTag = $page.url.searchParams.get("tag");
  $: selectedTagIsValid = tags.includes(selectedTag);

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

<h2 class="fs-4 mt-5">Select your favourite technology</h2>

<TagsList {tags} {selectedTag} />

{#if selectedTag && selectedTagIsValid}
  <hr class="border border-primary border-1 w-75 m-auto opacity-75 my-4" />
  <ConsultScoreSection tag={selectedTag} />
  <hr class="border border-primary border-1 w-75 m-auto opacity-75 my-4" />

  <h2 class="fs-4 mt-5">
    <span class="text-primary fs-3">
      <Graph />
    </span>
    Insights of the tag
    <SoTagLink class="fs-4" tag={selectedTag} />
  </h2>

  {#if revealInsights}
    <TagDetails tag={selectedTag} />
  {:else}
    <div class="d-flex justify-content-center mt-4">
      <button
        class="btn btn-outline-primary mx-auto"
        on:click={() => (revealInsights = true)}
      >
        <Eye />
        Reveal insights
      </button>
    </div>
  {/if}
{/if}

<style lang="scss">
  h1 :global(svg) {
    height: 1.8rem;
    width: 1.8rem;
  }
</style>
