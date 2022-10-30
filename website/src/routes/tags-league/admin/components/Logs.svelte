<script lang="ts">
  import { API_BASEURL } from "$lib/constants";
  import { onMount } from "svelte";
  import Log from "./Log.svelte";

  export let apiToken: string;
  let logs: any[] = null;

  const getHeaders = () => {
    return new Headers({
      authorization: apiToken,
      "Content-Type": "application/json",
    });
  };

  const getLogs = async () => {
    const res = await fetch(`${API_BASEURL}/tags-league/logs`, {
      headers: getHeaders(),
    });

    if (res.status === 403) {
      alert("invalid admin access");
      return;
    }

    logs = await res.json();
  };

  onMount(() => {
    getLogs();
  });
</script>

{#if logs}
  <ul class="list-group">
    {#each logs as log}
      <li class="list-group-item bg-dark text-white">
        <Log {log} />
      </li>
    {/each}
  </ul>
{:else}
  ...loading
{/if}
