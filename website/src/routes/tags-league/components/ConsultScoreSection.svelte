<script lang="ts">
  import Ranking from "$lib/components/icons/Ranking.svelte";
  import UserIdInput from "$lib/components/UserIdInput.svelte";

  let userId: number;
  export let tag: string;
</script>

<h2 class="fs-4 mt-5">
  <span class="text-primary fs-3">
    <Ranking />
  </span>
  Get your Ranking
</h2>

<div class="row mt-5 justify-content-center">
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
