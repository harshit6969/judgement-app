import React from "react";
import Button from "@material-ui/core/Button";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormLabel,
  FormGroup,
} from "@material-ui/core";
import {
  Input,
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
      } else {
        this.setState({
          hasError: true,
          errorInfo: "Invalid hands:" + TotalHands.toString(),
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
    console.log(startingIndex, reorderedPlayers)

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
                      label={player.Name}
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
                variant="container"
                color="secondary"
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
      <Dialog disableBackdropClick disableEscapeKeyDown open={true}>
        <DialogTitle>
          Hands for Round: <strong>{this.props.currentRounds + 1}</strong>{" "}
        </DialogTitle>
        <DialogContent>
          <form>
            <FormLabel component="legend">
              Total Hands: {this.state.TotalHands}
            </FormLabel>

            <FormControl required component="fieldset">
              <FormGroup>
                {orderedPlayers.map((Player) => (
                  <FormControl required key={Player.ID}>
                    <InputLabel>{Player.Name}</InputLabel>
                    <Select
                      id={Player.ID}
                      name={Player.ID}
                      onChange={(e) => {
                        let players = this.state.players;
                        let TotalHands = e.target.value;
                        for (let player of players) {
                          if (this.state.hasOwnProperty(player.ID)) {
                            if (!(e.target.name === player.ID)) {
                              TotalHands += this.state[player.ID];
                            }
                          }
                        }
                        this.setState({
                          [Player.ID]: e.target.value,
                          TotalHands: TotalHands,
                        });
                      }}
                      value={this.state[Player.ID]}
                      input={<Input id={Player.ID} />}
                      style={{ minWidth: "200px" }}
                    >
                      {[...Array(this.state.MaxHands + 1).keys()].map((i) => (
                        <MenuItem key={i} value={i}>
                          {i}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ))}
              </FormGroup>
              <FormHelperText error={this.state.hasError}>
                {this.state.errorInfo}
              </FormHelperText>
            </FormControl>
          </form>
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
            variant="container"
            color="secondary"
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
