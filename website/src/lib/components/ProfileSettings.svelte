<script lang="ts">
  import { SELECT_THEME_TITLE_ID } from "$lib/constants";
  import { user } from "$lib/stores/user";
  import type { TemplateSettings } from "$lib/stores/user";
  import PenIcon from "$lib/components/icons/Pen.svelte";

  export let template: string;
  export let settings: TemplateSettings;

  const TADA_ANIMATION_DURATION = 1000;
  const HIGHLIGHT_CLASS = "highlight";
  const themesCtn = document.getElementById(SELECT_THEME_TITLE_ID);

  const onGoToThemeClick = (): void => {
    themesCtn.classList.add(HIGHLIGHT_CLASS);
    setTimeout(() => {
      themesCtn.classList.remove(HIGHLIGHT_CLASS);
    }, TADA_ANIMATION_DURATION);
  };
</script>

<div class="mb-3 d-flex">
  <label for={`${template}-template`} class="w-fit-content w-50">
    <code class="bg-dark rounded p-1">theme</code>
  </label>
  <div class="d-flex">
    <code class="bg-dark text-primary rounded p-1">{$user.theme}</code>
    <a
      href={`#${SELECT_THEME_TITLE_ID}`}
      class="btn btn-outline-secondary border-2 p-0 px-1 ms-1"
      on:click={onGoToThemeClick}
    >
      <span aria-hidden="true"><PenIcon /></span>
      <span class="visually-hidden">Edit the theme</span>
    </a>
  </div>
</div>

{#each Object.keys(settings) as setting}
  {#if settings[setting].type === "boolean"}
    <div class="mt-2 d-flex">
      <label class="form-check-label w-50" for={`${template}-${setting}`}>
        <code class="bg-dark rounded p-1">{setting}</code>
      </label>
      <div class="form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id={`${template}-${setting}`}
          bind:checked={settings[setting].value}
        />
      </div>
    </div>
  {/if}
{/each}
