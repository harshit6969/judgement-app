import React from "react";
import Button from "@material-ui/core/Button";
import {
  FormControl,
  Checkbox,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Grid,
  Slider,
  Typography,
} from "@material-ui/core";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormHelperText,
} from "@material-ui/core";

class StepperForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      players: this.props.players,
      IsPlaying: this.props.RoundInProgress,
      hasError: false,
      errorInfo: null,
      TotalHands: 0,
      MaxHands: parseInt(52 / this.props.players.length),
    };
    this.handleBeforeRoundSubmit = this.handleBeforeRoundSubmit.bind(this);
    this.handleAfterRoundSubmit = this.handleAfterRoundSubmit.bind(this);
  }

  handleBeforeRoundSubmit() {
    try {
      let players = this.state.players;
      let flag = true;
      let TotalHands = 0;
      for (let player of players) {
        if (this.state.hasOwnProperty(player.ID)) {
          player.CurrentRoundScore = parseInt(this.state[player.ID]);
          TotalHands += this.state[player.ID];
        } else {
          flag = false;
          break;
        }
      }
      if (flag && this.state.MaxHands !== parseInt(TotalHands)) {
        this.props.handleScoreUpload(this.state);
      } else if(this.state.MaxHands === parseInt(TotalHands)) {
        this.setState({
          hasError: true,
          errorInfo: "Invalid hands:" + TotalHands.toString(),
          activeStep: 0,
        });
      } else {
        this.setState({
          hasError: true,
          errorInfo: "Sabko bharne do",
          activeStep: 0,
        });
      }
    } catch (e) {
      this.setState({ hasError: true, errorInfo: "Bhakk" });
    }
  }

  handleAfterRoundSubmit() {
    let Players = this.state.players;
    let flag = true;
    for (let Player of Players) {
      if (!this.state[Player.ID]) {
        flag = false;
        break;
      }
    }
    if (flag) {
      this.setState({ hasError: true, errorInfo: "Bhakk" });
    } else {
      this.props.handleScoreUpload(this.state);
    }
  }

  componentDidMount() {
    if (this.state.IsPlaying) {
      this.state.players.forEach((player) =>
        this.setState({ [player.ID]: true })
      );
    }
  }

  // Function to reorder players array starting from the current round
  getOrderedPlayers() {
    const { players } = this.state;
    const { currentRounds } = this.props;

    // Ensure currentRounds doesn't exceed the number of players
    const startingIndex = currentRounds % players.length;

    // Create an array with players reordered starting from index `currentRounds`
    const reorderedPlayers = [
      ...players.slice(startingIndex),
      ...players.slice(0, startingIndex),
    ];
    return reorderedPlayers;
  }

  render() {
    const orderedPlayers = this.getOrderedPlayers();

    if (this.state.IsPlaying) {
      return (
        <Dialog open={true}>
          <DialogTitle>
            Results for Round: <strong>{this.props.currentRounds + 1}</strong>{" "}
          </DialogTitle>
          <DialogContent>
            <form>
              <FormControl required component="fieldset">
                <FormLabel component="legend">Unselect failures</FormLabel>
                <FormGroup>
                  {orderedPlayers.map((player, index) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state[player.ID]}
                          onChange={(e) =>
                            this.setState({
                              [e.target.value]: !this.state[e.target.value],
                            })
                          }
                          value={player.ID}
                        />
                      }
                      label={`${player.Name} - ${player.CurrentRoundScore}`}
                      key={player.ID}
                    />
                  ))}
                </FormGroup>
                <FormHelperText error={this.state.hasError}>
                  {this.state.errorInfo}
                </FormHelperText>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleAfterRoundSubmit}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={this.props.handleBack}
              >
                Back
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      );
    }

    return (
      <Dialog
        disableBackdropClick
        fullWidth
        maxWidth={"lg"}
        disableEscapeKeyDown
        open={true}
        style={{
          maxHeight: "90%",
          overflow: "hidden",
        }}
      >
        <DialogTitle>
          Round: <strong>{this.props.currentRounds + 1}</strong> | Hands:{" "}
          {this.state.TotalHands}
        </DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            overflowY: "auto", // Allow scrolling for content
            height: "60vh", // Adjust height dynamically
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
            spacing={1}
            style={{ height: "100%", paddingTop: "5%",}}
          >
            {orderedPlayers.map((Player) => (
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                spacing={2}
                key={Player.ID}
                style={{color: Player.ColorCode}}
              >
                {/* Player Name */}
                <Grid item xs={12} sm={2} md={1}>
                  <Typography variant="subtitle1">
                    {Player.Name}
                  </Typography>
                </Grid>

                {/* Slider */}
                <Grid
                  item
                  xs={12}
                  sm={10}
                  md={11}
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Slider
                    value={this.state[Player.ID]}
                    onChange={(e, value) => {
                      let players = this.state.players;
                      let TotalHands = value;
                      for (let player of players) {
                        if (this.state.hasOwnProperty(player.ID)) {
                          if (!(Player.ID === player.ID)) {
                            TotalHands += this.state[player.ID];
                          }
                        }
                      }
                      this.setState({
                        [Player.ID]: value,
                        TotalHands: TotalHands,
                      });
                    }}
                    min={0}
                    max={this.state.MaxHands}
                    step={1}
                    marks={[...Array(this.state.MaxHands + 1).keys()].map(
                      (i) => ({
                        value: i,
                        label: i.toString(),
                      })
                    )}
                    valueLabelDisplay={this.state[Player.ID] !== undefined ? "on" : "off"}
                    style={{
                      width: "100%",
                      color: Player.ColorCode, // Dynamic slider color
                    }}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
          <FormHelperText error={this.state.hasError}>
                {this.state.errorInfo}
              </FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleBeforeRoundSubmit}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={this.props.handleBack}
          >
            Back
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default StepperForm;
