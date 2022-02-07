<script lang="ts">
  import { THEMES } from '../../../../src/const'
  import ThemePreview from './ThemePreview.svelte'

  import { user } from '$lib/stores/user'
</script>

<h2 class="mt-5 fs-3">
  <span class="fw-bold text-primary">2.</span>
  Select the theme:
</h2>

<form class="d-flex flex-wrap">
  {#each Object.keys(THEMES) as themeName}
    <div class="d-flex align-items-center m-2 cursor-pointer">
      <input
        class="form-check-input"
        type="radio"
        name="theme"
        value={themeName}
        id={`theme-${themeName}`}
        bind:group={$user.theme}
      >
      <label class="form-check-label ms-1" for={`theme-${themeName}`}>
        <ThemePreview {themeName} theme={THEMES[themeName]} class="cursor-pointer" />
      </label>
    </div>
  {/each}
</form>
