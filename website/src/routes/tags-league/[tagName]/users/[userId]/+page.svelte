<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import { API_BASEURL } from "$lib/constants";
  import UsersRepartionByTag from "$lib/components/tags-league/graphs/UsersRepartionByTag.svelte";
  import LoadingAnimation from "$lib/components/tags-league/LoadingAnimation.svelte";
  import UnknownTagError from "$lib/components/tags-league/UnknownTagError.svelte";
  import UnknownUserError from "$lib/components/tags-league/UnknownUserError.svelte";
  import UserDetails from "$lib/components/tags-league/UserDetails.svelte";
  import LastUpdate from "$lib/components/LastUpdate.svelte";
  import Ranking from "$lib/components/icons/Ranking.svelte";
  import BadgePreview from "./components/BadgePreview.svelte";
  import ThemesSelect from "$lib/components/ThemesSelect.svelte";
  import Markdown from "$lib/components/icons/Markdown.svelte";
  import Html from "$lib/components/icons/Html.svelte";
  import X from "$lib/components/icons/X.svelte";

  const BADGE_PREVIEW_ID = "badgePreview";

  let tag = $page.params.tagName;
  let userId = $page.params.userId;

  let showBadgePreview = false;
  let scorePercentages: [number, number][];
  let percentageAmounts: [number, number][];
  let score: number;
  let topPercentage: number;
  let lastUpdate: Date;
  let errors = {
    invalidTag: false,
    invalidUser: false,
  };
  let theme = "default";

  const fetchTagScoreRanking = async (tag: string): Promise<void> => {
    try {
      const res = await (
        await fetch(`${API_BASEURL}/tags-league/tags/${tag}/score-percentages`)
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
          `${API_BASEURL}/tags-league/tags/${tag}/users/repartition-by-score`
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
  <span class="text-primary me-1"><Ranking /></span>
  Tags League
</h1>

{#if errors.invalidTag}
  <UnknownTagError {tag} />
{:else if errors.invalidUser}
  <UnknownUserError />
{:else if scorePercentages && percentageAmounts && topPercentage}
  <LastUpdate date={lastUpdate} class="d-none d-md-block" />

  <h2 class="so-tag w-fit-content fs-4 m-auto mt-5 mt-md-0 mb-1">{tag}</h2>

  <UserDetails {userId} {score} {tag} {topPercentage} />

  <div class="d-flex justify-content-center mt-4">
    <a
      id="getBadge"
      href={"#" + BADGE_PREVIEW_ID}
      class="btn btn-outline-primary btn-sm m-auto"
      on:click={() => (showBadgePreview = true)}
    >
      <span class="icons position-relative">
        <span class="text-white"><Markdown /></span>
        <span class="text-white"><Html /></span>
        <span class="placeholder opacity-0"><Html /></span>
      </span>
      Get your badge
    </a>
  </div>

  <div class="row">
    <hr
      class="border border-primary border-1 col-8 col-md-6 m-auto opacity-75 my-4"
    />
  </div>

  <div id={BADGE_PREVIEW_ID} class:open={showBadgePreview}>
    {#if showBadgePreview}
      <div class="mb-4 d-flex justify-content-between align-items-center">
        <h2>Badge preview</h2>
        <button
          class="btn btn-outline-secondary btn-sm"
          on:click={() => (showBadgePreview = false)}
        >
          <X />
          Close
        </button>
      </div>

      <div class="container">
        <h3 class="fs-4">
          <span class="fw-bold text-primary">1.</span>
          Select the theme:
        </h3>

        <ThemesSelect bind:theme class="d-flex flex-wrap" />

        <h3 class="fs-4 mt-5 mb-3">
          <span class="fw-bold text-primary">2.</span>
          Copy the Markdown/HTML into your README:
        </h3>

        <BadgePreview {tag} {userId} {theme} />
      </div>
    {/if}

    <div class="row mt-5">
      <hr
        class="border border-primary border-1 col-8 col-md-6 m-auto opacity-75 my-4"
      />
    </div>
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

  <LastUpdate date={lastUpdate} class="d-md-none me-auto" />
{/if}

<style lang="scss">
  @import "../../../../../../node_modules/bootstrap/scss/functions";
  @import "../../../../../../node_modules/bootstrap/scss/variables";
  @import "../../../../../../node_modules/bootstrap/scss/mixins";

  :global(.rank) {
    width: 32vw;
    height: 32vw;
  }

  #getBadge {
    .icons {
      span:not(.placeholder) {
        position: absolute;
        animation: apparition 2.8s infinite;

        &:nth-of-type(2) {
          opacity: 0;
          animation-delay: 1.4s;
        }
      }
    }
  }

  #badgePreview {
    overflow: hidden;
    height: 0px;
    transition: height 0.5s;

    &.open {
      height: 600px;
      animation: open 1s forwards;
      animation-delay: 0.5s;
    }
  }

  @include media-breakpoint-up(md) {
    :global(.rank) {
      width: 9vw;
      height: 9vw;
    }
  }

  @keyframes open {
    from {
    }
    to {
      height: fit-content;
    }
  }

  @keyframes apparition {
    0% {
      transform: translateY(5px);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    65% {
      opacity: 0;
    }
    100% {
      transform: translateY(-5px);
      opacity: 0;
    }
  }

  /*
  @keyframes apparition {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    75% {
      filter: none;
    }
    100% {
      opacity: 0;
    }
  }
  */
</style>
