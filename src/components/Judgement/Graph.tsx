import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Grid } from "@mui/material";
import useGameStore from "../../store/gameStore";
import { Player } from "../../utils/types";

const buildChartData = (players: Player[], currentRound: number) => {
  const xAxisData = Array.from({ length: currentRound + 1 }, (_, i) => i);

  const series = players.map((player) => {
    // Initialize with starting score of 0
    const cumulativeScores = [0];
    let runningTotal = 0;

    // Build cumulative scores for completed rounds
    if (player.Scores) {
      player.Scores.forEach((score) => {
        runningTotal += score;
        cumulativeScores.push(runningTotal);
      });
    }

    return {
      data: cumulativeScores,
      label: player.Name,
      color: player.ColorCode,
    };
  });

  return { xAxisData, series };
};
export default function Graph() {
  const players = useGameStore.use.players();
  const currentRound = useGameStore.use.currentRound();

  // Generate x-axis labels based on rounds played
  const { xAxisData, series } = React.useMemo(
    () => buildChartData(players, currentRound - 1),
    [currentRound]
  );

  return (
    <Grid size={8}>
      <LineChart
        xAxis={[
          {
            data: xAxisData,
            scaleType: "point",
          },
        ]}
        yAxis={[{ min: 0, position: "right" }]}
        series={series}
        height={620}
        margin={{ left: 5, right: 5, top: 60 }}
        grid={{ vertical: true, horizontal: true }}
        slotProps={{
          legend: {
            position: { vertical: "bottom", horizontal: "center" },
            direction: "horizontal",
          },
        }}
      />
    </Grid>
  );
}
