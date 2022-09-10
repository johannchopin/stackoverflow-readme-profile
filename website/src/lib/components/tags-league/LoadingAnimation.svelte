<script lang="ts">
  import Ranking from "../icons/Ranking.svelte";
  import StackOverflow from "../icons/StackOverflow.svelte";
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

      <div class="so position-absolute start-50 translate-middle">
        <StackOverflow />
      </div>
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

    .so {
      transition: opacity 0.1s;
    }

    &.hide {
      opacity: 0;
      .so {
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

  .so {
    top: 55%;

    :global(svg) {
      width: 10vw;
      height: 10vw;
    }

    :global(svg #stacks path) {
      fill: var(--bs-primary);
      animation: apparition 0.5s infinite;
    }

    :global(svg #stacks path:nth-of-type(1)) {
      animation-delay: 0.5s;
    }
    :global(svg #stacks path:nth-of-type(2)) {
      animation-delay: 0.4s;
    }
    :global(svg #stacks path:nth-of-type(3)) {
      animation-delay: 0.3s;
    }
    :global(svg #stacks path:nth-of-type(4)) {
      animation-delay: 0.2s;
    }

    :global(svg #stacks path:nth-of-type(5)) {
      animation-delay: 0.1s;
    }
  }

  @keyframes apparition {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @include media-breakpoint-up(md) {
    .leaf-icon > :global(svg) {
      width: 15vw;
      height: 15vw;
    }

    .so {
      :global(svg) {
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
      .so {
        opacity: 1 !important;
      }
    }

    .so :global(svg #stacks path) {
      animation: none !important;
    }
  }
</style>
