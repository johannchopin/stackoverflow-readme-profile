<script lang="ts">
  export let title: string = undefined;
</script>

<div class="mt-5 d-flex flex-column align-items-center {$$restProps.class}">
  <div class="border-start border-danger border-5">
    <h1
      class="text-uppercase fw-light w-fit-content m-0 ms-1 text-danger fw-bolder"
    >
      Oops!
    </h1>
    {#if title}
      <!-- content here -->
      <h2 class="fs-3 rounded p-1 ms-2 mb-0">{title}</h2>
    {/if}
  </div>

  <div class="mt-4 content">
    <slot />
  </div>
</div>

<style>
  h1 {
    font-size: 5rem !important;
    line-height: 4rem;
  }
  h2 {
    background-color: #2d2d2d;
  }
</style>
