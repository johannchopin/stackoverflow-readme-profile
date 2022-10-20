<script>
  import Header from "./components/Header.svelte";
  import Presentation from "./components/Presentation.svelte";
</script>

<Header />
<Presentation />

<style lang="scss">
  :global(body) {
    overflow-x: hidden;
  }

  :global(footer.mt-5) {
    margin-top: 0 !important;
  }
</style>
