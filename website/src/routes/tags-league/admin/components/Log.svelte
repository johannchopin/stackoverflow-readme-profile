<script lang="ts">
  import { LogType } from "../../../../../../src/db/constants";
  export let log: any;

  let showMessage = false;

  const getLogTypeClass = (): string => {
    switch (log.type) {
      case LogType.ERROR:
        return "bg-danger";

      case LogType.LEAGUE_COMPUTATION_END:
      case LogType.LEAGUE_COMPUTATION_START:
        return "bg-info";

      case LogType.LEAGUE_COMPUTATION_STOP:
        return "bg-warning text-dark";

      default:
        return "bg-success";
    }
  };
</script>

<div class="d-flex align-items-center">
  <span class="badge {getLogTypeClass()} me-2">{log.type}</span>

  {new Date(log.createdAt).toLocaleString()}

  {#if log.message}
    <div>
      <button
        class="ms-2 btn btn-outline-primary btn-sm"
        on:click={() => (showMessage = true)}
      >
        see message
      </button>
    </div>
  {/if}
</div>

{#if showMessage}
  <div class="card card-body bg-dark">
    <p>{log.message}</p>
  </div>
{/if}
