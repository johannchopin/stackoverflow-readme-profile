<script>
  import StackOverflow from "../icons/StackOverflow.svelte";
</script>

<div class="loader {$$restProps.class}">
  <StackOverflow />
</div>

<style lang="scss">
  .loader {
    :global(svg) {
      width: 100%;
      height: 100%;
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

  @media screen and (prefers-reduced-motion: reduce) {
    .loader :global(svg #stacks path) {
      animation: none !important;
    }
  }
</style>
