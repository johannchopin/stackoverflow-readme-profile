<script lang="ts">
  import { API_BASEURL } from "$lib/constants";
  import UsersRepartionByTag from "$lib/components/tags-league/graphs/UsersRepartionByTag.svelte";

  import { page } from "$app/stores";

  let tag = $page.params.tagName;
  let userId = $page.params.userId;

  let scorePercentages: [number, number][];
  let percentageAmounts: [number, number][];

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
      percentageAmounts = res.percentageAmounts;
    } catch (error) {}
  };

  $: {
    fetchTagScoreRanking(tag);
    fetchTagScoreAmounts(tag);
  }
</script>

<div class="row justify-content-center mt-5">
  <div class="col-10 col-md-4">
    <img
      src="{API_BASEURL}/profile/{userId}?theme=dark&website=true&location=true"
      alt="user:{userId}'s SO profile"
      class="w-100"
    />
  </div>
</div>

{#if scorePercentages && percentageAmounts}
  <div class="row justify-content-center mt-4">
    <div class="col-12 col-md-8">
      <UsersRepartionByTag {scorePercentages} {percentageAmounts} />
    </div>
  </div>
{/if}

<style>
</style>
