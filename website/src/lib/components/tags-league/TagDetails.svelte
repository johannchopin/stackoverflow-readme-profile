<script lang="ts">
  import { API_BASEURL } from "$lib/constants";

  import TagScorePercentageTable from "./TagScorePercentageTable.svelte";

  export let tag: string;

  let scorePercentages: [number, number][];

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

  $: {
    fetchTagScoreRanking(tag);
  }
</script>

<h2>{tag}</h2>

{#if scorePercentages}
  <TagScorePercentageTable {scorePercentages} />
{/if}
