<script lang="ts">
  import Ranking from "../icons/Ranking.svelte";

  export let percentage: number;
</script>

<div
  class="rank position-relative d-flex justify-content-center align-items-center"
>
  <Ranking />
  <div
    class="d-flex flex-column justify-content-center"
    style="padding-top: 0.5em; z-index: 2;"
  >
    <span class="top text-uppercase text-center fw-bold">Top</span>
    <div class="d-flex align-items-center">
      <span id="percentageValue" class="fw-bold">{percentage}</span>
      <span id="percentage">%</span>
    </div>
  </div>
</div>

<style lang="scss">
  .rank :global(svg) {
    position: absolute;
    top: 0;
    left: 0;
    color: var(--bs-success);
    width: 100%;
    height: 100%;
  }

  .top {
    font-size: 0.9em;
  }

  #percentageValue {
    font-size: 2em;
  }

  #percentage {
    font-size: 1.1em;
  }

  span {
    line-height: 1em;
  }
</style>
