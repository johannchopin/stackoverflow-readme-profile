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
