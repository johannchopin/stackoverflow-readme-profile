<script lang="ts">
  export let scorePercentages: [number, number][];
</script>

<div class="tableFixHead w-fit-content m-auto rounded">
  <table
    class="table table-dark table-sm table-bordered w-fit-content rounded-2"
  >
    <thead>
      <tr>
        <th class="p-2">Top Percentage</th>
        <th class="p-2">Required Score</th>
      </tr>
    </thead>
    <tbody>
      {#each scorePercentages as scorePercentages}
        <tr>
          <td>{scorePercentages[1]}%</td>
          <td>&#x2265; {scorePercentages[0]}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .tableFixHead {
    overflow-y: auto;
    height: 300px;
  }
  .tableFixHead thead {
    position: sticky;
    top: -1px;
  }
</style>
