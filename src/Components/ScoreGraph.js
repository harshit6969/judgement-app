import * as React from "react";
import {
  Grid,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import {
  Chart,
  LineSeries,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";

export default class ScoreGraphWithLeaderboard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.scores || [], // Initialize state from props
      chartData: [],
    };
  }

  componentDidMount() {
    this.prepareChartData(); // Prepare initial chart data
  }

  componentDidUpdate(prevProps) {
    // Update chart data when scores change
    if (prevProps.scores !== this.props.scores) {
      this.setState({ data: this.props.scores }, () => {
        this.prepareChartData();
      });
    }
  }

  // Prepare chart data by accumulating scores for each round
  prepareChartData() {
    const { data } = this.state;

    if (!data || data.length === 0) {
      this.setState({ chartData: [] });
      return;
    }

    // Find the maximum number of rounds among players
    const rounds = Math.max(
      ...data.map((player) => player.Scores?.length || 0)
    );

    let chartData = [];

    // Start with round 0 where every player's score is 0
    let initialRound = { round: 0 };
    data.forEach((player) => {
      initialRound[player.Name] = 0; // Every player starts with 0 score in round 0
    });
    chartData.push(initialRound); // Add the initial round data to the chart

    // Loop through each round, starting from 1
    for (let i = 0; i < rounds; i++) {
      let roundData = { round: i + 1 }; // `round` will be the argument field for x-axis

      // Loop through each player
      data.forEach((player) => {
        let cumulativeScore = 0;

        // If the player has scores and the score for the current round exists, calculate the cumulative score
        if (player.Scores && player.Scores.length > 0) {
          cumulativeScore = player.Scores.slice(0, i + 1).reduce(
            (acc, score) =>
              acc + (score !== undefined && score !== null ? score : 0),
            0
          );
        }

        // Set the cumulative score for this player in the current round
        roundData[player.Name] = cumulativeScore;
      });

      chartData.push(roundData); // Add the round data to the chart data
    }

    this.setState({ chartData });
  }

  render() {
    const { chartData, data } = this.state;
    const leaderboard = this.props.scores || [];

    return (
      <Grid container spacing={2}>
        {/* Graph Section */}
        <Grid item xs={12} sm={9}>
          <div style={{ width: "100%", height: "100%" }}>
            {chartData.length > 0 && data.length > 0 && (
              <Chart data={chartData} style={{ height: "100%" }}>
                <ArgumentAxis />
                <ValueAxis position="right"/>
                {/* Render a line for each player */}
                {data.map((player) => (
                  <LineSeries
                    key={player.Name}
                    valueField={player.Name} // player.Name as value field
                    argumentField="round" // round as argument field
                    name={player.Name} // Optional: add name for series legend
                    color={player.ColorCode} // Use player's color for their line
                  />
                ))}
              </Chart>
            )}
          </div>
        </Grid>

        {/* Leaderboard Section */}
        <Grid
          container
          item
          xs={12}
          sm={3}
          direction="column"
          justifyContent="space-evenly"
          style={{ listStyleType: "none" }}
        >
          {leaderboard.map((Player) => (
            <ListItem key={Player.Name}>
              <ListItemAvatar>
                <Avatar src={Player.Profile} />
              </ListItemAvatar>
              <ListItemText primary={Player.Name} />
              <ListItemSecondaryAction>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: Player.ColorCode }}>
                    {Player.TotalScore}
                  </Avatar>
                </ListItemAvatar>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </Grid>
      </Grid>
    );
  }
}
