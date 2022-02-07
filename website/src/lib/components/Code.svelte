<script lang="ts">
  import { setClipboard } from '$lib/utils'

  import CopyButton from './CopyButton.svelte'

  export let code: string
</script>

<div class="position-relative">
  <pre class="rounded bg-dark m-0 p-3"><code>{code}</code></pre>
  <CopyButton class="position-absolute top-0 end-0 m-2" onSave={() => { setClipboard(code) }} />
</div>

<style>
  div:not(:hover) :global(button:not(:focus):not(:focus-within)) {
    opacity: 0;
  }
</style>