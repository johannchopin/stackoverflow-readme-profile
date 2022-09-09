<script lang="ts">
  import { onMount } from "svelte";
  import Highcharts from "highcharts";

  export let percentageAmounts: [number, number][];
  export let scorePercentages: [number, number][];
  export let userTopPercentage: number = 11;

  const CHART_ID = "userRepartionByTag";
  let isMounted = false;

  const getUserTopPercentagePlotLine = (
    topPercentages: number[],
    topPercentage: number
  ) => {
    const positionInGraph = topPercentages.indexOf(topPercentage);
    const labelLeftToBar = positionInGraph > topPercentages.length * 0.75;
    return {
      color: "#F48024",
      width: 3,
      value: positionInGraph,
      label: {
        text: "user rank",
        rotation: 0,
        textAlign: labelLeftToBar && "right",
        x: labelLeftToBar ? -2 : 2,
        style: {
          fontWeight: "bold",
        },
      },
    };
  };

  const renderChart = (
    percentageAmounts,
    scorePercentages,
    userTopPercentage
  ) => {
    const scoreForPercentages: number[] = [];
    const topPercentages: number[] = [];

    scorePercentages.forEach(([score, percentage]) => {
      scoreForPercentages.push(score);
      topPercentages.push(percentage);
    });

    const plotLines = userTopPercentage
      ? [getUserTopPercentagePlotLine(topPercentages, userTopPercentage)]
      : undefined;

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
          plotLines,
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
    if (isMounted)
      renderChart(percentageAmounts, scorePercentages, userTopPercentage);
  }

  onMount(() => {
    isMounted = true;
  });
</script>

<div id={CHART_ID} class="rounded" />
