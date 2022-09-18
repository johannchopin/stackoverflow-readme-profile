<script lang="ts">
  import { ADD_TAG_ISSUE_LINK } from "$lib/constants";

  import Error from "../Error.svelte";
  export let tag: string;
</script>

<Error title="Unknown tag name">
  <p class="w-fit-content fs-5">
    The provided tag <span class="so-tag">{tag}</span> is not currently part of the
    Tags League.
  </p>
  <p class="fs-6 m-0 text-center">
    Feel free to add it by starting a
    <a href={ADD_TAG_ISSUE_LINK} target="_blank" class="text-success"
      >new tag request</a
    >.
  </p>

  <div class="d-flex justify-content-center mt-5">
    <a href="/tags-league" class="btn btn-outline-primary">
      Back to the tags-league
    </a>
  </div>
</Error>
