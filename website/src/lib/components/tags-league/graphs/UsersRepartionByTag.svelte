<script lang="ts">
  import { onMount } from "svelte";
  import Highcharts from "highcharts";

  export let scoreAmounts: number[][];
  export let scorePercentages: [number, number][];

  const CHART_ID = "userRepartionByTag";
  let isMounted = false;

  const renderChart = (scoreAmounts, scorePercentages) => {
    const percentages: number[] = [];
    const minScores: number[] = [];
    const userAmounts: number[] = [];

    scorePercentages.forEach(([score, percentage]) => {
      minScores.push(score);
      percentages.push(percentage);
    });

    let scoreAmountsIndex = 0;
    minScores.forEach((minScore, index) => {
      while (scoreAmounts[scoreAmountsIndex][0] >= minScore) {
        if (userAmounts[index] === undefined) userAmounts[index] = 0;
        userAmounts[index] += scoreAmounts[scoreAmountsIndex][1];
        scoreAmountsIndex += 1;
      }
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
          categories: percentages,
          crosshair: true,
          title: {
            text: "Top %",
          },
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
          data: userAmounts,
        },
        {
          name: "Score",
          type: "spline",
          data: minScores,
        },
      ],
    });
  };

  $: {
    if (isMounted) renderChart(scoreAmounts, scorePercentages);
  }

  onMount(() => {
    isMounted = true;
  });
</script>

<div id={CHART_ID} class="rounded" />
