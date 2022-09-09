<script lang="ts">
  import { API_BASEURL } from "$lib/constants";
  import UsersRepartionByTag from "./graphs/UsersRepartionByTag.svelte";

  import TagScorePercentageTable from "./TagScorePercentageTable.svelte";

  export let tag: string;

  let scorePercentages: [number, number][];
  let scoreAmounts: [number, number][];

  const fetchTagScoreRanking = async (tag: string): Promise<void> => {
    try {
      const res = await (
        await fetch(
          `${API_BASEURL}/tags-league/tags/${encodeURIComponent(
            tag
          )}/scorePercentages`
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
          )}/users/repartitionByScore`
        )
      ).json();
      scoreAmounts = res.scoreAmounts;
    } catch (error) {}
  };

  $: {
    fetchTagScoreRanking(tag);
    fetchTagScoreAmounts(tag);
  }
</script>

<h2 class="fs-4 mt-5">
  Insights of the tag
  <span class="fs-4 so-tag">
    {tag}
  </span>
</h2>

{#if scorePercentages && scoreAmounts}
  <div class="row">
    <div class="col-12 col-md-4 my-2">
      <TagScorePercentageTable {scorePercentages} />
    </div>
    <div class="col-12 col-md-8 my-2">
      <UsersRepartionByTag {scorePercentages} {scoreAmounts} />
    </div>
  </div>
{/if}
