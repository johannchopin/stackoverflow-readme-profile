<script lang="ts">
  import Ranking from "../icons/Ranking.svelte";
  export let hide = false;

  let show = true;

  $: {
    if (hide) {
      // remove component from DOM
      setTimeout(() => {
        show = false;
      }, 1100);
    }
  }
</script>

{#if show}
  <div
    class="position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
    class:hide
  >
    <Ranking />
  </div>
{/if}

<style lang="scss">
  @import "../../../../node_modules/bootstrap/scss/functions";
  @import "../../../../node_modules/bootstrap/scss/variables";
  @import "../../../../node_modules/bootstrap/scss/mixins";

  div {
    background-color: #2d2d2d;
    z-index: 3;
    top: 0;
    left: 0;
    overflow: hidden;
    transition: opacity 1s;
    transition-delay: 0.3s;

    &.hide {
      opacity: 0;

      :global(svg) {
        transform: scale(44);
      }
    }
  }

  div :global(svg) {
    width: 40vw;
    transition: transform 2s;
  }

  @include media-breakpoint-up(md) {
    div :global(svg) {
      width: 15vw;
    }
  }
</style>
