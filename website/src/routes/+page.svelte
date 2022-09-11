<script lang="ts">
  import { user } from "$lib/stores/user";
  import Profiles from "$lib/components/Profiles.svelte";
  import UserIdForm from "$lib/components/UserIdForm.svelte";
  import ThemesForm from "$lib/components/ThemesForm.svelte";

  let userId;
  const onSubmit = (): void => {
    $user.id = userId;
  };
</script>

<h1 class="mb-0 mt-3 fs-3 fw-bold">stackoverflow-readme-profile</h1>
<p class="ms-3">
  <span class="fw-bold text-primary me-1">&#x3e;</span>
  Easily share your Stackoverflow's profile on your README
</p>

<form class="mt-6" on:submit|preventDefault={onSubmit}>
  <UserIdForm bind:userId />
  <ThemesForm />

  <button class="btn btn-outline-primary mt-6" type="submit">
    Generate your profiles
  </button>
</form>

{#if $user.id}
  <Profiles />
{/if}
