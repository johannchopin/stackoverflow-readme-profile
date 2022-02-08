<script>
  import Check from './icons/Check.svelte'
  import Clipboard from './icons/Clipboard.svelte'

  export let onSave

  const VALIDATION_ANIMATION_DURATION = 700
  const TITLE = "Copy to clipboard"
  
  let isSaved = false

  const save = () => {
    isSaved = true
    setTimeout(() => {
      isSaved = false
    }, VALIDATION_ANIMATION_DURATION)
    onSave()
  }
</script>


<button
  class={`btn btn-success border- border-2 p-0 px-1 m-1 ${$$restProps.class}`}
  title={TITLE}
  aria-label={TITLE}
  on:click={save}
>
  {#if isSaved}
    <Check />
  {:else}
    <Clipboard />
  {/if}
</button>