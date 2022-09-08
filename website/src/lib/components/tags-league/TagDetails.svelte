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
          `${API_BASEURL}/tags-league/tags/${encodeURIComponent(tag)}`
        )
      ).json();
      scorePercentages = res.scorePercentages;
    } catch (error) {}
  };

  const fetchTagScoreAmounts = async (tag: string): Promise<void> => {
    try {
      const res = await (
        await fetch(
          `${API_BASEURL}/tags-league/tags/${encodeURIComponent(tag)}/users`
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
  <div class="d-flex">
    <TagScorePercentageTable {scorePercentages} />
    <UsersRepartionByTag {scorePercentages} {scoreAmounts} />
  </div>
{/if}
