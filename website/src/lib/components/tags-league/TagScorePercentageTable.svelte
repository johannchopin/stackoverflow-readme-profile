<script lang="ts">
  export let scorePercentages: [number, number][];
</script>

<table class="table table-dark table-sm table-bordered w-fit-content rounded-2">
  <thead>
    <tr>
      <th>Top Percentage</th>
      <th>Required Score</th>
    </tr>
  </thead>
  <tbody>
    {#each scorePercentages as scorePercentages}
      <tr>
        <td>{scorePercentages[1]}%</td>
        <td>{scorePercentages[0]}</td>
      </tr>
    {/each}
  </tbody>
</table>
