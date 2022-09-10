<script lang="ts">
  import { API_BASEURL } from "$lib/constants";
  import UsersRepartionByTag from "$lib/components/tags-league/graphs/UsersRepartionByTag.svelte";

  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import Rank from "$lib/components/tags-league/Rank.svelte";
  import SoTagLink from "$lib/components/tags-league/SoTagLink.svelte";

  let tag = $page.params.tagName;
  let userId = $page.params.userId;

  let scorePercentages: [number, number][];
  let percentageAmounts: [number, number][];
  let score: number;
  let topPercentage: number;

  const fetchTagScoreRanking = async (tag: string): Promise<void> => {
    try {
      const res = await (
        await fetch(`${API_BASEURL}/tags-league/tags/${tag}/scorePercentages`)
      ).json();
      scorePercentages = res;
    } catch (error) {}
  };

  const fetchTagScoreAmounts = async (tag: string): Promise<void> => {
    try {
      const res = await (
        await fetch(
          `${API_BASEURL}/tags-league/tags/${tag}/users/repartitionByScore`
        )
      ).json();
      percentageAmounts = res.percentageAmounts;
    } catch (error) {}
  };

  const fetchUserRank = async (tag: string, userId: string): Promise<void> => {
    try {
      const res = await (
        await fetch(`${API_BASEURL}/tags-league/tags/${tag}/users/${userId}`)
      ).json();
      score = res.score;
      topPercentage = res.topPercentage;
    } catch (error) {}
  };

  onMount(() => {
    const encodedTag = encodeURIComponent(tag);
    fetchTagScoreRanking(encodedTag);
    fetchTagScoreAmounts(encodedTag);
    fetchUserRank(encodedTag, userId);
  });
</script>

<h1 class="mb-0 mt-3 fs-3 fw-bold d-flex flex-wrap align-items-center">
  Tags League:
  <SoTagLink {tag} class="ms-2 fs-3" />
</h1>

{#if score && topPercentage}
  <div class="row justify-content-center align-items-center mt-5">
    <Rank percentage={topPercentage} />

    <div class="col-10 col-md-3 mt-3 mt-md-0">
      <img
        src="{API_BASEURL}/profile/{userId}?theme=dark&website=true&location=true"
        alt="user:{userId}'s SO profile"
      />
    </div>
  </div>
  <div class="row justify-content-center mt-4">
    <p class="col-11 col-md-6 m-0 fs-5 text-center lh-sm">
      This user is part of the <span class="text-primary fw-bold">
        top {topPercentage}
        <span class="fs-6" style="margin-left: -.35em;">%</span>
      </span>
      Stack Overflow answerers in the technology
      <SoTagLink {tag} /> with a score of {score}.
    </p>
  </div>
{/if}

<div class="row">
  <hr
    class="border border-primary border-1 col-8 col-md-6 m-auto opacity-75 my-4"
  />
</div>

{#if scorePercentages && percentageAmounts && topPercentage}
  <div class="row justify-content-center mt-5">
    <div class="col-12 col-md-8">
      <UsersRepartionByTag
        {scorePercentages}
        {percentageAmounts}
        userTopPercentage={topPercentage}
      />
    </div>
  </div>
{/if}

<style lang="scss">
  @import "../../../../../node_modules/bootstrap/scss/functions";
  @import "../../../../../node_modules/bootstrap/scss/variables";
  @import "../../../../../node_modules/bootstrap/scss/mixins";

  :global(.rank) {
    width: 32vw;
    height: 32vw;
  }

  @include media-breakpoint-up(md) {
    :global(.rank) {
      width: 9vw;
      height: 9vw;
    }
  }
</style>
