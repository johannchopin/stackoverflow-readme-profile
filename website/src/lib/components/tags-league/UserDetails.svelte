<script lang="ts">
  import { API_BASEURL, SCORE_COMPUTATION_INFOS } from "$lib/constants";
  import { getPathToUserSOProfilePage } from "$lib/utils";

  import Rank from "./Rank.svelte";
  import SoTagLink from "./SoTagLink.svelte";

  export let topPercentage: number;
  export let userId: number | string;
  export let tag: string;
  export let score: number;
</script>

<div class="row justify-content-center align-items-center">
  <Rank percentage={topPercentage} />

  <div class="col-10 col-md-3 mt-3 mt-md-0">
    <a href={getPathToUserSOProfilePage(userId)} target="_blank">
      <img
        src="{API_BASEURL}/profile/{userId}?theme=dark&website=true&location=true"
        alt="user:{userId}'s SO profile"
      />
    </a>
  </div>
</div>
<div class="row justify-content-center mt-4">
  <p class="col-11 col-md-6 m-0 fs-5 text-center lh-sm">
    This user is part of the
    <span class="text-primary fw-bold">
      top {topPercentage}
      <span class="fs-6" style="margin-left: -.35em;">%</span>
    </span>
    Stack Overflow answerers in the technology
    <SoTagLink {tag} class="fw-bold fs-" /> with a score of
    <a
      href={SCORE_COMPUTATION_INFOS}
      target="_blank"
      title="How are tag scores calculated?"
      class="badge rounded-2 bg-success p-1 text-dark text-decoration-none"
    >
      {score.toLocaleString()}
    </a>.
  </p>
</div>
