<script lang="ts">
  import { THEMES } from '../../../../src/const'
  import ThemePreview from './ThemePreview.svelte'

  import { user } from '$lib/stores/user'
</script>

<form class="d-flex flex-wrap mt-3">
  {#each Object.keys(THEMES) as themeName}
    <div class="m-1 cursor-pointer">
      <input
        class="form-check-input"
        type="radio"
        name="theme"
        value={themeName}
        id={`theme-${themeName}`}
        bind:group={$user.theme}
      >
      <label class="form-check-label" for={`theme-${themeName}`}>
        <ThemePreview {themeName} theme={THEMES[themeName]} class="cursor-pointer" />
      </label>
    </div>
  {/each}
</form>
