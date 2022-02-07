<script lang="ts">
  import { setClipboard } from '$lib/utils'

  import CopyButton from './CopyButton.svelte'

  export let code: string
</script>

<div class="position-relative">
  <pre class="rounded bg-dark p-3"><code>{code}</code></pre>
  <CopyButton class="position-absolute top-0 end-0 m-2" onSave={() => { setClipboard(code) }} />
</div>
