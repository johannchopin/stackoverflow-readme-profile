<script lang="ts">
  import { ADD_TAG_ISSUE_LINK } from "$lib/constants";
  import Plus from "../icons/Plus.svelte";

  export let tags: string[];
  export let selectedTag: string;

  let filter = "";

  const getTagRandomDelay = (): string => {
    return (Math.random() * (0 - 1.2) + 1.2).toFixed(4);
  };
</script>

<section class:animate={!selectedTag}>
  <div class="input-group m-0 mt-2 row">
    <div class="col-6 col-md-4 ms-auto p-0">
      <input
        type="text"
        class="form-control"
        placeholder="Filter tags by name"
        bind:value={filter}
      />
    </div>
  </div>

  <ul class="d-flex justify-content-center flex-wrap mt-2 list-unstyled">
    {#each tags as tag}
      <li class="my-1" style="animation-delay: {getTagRandomDelay()}s;">
        <a
          href={"?tag=" + encodeURIComponent(tag)}
          class="mx-1 so-tag clickable text-bg-dark text-decoration-none"
          class:selected={tag === selectedTag}
          class:d-none={filter.length > 0 && !tag.includes(filter)}
          >{tag}
        </a>
      </li>
    {/each}
  </ul>

  {#if tags}
    <div class="d-flex justify-content-center">
      <a
        href={ADD_TAG_ISSUE_LINK}
        target="_blank"
        id="addTag"
        class="btn btn-outline-secondary btn-sm m-auto"
      >
        <Plus />
        Add new tag
      </a>
    </div>
  {/if}
</section>

<style lang="scss">
  .animate {
    ul li,
    input,
    #addTag {
      opacity: 0;
      animation: apparition 0.3s forwards;
    }

    input,
    #addTag {
      animation-delay: 1.7s;
    }
  }

  @keyframes apparition {
    from {
      opacity: 0;
      transform: translateY(0.5em);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
