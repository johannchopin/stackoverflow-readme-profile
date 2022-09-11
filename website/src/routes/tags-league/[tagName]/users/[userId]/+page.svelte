<script lang="ts">
  import { API_BASEURL } from "$lib/constants";
  import UsersRepartionByTag from "$lib/components/tags-league/graphs/UsersRepartionByTag.svelte";

  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import SoTagLink from "$lib/components/tags-league/SoTagLink.svelte";
  import LoadingAnimation from "$lib/components/tags-league/LoadingAnimation.svelte";
  import UnknownTagError from "$lib/components/tags-league/UnknownTagError.svelte";
  import UnknownUserError from "$lib/components/tags-league/UnknownUserError.svelte";
  import UserDetails from "$lib/components/tags-league/UserDetails.svelte";
  import LastUpdate from "$lib/components/LastUpdate.svelte";

  let tag = $page.params.tagName;
  let userId = $page.params.userId;

  let scorePercentages: [number, number][];
  let percentageAmounts: [number, number][];
  let score: number;
  let topPercentage: number;
  let lastUpdate: Date;
  let errors = {
    invalidTag: false,
    invalidUser: false,
  };

  const fetchTagScoreRanking = async (tag: string): Promise<void> => {
    try {
      const res = await (
        await fetch(`${API_BASEURL}/tags-league/tags/${tag}/scorePercentages`)
      ).json();
      scorePercentages = res;
    } catch (error) {
      errors.invalidTag = true;
    }
  };

  const fetchTagScoreAmounts = async (tag: string): Promise<void> => {
    try {
      const res = await (
        await fetch(
          `${API_BASEURL}/tags-league/tags/${tag}/users/repartitionByScore`
        )
      ).json();
      percentageAmounts = res.percentageAmounts;
    } catch (error) {
      errors.invalidTag = true;
    }
  };

  const fetchUserRank = async (tag: string, userId: string): Promise<void> => {
    try {
      const res = await (
        await fetch(`${API_BASEURL}/tags-league/tags/${tag}/users/${userId}`)
      ).json();
      score = res.score;
      topPercentage = res.topPercentage;
      lastUpdate = new Date(res.lastUpdate);
    } catch (error) {
      errors.invalidUser = true;
    }
  };

  onMount(() => {
    const encodedTag = encodeURIComponent(tag);
    fetchTagScoreRanking(encodedTag);
    fetchTagScoreAmounts(encodedTag);
    fetchUserRank(encodedTag, userId);
  });
</script>

<LoadingAnimation
  hide={(score && topPercentage) !== undefined ||
    errors.invalidTag ||
    errors.invalidUser}
/>

<h1 class="mb-0 mt-3 fs-3 fw-bold d-flex flex-wrap align-items-center">
  Tags League:
  <SoTagLink {tag} class="ms-2 fs-4" />
</h1>

{#if errors.invalidTag}
  <UnknownTagError {tag} />
{:else if errors.invalidUser}
  <UnknownUserError />
{:else if scorePercentages && percentageAmounts && topPercentage}
  <LastUpdate date={lastUpdate} />

  <UserDetails {userId} {score} {tag} {topPercentage} />

  <div class="row">
    <hr
      class="border border-primary border-1 col-8 col-md-6 m-auto opacity-75 my-4"
    />
  </div>

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
  @import "../../../../../../node_modules/bootstrap/scss/functions";
  @import "../../../../../../node_modules/bootstrap/scss/variables";
  @import "../../../../../../node_modules/bootstrap/scss/mixins";

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
