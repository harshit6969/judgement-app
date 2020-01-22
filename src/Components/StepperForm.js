import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FormControl, InputLabel, Select, MenuItem, ListItemSecondaryAction, Table, TableContainer, TableRow, TableHead, TableCell, TableBody } from '@material-ui/core';
import { Input, Dialog, DialogTitle, DialogContent, DialogActions,FormHelperText } from '@material-ui/core';
class StepperForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            players: this.props.players,
            IsPlaying: this.props.IsPlaying
        }
        this.handleBack = this.handleBack.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        let players = this.state.players;
        players[this.state.activeStep].CurrentScore = e.target.value;
        this.setState({players: players, activeStep: this.state.activeStep + 1 });
        if(this.state.activeStep == players.length - 1){
            let Players = this.state.players;
            let TotalHands = 0;
            Players.forEach(Player=>{
                TotalHands+=Player.CurrentScore
            })
            if(TotalHands){
                this.props.handleScoreUpload(this.state.players);
            }else{
                this.setState({hasError: true, errorInfo: "Total hands not met", activeStep:0})
            }
        }
    }
    handleBack() {
        this.setState({ activeStep: this.state.activeStep - 1 });
    }
    handleReset() {
        this.setState({ activeStep: 0 });
    }
    render() {
        let CurrentPlayer = this.state.players[this.state.activeStep];
        return (<Dialog disableBackdropClick disableEscapeKeyDown open={true}>
            <DialogTitle>Enter points for next round</DialogTitle>
            <DialogContent>
                <form>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Points for {CurrentPlayer.Name}
    </Typography>
                    <FormControl required>
                        <InputLabel>Score</InputLabel>
                        <Select
                            onChange={this.handleChange}
                            value={CurrentPlayer.CurrentScore}
                            input={<Input />}
                            style={{ minWidth: '120px' }}>
                            <MenuItem value={0}>Zero</MenuItem>
                            <MenuItem value={1}>One</MenuItem>
                            <MenuItem value={2}>Two</MenuItem>
                            <MenuItem value={3}>Three</MenuItem>
                            <MenuItem value={4}>Four</MenuItem>
                            <MenuItem value={5}>Five</MenuItem>
                            <MenuItem value={6}>Six</MenuItem>
                            <MenuItem value={7}>Seven</MenuItem>
                        </Select>
                        <FormHelperText error={this.state.hasError}>{this.state.errorInfo}</FormHelperText>
                    </FormControl>
                </form>
                <Typography>Step {(this.state.activeStep+1)} of {this.state.players.length+1}.</Typography>
            </DialogContent>
            <DialogActions>
                <div>
                    <div>
                    <Button variant="contained" color="secondary" onClick={this.handleReset}>
                            Reset
                        </Button>
                        <Button
                            disabled={this.state.activeStep === 0}
                            onClick={this.handleBack}
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