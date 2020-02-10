import React from 'react';
import { Grid, Typography, Container, AppBar, Toolbar, Avatar, Paper, Link, Card, CardContent, CardActions, Button } from '@material-ui/core';
import { List, ListItem, ListItemAvatar, FormGroup, ListItemText, Collapse, IconButton, FormControl, Checkbox, FormHelperText, FormControlLabel } from '@material-ui/core';
import players from '../players.js';
import {withRouter } from "react-router-dom";
import { setValue, getValue } from '../data-access-layer/storage-helper'
import uuidv from 'uuid';

class GamesHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Players: players,
            Game: "Judgement"
        }
        this.startGame = this.startGame.bind(this);
    }
    componentDidMount() {
        let CurrentPlayers = players;
        CurrentPlayers.forEach(player=>{
            player.IsPlaying = false;
        })
        this.setState({players: CurrentPlayers});
    }
    startGame() {
        let CurrentPlayers = players;
        let TotalPlayers = 0;
        let GamePlayers = [];
        CurrentPlayers.forEach(player=>{
            if(player.IsPlaying){
                TotalPlayers++;
                GamePlayers.push(player)
            }
        });
        if(TotalPlayers > 3 && TotalPlayers < 10){
            let GameId = uuidv.v4();
            setValue(GameId, {Players: GamePlayers});
            this.props.history.push('/'+this.state.Game+'/'+GameId);
        }else{
            this.setState({hasError: true, errorInfo: "Player count not suitable for the game"})
        }
    }
    render() {

        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            Home
    </Typography>
                    </Toolbar>
                </AppBar>

                <Container>
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
                                                    this.setState({ players: CurrentPlayers })
                                                }} />}
                                                label={<ListItem button>
                                                    <ListItemAvatar>
                                                        <Avatar src={player.Profile} />
                                                    </ListItemAvatar>
                                                    <ListItemText primary={player.Name} />
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
                            </CardActions>
                        </Card>
                    </Paper>
                </Container>
            </Grid>


        )
    }
}
export default withRouter(GamesHome);
