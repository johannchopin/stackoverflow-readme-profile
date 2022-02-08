<script lang="ts">
  import { API_BASEURL, HTML_CODE_TEMPLATE, MD_CODE_TEMPLATE } from "$lib/constants"
  import { user } from "$lib/stores/user";
  import { getProfileCode } from "$lib/utils";
  import Code from "./Code.svelte"
  import ProfileSettings from "./ProfileSettings.svelte";

  export let theme: string
  export let userId: number
  export let template: string

  let mdCode = getProfileCode(MD_CODE_TEMPLATE, userId, template)
  let htmlCode = getProfileCode(HTML_CODE_TEMPLATE, userId, template)

  $: pathToProfile = `${API_BASEURL}/${template}/${userId}?theme=${theme}`
</script>

<h3 class="fw-bold text-primary bg-dark w-fit-content rounded px-2 p-1">{template}</h3>
<div class="row">
  <img src={pathToProfile} alt={`user ${userId} stackoverflow ${template}`} class="col-12 col-md-3" />

  <div class="col-12 col-md-3 mt-3 mt-md-0">
    <h4>Options:</h4>
    <ProfileSettings {template} bind:settings={$user.templates_settings[template]} />
  </div>

  <div class="codes col-12 col-md-5 mt-3 mt-md-0">
    <h4 class="fst-italic fw-bold fs-6 m-0 p-2 bg-dark rounded w-fit-content">Markdown</h4>
    <Code code={mdCode} />
    <h4 class="fst-italic fw-bold fs-6 m-0 mt-2 p-2 bg-dark rounded w-fit-content">HTML</h4>
    <Code code={htmlCode} />
  </div>
</div>

<style>
  .codes {
    /* Helps to have nice border effect like a folder */
    --translateY-value: 10px;
    transform: translateY(calc(-1 * var(--translateY-value)));
  }

  h4 {
    transform: translateY(var(--translateY-value));
  }

  .codes :global(pre code) {
    font-size: .8rem!important;
  }
</style>