import React from 'react';
import { Grid, Typography, Container, AppBar, Toolbar, Avatar, Paper, Link, Card, CardContent, CardActions, Button } from '@material-ui/core';
import { List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Table, TableContainer, TableRow, TableHead, TableCell, TableBody } from '@material-ui/core';
import players from '../players.js';
import HorizontalLabelPositionBelowStepper from '../Components/StepperForm'
import GameHelper from '../data-access-layer/game-helper'
import { withRouter } from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            IsPlaying: false,
            Players: [],
            currentRounds: 0
        }
        this.handleScoreUpload = this.handleScoreUpload.bind(this);
    }
    startRound(data) {

    }
    handleScoreUpload(data){
        let Players = this.state.Players;
        Players.map((Player, index)=>{
            Player.CurrentRoundScore = data[index].CurrentScore
        })
        this.setState({Players: Players, IsPlaying: false});
    }
    componentDidMount() {
        try {
            let URLPath = this.props.location.pathname.split("/");
            let GameId = URLPath[URLPath.length - 1];
            let GameConfig = GameHelper.GetGameById(GameId);
            GameConfig.forEach(player => {
                player.Scores = [1, 2, 3]
            });
            this.setState({ Players: GameConfig, currentRounds: 5 });
            if (GameHelper.GetGameById("JUDGEMENT_" + GameId)) {

            }
        } catch (error) {
            this.props.history.push('/')
        }
    }
    render() {
        console.log(this.state)
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            Judgement
    </Typography>
                    </Toolbar>
                </AppBar>
                <Grid
                    container
                    direction="row"
                >
                    <Grid item xs={12} sm={8}>
                        <HorizontalLabelPositionBelowStepper handleScoreUpload={this.handleScoreUpload} players={this.state.Players} IsPlaying={this.state.IsPlaying}/>

                        <Grid container justify="center">
                            <Grid item>
                                <Paper elevation={3}>
                                    <Card>
                                        <CardContent>
                                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                                Recent Deposits
    </Typography>

                                            <Typography component="p" variant="h4">
                                                $3,024.00
      </Typography>
                                            <Typography color="textSecondary">
                                                on 15 March, 2019
      </Typography>

                                            <Link color="primary" href="#">
                                                View balance
        </Link>
                                        </CardContent>
                                        <CardActions>
                                            <Button fullWidth variant="contained" color="primary" onClick={() => this.setState({ IsPlaying: true })}>
                                                OK
                  </Button>
                                        </CardActions>
                                    </Card>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Container maxWidth="false">
                            <List dense>
                                {this.state.Players.map(Player =>
                                    <ListItem key={Player.Name}>
                                        <ListItemAvatar>
                                            <Avatar src={Player.Profile}/>
                                        </ListItemAvatar>
                                        <ListItemText primary={Player.Name} />
                                        <ListItemSecondaryAction>
                                            <ListItemAvatar>
                                                <Avatar>{Player.Score}</Avatar>
                                            </ListItemAvatar>
                                        </ListItemSecondaryAction>
                                    </ListItem>)}
                            </List>
                        </Container>        </Grid>
                </Grid>
                {this.state.currentRounds > 0 ? <Container maxWidth={false}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Scorecard
    </Typography>
                    <TableContainer component={Paper}>
                        <Table stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {this.state.Players.map(Player => <TableCell>{Player.Name}</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {this.state.Players.map((Player) => <TableRow key={Player.Name}>
                                    {Player.Scores.map((Score) => <TableCell component="tr">{Score}</TableCell>)}
                                </TableRow>)}
                            </TableBody>

                        </Table>
                    </TableContainer>
                </Container> : null}
            </Grid>
        )
    }
}
export default withRouter(App);
