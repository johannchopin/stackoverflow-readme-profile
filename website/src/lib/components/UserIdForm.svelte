<script lang="ts">
  import FindUserIdHelper from "./FindUserIdHelper.svelte";
import QuestionIcon from "./icons/Question.svelte";
  import UserIdInput from "./UserIdInput.svelte";

  export let userId: number;
</script>

<label for="soId" class="form-label d-flex align-items-center w-fit-content">
  <h2 class="m-0 p-0 fs-3">
    <span class="fw-bold text-primary">1.</span>
    Please enter your Stackoverflow identifier or profile URL
  </h2>
  <FindUserIdHelper />
</label>

<UserIdInput bind:userId />

<style lang="scss">
  @import "../../../node_modules/bootstrap/scss/functions";
  @import "../../../node_modules/bootstrap/scss/variables";
  @import "../../../node_modules/bootstrap/scss/mixins";

  @include media-breakpoint-up(md) {
    label :global(.user-id input) {
      width: 50% !important;
    }
  }
</style>
