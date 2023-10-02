import React from 'react';
import { Grid, Typography, AppBar, Toolbar, Avatar, Paper, Card, CardContent, CardActions, Button, Dialog, DialogContent, DialogContentText, TextField, DialogActions, List, IconButton } from '@material-ui/core';
import { ListItem, ListItemAvatar, FormGroup, ListItemText, FormControl, Checkbox, FormHelperText, FormControlLabel } from '@material-ui/core';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { withRouter } from "react-router-dom";
import { setValue, getPlayers, setPlayers } from '../data-access-layer/storage-helper'
import uuidv from 'uuid';
import { Delete, KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

class GamesHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Players: getPlayers(),
            Game: "Judgement",
            isCreateModalOpen: false,
            isArrangeModalOpen: false,
            playerName: "",
            playerLogo: "",
            GamePlayers: []
        }
        this.startGame = this.startGame.bind(this);
        this.startSortedGame = this.startSortedGame.bind(this);
        this.toggleAddPlayer = this.toggleAddPlayer.bind(this);
        this.toggleArrangeModal = this.toggleArrangeModal.bind(this);
        this.addNewPlayer = this.addNewPlayer.bind(this);
        this.resetPlayers = this.resetPlayers.bind(this);
        this.deletePlayer = this.deletePlayer.bind(this);
    }

    componentDidMount() {
        let CurrentPlayers = this.state.Players;
        CurrentPlayers.forEach(player => {
            player.IsPlaying = false;
        })
        this.setState({ Players: CurrentPlayers });
    }
    startGame() {
        let CurrentPlayers = this.state.Players;
        let TotalPlayers = 0;
        let GamePlayers = [];
        CurrentPlayers.forEach(player => {
            if (player.IsPlaying) {
                TotalPlayers++;
                GamePlayers.push(player)
            }
        });
        if (TotalPlayers > 3 && TotalPlayers < 10) {
            this.setState({ GamePlayers: GamePlayers, isArrangeModalOpen: true });
            // let GameId = uuidv.v4();
            // setValue(GameId, { Players: GamePlayers });
            // this.props.history.push('/' + this.state.Game + '/' + GameId);
        } else {
            this.setState({ GamePlayers: [], isArrangeModalOpen: false });
            this.setState({ hasError: true, errorInfo: "Player count not suitable for the game" })
        }
    }
    startSortedGame() {
        let GameId = uuidv.v4();
        setValue(GameId, { Players: this.state.GamePlayers });
        this.props.history.push('/' + this.state.Game + '/' + GameId);
    }
    toggleAddPlayer() {
        this.setState({ isCreateModalOpen: !this.state.isCreateModalOpen });
    }
    toggleArrangeModal() {
        this.setState({ isArrangeModalOpen: !this.state.isArrangeModalOpen });
    }
    resetPlayers() {
        setPlayers();
        this.setState({ Players: getPlayers() });
    }
    addNewPlayer() {
        try {
            if (!this.state.playerName) throw new Error("Bhadwe");
            const player = {
                ID: Math.random().toFixed(4) * 10000,
                Name: this.state.playerName,
                IsMF: true,
                Profile: this.state.playerLogo,
                CurrentRoundScore: 0,
                TotalScore: 0,
                Scores: [],
                ColorCode: "#424242",
                IsCustom: true
            };
            const allPlayers = this.state.Players;
            allPlayers.push(player);
            setPlayers(allPlayers);
            this.setState({ isCreateModalOpen: false, playerName: "", playerLogo: "", Players: allPlayers });
        } catch (error) {
            console.error(error);
            alert(error)
        }
    }

    deletePlayer(ID) {
        const allPlayers = this.state.Players;
        const index = allPlayers.findIndex((player) => player.ID === ID);
        allPlayers.splice(index, 1);
        setPlayers(allPlayers);
        this.setState({ Players: allPlayers });
    }



    render() {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="stretch">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            Home
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Grid xs={10}>
                    <Paper elevation={3}>
                        <Card>
                            <CardContent>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>Select players</Typography>
                                <FormControl required component="fieldset">
                                    <FormGroup>
                                        {this.state.Players.map((player, index) =>
                                            <FormControlLabel
                                                control={<Checkbox checked={player.IsPlaying} value={player.Name} id={index} onChange={(e) => {
                                                    let CurrentPlayers = this.state.Players;
                                                    CurrentPlayers[e.target.id].IsPlaying = e.target.checked;
                                                    this.setState({ Players: CurrentPlayers })
                                                }} />}
                                                label={<ListItem button>
                                                    <ListItemAvatar>
                                                        <Avatar src={player.Profile} />
                                                    </ListItemAvatar>
                                                    <ListItemText primary={player.Name} />

                                                    {player.IsCustom && <IconButton onClick={() => { this.deletePlayer(player.ID) }}><Delete /></IconButton>}
                                                </ListItem>}
                                            />
                                        )}
                                    </FormGroup>
                                    <FormHelperText error={this.state.hasError}>{this.state.errorInfo}</FormHelperText>
                                </FormControl>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary" onClick={this.startGame}>
                                    Start Game
                                </Button>
                                <Button variant="contained" color="primary" onClick={() => { this.setState({ isCreateModalOpen: true }) }}>
                                    Add player
                                </Button>
                                <Button variant="contained" color="secondary" onClick={this.resetPlayers}>
                                    Reset
                                </Button>
                            </CardActions>
                        </Card>
                    </Paper>
                </Grid>
                <Dialog open={this.state.isArrangeModalOpen} onClose={this.toggleArrangeModal}>
                    <DialogContent>
                        <DialogContentText>
                            Arrange players
                        </DialogContentText>
                        <List>
                            {this.state.GamePlayers.map((player, index) =>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar src={player.Profile} />
                                    </ListItemAvatar>
                                    <ListItemText primary={player.Name} />

                                    <IconButton onClick={() => {
                                        let players = this.state.GamePlayers;
                                        [players[index], players[index - 1]] = [players[index - 1], players[index]];
                                        this.setState({ GamePlayers: players });
                                    }} hidden={index === 0}><KeyboardArrowUp /></IconButton>
                                    <IconButton onClick={() => {
                                        let players = this.state.GamePlayers;
                                        [players[index], players[index + 1]] = [players[index + 1], players[index]];
                                        this.setState({ GamePlayers: players });
                                    }} hidden={index === this.state.GamePlayers.length - 1}><KeyboardArrowDown /></IconButton>
                                </ListItem>
                            )}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="secondary" onClick={this.toggleArrangeModal}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={this.startSortedGame}>Start</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.state.isCreateModalOpen} onClose={this.toggleAddPlayer}>
                    <DialogContent>
                        <DialogContentText>
                            Add Player
                        </DialogContentText>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            required
                            onChange={(e) => { this.setState({ playerName: e.target.value }) }}
                        />
                        <TextField
                            margin="dense"
                            id="profile"
                            label="Logo URL(Optional)"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => { this.setState({ playerLogo: e.target.value }) }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.toggleAddPlayer}>Cancel</Button>
                        <Button onClick={this.addNewPlayer}>Add</Button>
                    </DialogActions>
                </Dialog>
            </Grid>


        )
    }
}
export default withRouter(GamesHome);
