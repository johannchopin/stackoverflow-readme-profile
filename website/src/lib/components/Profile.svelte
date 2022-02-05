<script lang="ts">
  import { API_BASEURL } from "$lib/constants"

  export let theme: string
  export let userId: number
  export let template: string

  $: pathToProfile = `${API_BASEURL}/${template}/${userId}?theme=${theme}`
</script>

<h2 class="mt-5 fw-bold text-primary bg-dark w-fit-content rounded px-2 p-1">{template}</h2>
<img src={pathToProfile} alt={`user ${userId} stackoverflow ${template}`} />
