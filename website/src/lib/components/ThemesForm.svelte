<script lang="ts">
  import { THEMES } from '../../../../src/const'
  import ThemePreview from './ThemePreview.svelte'

  import { user } from '$lib/stores/user'
  import { SELECT_THEME_TITLE_ID } from '$lib/constants';
</script>

<section id={SELECT_THEME_TITLE_ID} class="mt-5">
  <h2 class="fs-3">
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
</section>

<style>
  @keyframes tada {
    from {
      transform: scale3d(1, 1, 1);
    }

    10%,
    20% {
      transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
    }

    30%,
    50%,
    70%,
    90% {
      transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    }

    40%,
    60%,
    80% {
      transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    }

    to {
      transform: scale3d(1, 1, 1);
    }
  }

  section:global(.highlight) {
    animation: tada 1s;
  }
</style>