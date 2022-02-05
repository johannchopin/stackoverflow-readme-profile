<script>
  import { user } from '$lib/stores/user'
  import Profile from './Profile.svelte'

  import { TEMPLATES } from '../../../../src/const'
</script>

<section class="mt-5">
{#each TEMPLATES as template}
  <Profile 
    userId={$user.id}
    {template}
    theme={$user.theme}
  />
{/each}
  
</section>