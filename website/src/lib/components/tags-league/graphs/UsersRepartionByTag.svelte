<script lang="ts">
  import { onMount } from "svelte";
  import Highcharts from "highcharts";

  export let percentageAmounts: [number, number][];
  export let scorePercentages: [number, number][];

  const CHART_ID = "userRepartionByTag";
  let isMounted = false;

  const renderChart = (percentageAmounts, scorePercentages) => {
    const scoreForPercentages: number[] = [];
    const topPercentages: number[] = [];

    scorePercentages.forEach(([score, percentage]) => {
      scoreForPercentages.push(score);
      topPercentages.push(percentage);
    });

    Highcharts.chart(CHART_ID, {
      chart: {
        zoomType: "x",
      },
      title: {
        text: "Required scores by top percentage and corresponding users amount",
        align: "left",
      },
      xAxis: [
        {
          categories: topPercentages,
          crosshair: true,
          title: {
            text: "Top %",
          },
          plotLines: [
            {
              color: "#FF0000", // Red
              width: 2,
              value: 25, // Position, you'll have to translate this to the values on your x axis
              label: { text: "User johannchopin", rotation: 0 },
            },
          ],
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
          data: percentageAmounts.map(([percentage, amount]) => amount),
        },
        {
          name: "Score",
          type: "spline",
          data: scoreForPercentages,
        },
      ],
    });
  };

  $: {
    if (isMounted) renderChart(percentageAmounts, scorePercentages);
  }

  onMount(() => {
    isMounted = true;
  });
</script>

<div id={CHART_ID} class="rounded" />
