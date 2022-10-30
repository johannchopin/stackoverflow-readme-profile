<script lang="ts">
  let className = "";

  export { className as class };
  export let tag: string;
</script>

<a
  href="https://stackoverflow.com/tags/{tag}/topusers"
  target="_blank"
  class="so-tag w-fit-content clickable {className}">{tag}</a
>
