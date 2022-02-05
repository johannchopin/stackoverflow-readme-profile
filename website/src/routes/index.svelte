<script>
  import { user } from "$lib/stores/user";
  import Profiles from "$lib/components/Profiles.svelte";
  import UserIdForm from "$lib/components/UserIdForm.svelte";
  import ThemesForm from "$lib/components/ThemesForm.svelte";
</script>

<main class="container">
  <h1 class="mb-0 mt-5">stackoverflow-readme-profile</h1>
  <p class="ms-3">
    <span class="fw-bold text-primary me-1">&#x3e;</span>
    Easily share your Stackoverflow's profile on your README
  </p>

  <UserIdForm />
  <ThemesForm />

  {#if $user.id}
     <Profiles />
  {/if}
</main>

<style lang="scss">
  h1 {
    font-size: 2.5em;
  }
</style>