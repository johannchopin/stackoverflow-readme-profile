<script lang="ts">
  import { API_BASEURL } from "$lib/constants";
  import { onMount } from "svelte";

  let usersActivity: {
    total: number;
    month: number;
    week: number;
    day: number;
  };

  let usersAmountByTag: [string, number][];

  const fetchUsersAmount = async (): Promise<void> => {
    try {
      const res = await (await fetch(`${API_BASEURL}/analytics`)).json();
      usersActivity = {
        total: res.users.amount,
        ...res.users.activity,
      };
    } catch (error) {
      //
    }
  };

  const fetchTagsLeagueUsers = async (): Promise<void> => {
    try {
      const res = await (
        await fetch(`${API_BASEURL}/analytics/tags-league`)
      ).json();

      usersAmountByTag = (Object.entries(res) as [string, number][]).sort(
        (a, b) => b[1] - a[1]
      );
    } catch (error) {
      //
    }
  };

  onMount(() => {
    fetchUsersAmount();
    fetchTagsLeagueUsers();
  });
</script>

<h1 class="mb-0 mt-3 fs-3 fw-bold">Analytics</h1>

<h2 class="mt-5">Unique Users activity</h2>

<table class="table table-dark table-striped table-hover">
  <thead>
    <tr>
      <th>Today</th>
      <th>Last Week</th>
      <th>Last Month</th>
      <th>Total</th>
    </tr>
  </thead>
  {#if usersActivity}
    <tbody>
      <tr>
        <td>{usersActivity.day}</td>
        <td>{usersActivity.week}</td>
        <td>{usersActivity.month}</td>
        <td>{usersActivity.total}</td>
      </tr>
    </tbody>
  {/if}
</table>

<h2 class="mt-5">Tags League last week users By Tag</h2>

<div class="table-responsive">
  <table
    class="table table-dark table-striped table-striped-columns table-hover"
  >
    {#if usersAmountByTag}
      <thead>
        <tr>
          {#each usersAmountByTag as data}
            <th class="text-nowrap px-3">{decodeURIComponent(data[0])}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        <tr>
          {#each usersAmountByTag as data}
            <th>{data[1]}</th>
          {/each}
        </tr>
      </tbody>
    {/if}
  </table>
</div>
