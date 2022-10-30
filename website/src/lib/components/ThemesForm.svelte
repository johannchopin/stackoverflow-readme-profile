<script lang="ts">
  import { user } from "$lib/stores/user";
  import { SELECT_THEME_TITLE_ID } from "$lib/constants";
  import ThemesSelect from "./ThemesSelect.svelte";
</script>

<section id={SELECT_THEME_TITLE_ID} class="mt-6">
  <h2 class="fs-3">
    <span class="fw-bold text-primary">2.</span>
    Select the theme:
  </h2>

  <ThemesSelect bind:theme={$user.theme} class="d-flex flex-wrap" />
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
