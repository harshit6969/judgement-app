import React from "react";
import {
  Grid,
  Typography,
  Container,
  AppBar,
  Toolbar,
  Avatar,
  FormControl,
} from "@material-ui/core";
import {
  ListItemAvatar,
  Switch,
  Badge,
  Select,
  Input,
  MenuItem,
} from "@material-ui/core";
import HorizontalLabelPositionBelowStepper from "../Components/StepperForm";
import { setValue, getValue } from "../data-access-layer/storage-helper";
import { withRouter } from "react-router-dom";
import ScoreGraph from "../Components/ScoreGraph";

class App extends React.Component {
  constructor(props) {
    super(props);
    let URLPath = this.props.location.pathname.split("/");
    this.state = {
      GameId: URLPath[URLPath.length - 1],
      RoundInProgress: false,
      openPlayerHandler: false,
      Players: [],
      currentRounds: 0,
      leaderboard: [],
      seconds: 0,
    };
    this.updateScorecard = this.updateScorecard.bind(this);
  }
  tick() {
    this.setState((state) => ({
      seconds: state.seconds + 1,
    }));
  }
  componentDidMount() {
    try {
      this.interval = setInterval(() => this.tick(), 1000);
      let Config = getValue(this.state.GameId);
      if (Config) {
        Object.keys(Config).map((key) => this.setState({ [key]: Config[key] }));
      }
    } catch (error) {
      this.props.history.push("/");
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  updateScorecard(data) {
    let { Players, RoundInProgress, currentRounds, seconds, GameId } =
      this.state;
    let updatedPlayers = [...Players]; // Avoid directly mutating state
    let updatedState = {};

    try {
      if (RoundInProgress) {
        // Process player scores and update them
        updatedPlayers.forEach((Player) => {
          Player.CurrentRoundScore = data[Player.ID]
            ? Player.CurrentRoundScore + 10
            : 0;
          Player.Scores.push(Player.CurrentRoundScore);
          Player.TotalScore += Player.CurrentRoundScore;
          Player.CurrentRoundScore = 0;
        });

        // Sort leaderboard by total score
        let Leaderboard = updatedPlayers.sort(
          (Player1, Player2) => Player2.TotalScore - Player1.TotalScore
        );

        updatedState = {
          Players: updatedPlayers,
          currentRounds: currentRounds + 1,
          RoundInProgress: false,
          openPlayerHandler: false,
          leaderboard: Leaderboard,
          seconds,
        };
      } else {
        // Setup for the new round
        let TotalRoundScore = 0;
        updatedPlayers.forEach((Player) => {
          Player.CurrentRoundScore = data[Player.ID];
          TotalRoundScore += data[Player.ID];
        });

        updatedState = {
          Players: updatedPlayers,
          RoundInProgress: true,
          openPlayerHandler: false,
          TotalRoundScore: TotalRoundScore,
        };
      }
    } finally {
      // Always update state and local storage
      this.setState(updatedState);
      setValue(GameId, { ...this.state, ...updatedState });
    }
  }

  render() {
    return (
      <Grid container direction="row" alignItems="center">
        <AppBar position="static">
          <Toolbar>
            <Container>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Typography variant="h5">Judgement</Typography>
                <Typography variant="h6">
                  {this.state.seconds.toString().toHHMMSS()}
                </Typography>
              </Grid>
            </Container>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2} alignItems="center">
          <Grid
            item
            container
            xs={12}
            sm={8}
            justifyContent="space-evenly"
            style={{ paddingTop: "2%" }}
          >
            {/* <ListItem> */}
            {this.state.Players.map((Player) => (
              <ListItemAvatar key={Player.ID}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={
                    <Avatar
                      style={{
                        height: "22px",
                        width: "22px",
                        backgroundColor: Player.ColorCode,
                      }}
                    >
                      {Player.CurrentRoundScore}
                    </Avatar>
                  }
                >
                  <Avatar
                    alt={Player.Name}
                    src={Player.Profile}
                    style={{ height: "40px", width: "40px" }}
                  />
                </Badge>
              </ListItemAvatar>
            ))}
            {/* </ListItem> */}
          </Grid>

          <Grid item xs={6} sm={2}>
            <FormControl fullWidth>
              <Select
                value={this.state.trump_color || ""}
                onChange={(e) => this.setState({ trump_color: e.target.value })}
                input={<Input />}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Trump
                </MenuItem>
                <MenuItem value="black" style={{ color: "black" }}>
                  हुकुम
                </MenuItem>
                <MenuItem value="red" style={{ color: "red" }}>
                  पान
                </MenuItem>
                <MenuItem value="black_chidi" style={{ color: "black" }}>
                  चिडी
                </MenuItem>
                <MenuItem value="red_eint" style={{ color: "red" }}>
                  ईंट
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={2}>
            <Typography component="div">
              <Grid container alignItems="center" spacing={1}>
                <Grid item>End</Grid>
                <Grid item>
                  <Switch
                    checked={this.state.RoundInProgress}
                    onChange={() => this.setState({ openPlayerHandler: true })}
                    value="Start"
                  />
                </Grid>
                <Grid item>Start</Grid>
              </Grid>
            </Typography>
          </Grid>
        </Grid>
        <ScoreGraph scores={this.state.leaderboard} />
        {this.state.openPlayerHandler ? (
          <HorizontalLabelPositionBelowStepper
            handleScoreUpload={this.updateScorecard}
            players={this.state.Players}
            RoundInProgress={this.state.RoundInProgress}
            handleBack={() => this.setState({ openPlayerHandler: false })}
            currentRounds={this.state.currentRounds}
          />
        ) : null}
      </Grid>
    );
  }
}
export default withRouter(App);
