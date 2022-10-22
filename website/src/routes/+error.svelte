<script context="module">
  import { page } from "$app/stores";
</script>

<script>
  import { dev } from "$app/environment";
  import Error from "$lib/components/Error.svelte";
</script>

<svelte:head>
  <title>{$page.status}</title>
</svelte:head>

<div class="col-md-9">
  <Error title={$page.status}>
    <p>{$page.error.message}</p>

    {#if dev && $page.error.stack}
      <pre>{$page.error.stack}</pre>
    {/if}
  </Error>
</div>
