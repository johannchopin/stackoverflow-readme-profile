<script lang="ts">
  import { API_BASEURL, HTML_CODE_TEMPLATE, MD_CODE_TEMPLATE } from "$lib/constants"
  import { getProfileCode } from "$lib/utils";
  import Code from "./Code.svelte"

  export let theme: string
  export let userId: number
  export let template: string

  let mdCode = getProfileCode(MD_CODE_TEMPLATE, userId, template)
  let htmlCode = getProfileCode(HTML_CODE_TEMPLATE, userId, template)

  $: pathToProfile = `${API_BASEURL}/${template}/${userId}?theme=${theme}`
</script>

<h3 class="mt-5 fw-bold text-primary bg-dark w-fit-content rounded px-2 p-1">{template}</h3>
<div class="row">
  <img src={pathToProfile} alt={`user ${userId} stackoverflow ${template}`} class="col-12 col-md-3" />
  <div class="col-12 col-md-9">
    <Code code={mdCode} />
    <Code code={htmlCode} />
  </div>
</div>
