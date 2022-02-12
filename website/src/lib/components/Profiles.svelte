<script>
  import { user } from '$lib/stores/user'
  import Profile from './Profile.svelte'

  import { TEMPLATES } from '../../../../src/const'
</script>

<section class="mt-6">
  <h2 class="fs-3 mb-5">
    <span class="fw-bold text-primary">3.</span>
    Select your preferred profile and copy the Markdown/HTML into your README:
  </h2>

{#each TEMPLATES as template}
  <Profile
    userId={$user.id}
    {template}
    theme={$user.theme}
  />
  <hr class="rounded my-5">
{/each}
  
</section>

<style>
  hr {
    height: 2px;
  }
</style>
