<script lang="ts">
  import FindUserIdHelper from "$lib/components/FindUserIdHelper.svelte";
  import Ranking from "$lib/components/icons/Ranking.svelte";
  import SoTagLink from "$lib/components/tags-league/SoTagLink.svelte";
  import UserIdInput from "$lib/components/UserIdInput.svelte";

  let userId: number;
  export let tag: string;
</script>

<h2 class="fs-4 mt-5 lh-sm">
  <span class="text-primary fs-3">
    <Ranking />
  </span>
  See your ranking for the technology
  <SoTagLink class="fs-5" {tag} />
  among all Stackoverflow users
</h2>

<div class="d-flex mt-4 align-items-center">
  <h3 class="m-0 p-0 fs-6">
    <span class="text-primary ms-1 ms-md-3 me-1 fw-bold">></span>
    Please enter your Stackoverflow identifier or profile URL
  </h3>
  <FindUserIdHelper />
</div>

<div class="row mt-2 justify-content-center">
  <div class="col-11 col-md-5 p-0">
    <UserIdInput bind:userId />
  </div>
  <div
    class="col-12  col-md-3 col-xl-2 p-0 d-flex mt-3 mt-md-0 justify-content-center"
  >
    <a
      href="/tags-league/{encodeURIComponent(tag)}/users/{userId}"
      class="btn btn-primary"
      class:disabled={userId === undefined}>To ranking page</a
    >
  </div>
</div>
