<script lang="ts">
  export let scorePercentages: [number, number][];
</script>

<div class="tableFixHead w-fit-content">
  <table
    class="table table-dark table-sm table-bordered w-fit-content rounded-2"
  >
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
</div>

<style>
  .tableFixHead {
    overflow-y: auto;
    height: 300px;
  }
  .tableFixHead thead th {
    position: sticky;
    top: 0;
  }
</style>
