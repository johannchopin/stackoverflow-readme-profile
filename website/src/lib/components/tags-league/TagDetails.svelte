<script lang="ts">
  import { API_BASEURL } from "$lib/constants";
  import UsersRepartionByTag from "./graphs/UsersRepartionByTag.svelte";
  import Loader from "./Loader.svelte";
  import SoTagLink from "./SoTagLink.svelte";

  import TagScorePercentageTable from "./TagScorePercentageTable.svelte";

  export let tag: string;

  let scorePercentages: [number, number][];
  let percentageAmounts: [number, number][];

  const fetchTagScoreRanking = async (tag: string): Promise<void> => {
    try {
      const res = await (
        await fetch(
          `${API_BASEURL}/tags-league/tags/${encodeURIComponent(
            tag
          )}/score-percentages`
        )
      ).json();
      scorePercentages = res;
    } catch (error) {}
  };

  const fetchTagScoreAmounts = async (tag: string): Promise<void> => {
    try {
      const res = await (
        await fetch(
          `${API_BASEURL}/tags-league/tags/${encodeURIComponent(
            tag
          )}/users/repartition-by-score`
        )
      ).json();
      percentageAmounts = res.percentageAmounts;
    } catch (error) {}
  };

  $: {
    fetchTagScoreRanking(tag);
    fetchTagScoreAmounts(tag);
  }
</script>

<h2 class="fs-4 mt-5">
  Insights of the tag
  <SoTagLink class="fs-4" {tag} />
</h2>

{#if scorePercentages && percentageAmounts}
  <div class="row mt-4">
    <div class="col-12 col-md-4 my-2">
      <TagScorePercentageTable {scorePercentages} />
    </div>
    <div class="col-12 col-md-8 my-2">
      <UsersRepartionByTag {scorePercentages} {percentageAmounts} />
    </div>
  </div>
{:else}
  <div
    class="loader border rounded-2 row justify-content-center align-items-center mx-2 mt-4 p-5"
  >
    <Loader />
  </div>
{/if}

<style>
  .loader :global(.loader) {
    width: 6rem;
  }
</style>
