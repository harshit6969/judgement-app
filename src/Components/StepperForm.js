import React from 'react';
import Button from '@material-ui/core/Button';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, FormLabel, FormGroup, Grid, Slider } from '@material-ui/core';
import { Input, Dialog, DialogTitle, DialogContent, DialogActions, FormHelperText } from '@material-ui/core';

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
            MAX_HANDS: Math.ceil(52 / this.props.players.length) || 10
        }
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
                    player.CurrentRoundScore = parseInt(this.state[player.ID])
                    TotalHands += this.state[player.ID]
                } else {
                    flag = false
                    break
                }
            }
            if (flag && parseInt(52 / this.state.players.length) != parseInt(TotalHands)) {
                this.props.handleScoreUpload(this.state);
            } else {
                this.setState({ hasError: true, errorInfo: "Invalid hands:" + TotalHands.toString(), activeStep: 0 })
            }
        } catch (e) {
            this.setState({ hasError: true, errorInfo: "Bhakk" })
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
            this.setState({ hasError: true, errorInfo: "Bhakk" })
        } else {
            // Players.forEach(Player => Player.CurrentRoundScore = this.state[Player.ID] ? 10 + parseInt(Player.CurrentRoundScore): 0)
            // console.log(this.state)
            // console.log(Players)
            this.props.handleScoreUpload(this.state);
        }
    }
    componentDidMount() {
        if (this.state.IsPlaying) {
            this.state.players.forEach(player => this.setState({ [player.ID]: true }))
        }
    }
    generateMarks() {
        let marks = [];
        for (let index = 0; index <= this.state.MAX_HANDS; index++) {
            marks.push({
                value: index,
                label: index,
            })
        }
        return marks;
    }

    render() {
        if (this.state.IsPlaying) {
            return (<Dialog open={true}>
                <DialogTitle>Results for Round: <strong>{this.props.currentRounds + 1}</strong> </DialogTitle>
                <DialogContent>
                    <form>
                        <FormControl required component="fieldset">
                            <FormLabel component="legend">Unselect failures</FormLabel>
                            <FormGroup>
                                {this.state.players.map((player, index) =>
                                    <FormControlLabel
                                        control={<Checkbox checked={this.state[player.ID]} onChange={(e) => this.setState({ [e.target.value]: !this.state[e.target.value] })} value={player.ID} />}
                                        label={player.Name}
                                    />
                                )}
                            </FormGroup>
                            <FormHelperText error={this.state.hasError}>{this.state.errorInfo}</FormHelperText>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <div>
                        <div>
                            <Button variant="contained" color="primary" onClick={this.handleAfterRoundSubmit}>
                                Submit
                            </Button>
                            <Button
                                variant="container" color="secondary"
                                onClick={this.props.handleBack}
                            >
                                Back
                            </Button>

                        </div>
                    </div>
                </DialogActions>
            </Dialog>)
        }
        return (<Dialog disableBackdropClick disableEscapeKeyDown open={true} fullWidth={true}>
            <DialogTitle>Total Hands: <strong>{this.state.TotalHands}</strong> </DialogTitle>
            <DialogContent>

                <FormControl required component="fieldset" fullWidth>
                    {/* <FormGroup> */}
                    <Grid container direction='row' justifyContent='space-between'>
                        {this.state.players.map((Player, index) =>
                            <>
                                <Grid xs={3}>
                                    <FormControl required>
                                        <InputLabel>{Player.Name}</InputLabel>
                                        <Select
                                            id={Player.ID}
                                            name={Player.ID}
                                            onChange={(e) => {
                                                let players = this.state.players;
                                                let TotalHands = e.target.value;
                                                for (let player of players) {
                                                    if (this.state.hasOwnProperty(player.ID)) {
                                                        if (!(e.target.name == player.ID)) {
                                                            TotalHands += this.state[player.ID]
                                                        }
                                                    }
                                                }
                                                this.setState({ [Player.ID]: e.target.value, TotalHands: TotalHands })
                                            }}
                                            value={Number(this.state[Player.ID]) || ""}
                                            input={<Input id={Player.ID} />}
                                            style={{ minWidth: '150px' }}>
                                            <MenuItem value={0}>0</MenuItem>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={6}>6</MenuItem>
                                            <MenuItem value={7}>7</MenuItem>
                                            <MenuItem value={8}>8</MenuItem>
                                            <MenuItem value={9}>9</MenuItem>
                                            <MenuItem value={10}>10</MenuItem>
                                        </Select>
                                    </FormControl></Grid>
                                <Grid xs={8}>
                                    <Slider name={Player.ID} min={0} value={Number(this.state[Player.ID])} step={1} marks={this.generateMarks()}
                                        max={this.state.MAX_HANDS}
                                        onChange={(e, value) => {
                                            let players = this.state.players;
                                            let TotalHands = value;
                                            for (let player of players) {
                                                if (this.state.hasOwnProperty(player.ID)) {
                                                    if (!(Player.ID == player.ID)) {
                                                        TotalHands += this.state[player.ID]
                                                    }
                                                }
                                            }
                                            this.setState({ [Player.ID]: value, TotalHands: TotalHands })
                                        }}
                                    ></Slider>
                                </Grid>

                            </>
                        )}
                    </Grid>
                    {/* </FormGroup> */}
                    <FormHelperText error={this.state.hasError}>{this.state.errorInfo}</FormHelperText>
                </FormControl>

            </DialogContent>
            <DialogActions>
                <div>
                    <div>
                        <Button variant="contained" color="primary" onClick={this.handleBeforeRoundSubmit}>
                            Submit
                        </Button>
                        <Button
                            variant="container" color="secondary"
                            onClick={this.props.handleBack}
                        >
                            Back
                        </Button>
                    </div>
                </div>
            </DialogActions>
        </Dialog>)
    }
}


export default StepperForm;