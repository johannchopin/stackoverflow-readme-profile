<script lang="ts">
  import Ranking from "../icons/Ranking.svelte";
  import Loader from "./Loader.svelte";
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
    class="position-absolute w-100 h-100 d-flex justify-content-center align-items-center ctn"
    class:hide
  >
    <div class="position-relative leaf-icon">
      <Ranking />
      <Loader class="position-absolute start-50 translate-middle" />
    </div>
  </div>
{/if}

<style lang="scss">
  @import "../../../../node_modules/bootstrap/scss/functions";
  @import "../../../../node_modules/bootstrap/scss/variables";
  @import "../../../../node_modules/bootstrap/scss/mixins";

  .ctn {
    background-color: #2d2d2d;
    z-index: 3;
    top: 0;
    left: 0;
    overflow: hidden;
    transition: opacity 1s;
    transition-delay: 0.3s;

    :global(.loader) {
      transition: opacity 0.1s;
      top: 55%;
      width: 10vw;
      height: 10vw;
    }

    &.hide {
      opacity: 0;
      :global(.loader) {
        opacity: 0;
      }

      .leaf-icon {
        transform: scale(44);
      }
    }
  }

  .leaf-icon {
    transition: transform 2s;

    & > :global(svg) {
      width: 40vw;
    }
  }

  @include media-breakpoint-up(md) {
    .ctn {
      .leaf-icon > :global(svg) {
        width: 15vw;
        height: 15vw;
      }

      :global(.loader) {
        width: 5vw;
        height: 5vw;
      }
    }
  }

  /* disable extreme animation if not wanted */
  @media screen and (prefers-reduced-motion: reduce) {
    .hide {
      .leaf-icon {
        transform: none !important;
      }
      :global(.loader) {
        opacity: 1 !important;
      }
    }
  }
</style>
