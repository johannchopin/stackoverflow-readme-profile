<script>
  import { onMount } from "svelte";
  import Footer from "$lib/components/Footer.svelte";
  import "../global.scss";
  import Navbar from "$lib/components/Navbar.svelte";

  onMount(async () => {
    await import("../../node_modules/bootstrap/dist/js/bootstrap");
  });
</script>

<main class="container pt-0 pt-md-5">
  <Navbar />
  <slot />
</main>

<Footer />

<style lang="scss">
  @import "../../node_modules/bootstrap/scss/functions";
  @import "../../node_modules/bootstrap/scss/variables";
  @import "../../node_modules/bootstrap/scss/mixins";

  main {
    min-height: 100vh;
  }

  @include media-breakpoint-up(md) {
    :global(h1) {
      font-size: 2.5em !important;
    }
  }
</style>
