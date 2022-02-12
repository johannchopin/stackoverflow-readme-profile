<script lang="ts">
  import { user } from "$lib/stores/user";
  import Profiles from "$lib/components/Profiles.svelte";
  import UserIdForm from "$lib/components/UserIdForm.svelte";
  import ThemesForm from "$lib/components/ThemesForm.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import SocialLinks from "$lib/components/SocialLinks.svelte";

  let userId
  const onSubmit = (): void => {
    $user.id = userId
  }
</script>

<main class="container pt-0 pt-md-5">
  <SocialLinks class="mt-5" />

  <h1 class="mb-0 mt-3 fs-3 fw-bold">stackoverflow-readme-profile</h1>
  <p class="ms-3">
    <span class="fw-bold text-primary me-1">&#x3e;</span>
    Easily share your Stackoverflow's profile on your README
  </p>

  <form class="mt-5" on:submit|preventDefault={onSubmit}>
    <UserIdForm bind:userId />
    <ThemesForm />

    <button
      class="btn btn-outline-primary mt-5"
      type="submit"
    >
      Generate your profiles
    </button>
  </form>


  {#if $user.id}
    <Profiles />
  {/if}
</main>

<Footer />

<style lang="scss">
  @import '../../node_modules/bootstrap/scss/functions';
  @import '../../node_modules/bootstrap/scss/variables';
  @import '../../node_modules/bootstrap/scss/mixins';

  @include media-breakpoint-up(md) {
    h1 {
      font-size: 2.5em!important;
    }
  }
</style>