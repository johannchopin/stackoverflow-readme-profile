<script lang="ts">
  export let tags: string[] = [];
  export let computedTags: string[] = [];
</script>

<ul class="d-flex justify-content-center flex-wrap mt-2 list-unstyled">
  {#each tags as tag}
    <li class="my-1">
      <span
        class="mx-1 so-tag text-bg-dark"
        class:computed={computedTags.includes(tag)}
        >{tag}
      </span>
    </li>
  {/each}
</ul>

<style lang="scss">
  span:not(.computed):not(:hover) {
    opacity: 0.4;
  }
</style>
