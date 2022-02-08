<script lang="ts">
  import { SELECT_THEME_TITLE_ID } from "$lib/constants";
  import { TemplateSettings, user } from "$lib/stores/user";
  import PenIcon from '$lib/components/icons/Pen.svelte'

  export let template: string
  export let settings: TemplateSettings
</script>

<div class="mb-3 row">
  <label for={`${template}-template`} class="col-4 col-form-label w-fit-content">
    <code class="bg-dark rounded p-1">theme</code>
  </label>
  <div class="col-8 d-flex">
    <input
      type="text"
      readonly
      class="form-control p-1"
      id={`${template}-template`}
      value={$user.theme}
    >
    <a href={`#${SELECT_THEME_TITLE_ID}`} class="btn btn-outline-secondary border-2 p-1 px-2 ms-1">
      <span aria-hidden="true"><PenIcon /></span>
      <span class="visually-hidden">Edit the theme</span>
    </a>
  </div>
</div>

{#each Object.keys(settings) as setting}
  {#if settings[setting].type === 'boolean'}
    <div class="d-flex mt-2">
      <label class="form-check-label" for={`${template}-${setting}`}>
        <code class="bg-dark rounded p-1">{setting}</code>
      </label>
      <div class="form-switch ms-4">
        <input class="form-check-input" type="checkbox" role="switch" id={`${template}-${setting}`} bind:checked={settings[setting].value}>
      </div>
    </div>
  {/if}
{/each}
