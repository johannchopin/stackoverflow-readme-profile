<script lang="ts">
  export let date: Date;
</script>

<p
  class="w-fit-content ms-auto border border-primary border-1 p-1 rounded-2 mt-5 
  {$$restProps.class || ''}"
>
  <span class="text-primary">Last update:</span>

  <span class="fw-bold">
    {date.toLocaleString()}
  </span>
</p>
