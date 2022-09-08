<script lang="ts">
  import { onMount } from "svelte";
  import Highcharts from "highcharts";

  export let scoreAmounts: number[][];
  export let scorePercentages: [number, number][];

  const CHART_ID = "userRepartionByTag";
  let isMounted = false;

  const renderChart = (scoreAmounts) => {
    Highcharts.chart(CHART_ID, {
      chart: {
        zoomType: "xy",
      },
      title: {
        text: "Scores repartion with according's users amount",
        align: "left",
      },
      xAxis: [
        {
          categories: scoreAmounts.map(([score]) => score),
          crosshair: true,
        },
      ],
      yAxis: [
        {
          // Primary yAxis
          labels: {
            style: {
              color: Highcharts.getOptions().colors[1],
            },
          },
          title: {
            text: "Score",
            style: {
              color: Highcharts.getOptions().colors[1],
            },
          },
        },
        {
          // Secondary yAxis
          title: {
            text: "Amount of users",
            style: {
              color: Highcharts.getOptions().colors[0],
            },
          },
          labels: {
            style: {
              color: Highcharts.getOptions().colors[0],
            },
          },
          opposite: true,
        },
      ],
      tooltip: {
        shared: true,
      },
      legend: {
        align: "left",
        x: 80,
        verticalAlign: "top",
        y: 80,
        floating: true,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor ||
          "rgba(255,255,255,0.25)",
      },
      series: [
        {
          name: "Amount of users",
          type: "column",
          yAxis: 1,
          data: scoreAmounts.map(([score, amount]) => amount),
        },
        {
          name: "Score",
          type: "spline",
          data: scoreAmounts.map(([score, amount]) => score),
        },
      ],
    });
  };

  $: {
    if (isMounted) renderChart(scoreAmounts);
  }

  onMount(() => {
    isMounted = true;
  });
</script>

<div id={CHART_ID} class="rounded" />
