<script lang="ts">
  import { THEMES } from "../../../../src/const";
  import ThemePreview from "./ThemePreview.svelte";

  export let theme: string;
</script>

<div class={$$restProps.class}>
  {#each Object.keys(THEMES) as themeName}
    <div class="d-flex align-items-center m-2 cursor-pointer">
      <input
        class="form-check-input"
        type="radio"
        name="theme"
        value={themeName}
        id={`theme-${themeName}`}
        bind:group={theme}
      />
      <label class="form-check-label ms-1" for={`theme-${themeName}`}>
        <ThemePreview
          {themeName}
          theme={THEMES[themeName]}
          class="cursor-pointer"
        />
      </label>
    </div>
  {/each}
</div>
