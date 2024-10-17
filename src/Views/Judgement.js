import React from 'react';
import { Grid, Typography, Container, AppBar, Toolbar, Avatar, Paper, FormControl } from '@material-ui/core';
import { ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Switch, Badge, Select, Input, MenuItem } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import HorizontalLabelPositionBelowStepper from '../Components/StepperForm'
import { setValue, getValue } from '../data-access-layer/storage-helper'
import { withRouter } from "react-router-dom";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AppsIcon from '@material-ui/icons/Apps';
import RestoreIcon from '@material-ui/icons/Restore';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import ScoreGraph from '../Components/ScoreGraph'



class App extends React.Component {
    constructor(props) {
        super(props);
        let URLPath = this.props.location.pathname.split("/");
        this.state = {
            GameId: URLPath[URLPath.length - 1],
            GameStarted: false,
            RoundInProgress: false,
            openPlayerHandler: false,
            Players: [],
            currentRounds: 0,
            table_headers: [],
            table_data: [],
            chart_data: [],
            leaderboard: [],
            seconds: 0
        }
        this.updateScorecard = this.updateScorecard.bind(this);
    }
    tick() {
        this.setState(state => ({
            seconds: state.seconds + 1
        }));
    }
    componentDidMount() {
        try {
            this.interval = setInterval(() => this.tick(), 1000);
            let Config = getValue(this.state.GameId)
            if (Config) {
                Object.keys(Config).map(key =>
                    this.setState({ [key]: Config[key] }))
            }
        } catch (error) {
            this.props.history.push('/')
        }
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    updateScorecard(data) {
        let CurrentPlayers = this.state.Players;
        if (this.state.RoundInProgress) {
            let headers = ["#"];
            let table_data = [];
            let chart_data = [];
            // eslint-disable-next-line array-callback-return
            CurrentPlayers.map((Player, index) => {
                Player.CurrentRoundScore = data[Player.ID] ? Player.CurrentRoundScore += 10 : 0;
                Player.Scores.push(Player.CurrentRoundScore)
                Player.TotalScore += Player.CurrentRoundScore
                Player.CurrentRoundScore = 0;
                chart_data.push({
                    "Name": Player.Name,
                    "TotalScore": Player.TotalScore,
                })
                headers.push(Player.Name)
            })
            for (let i = CurrentPlayers[0].Scores.length - 1; i >= 0; i--) {
                let table_row = []
                table_row.push(i + 1)
                for (let j = 0; j < CurrentPlayers.length; j++) {
                    table_row.push(CurrentPlayers[j].Scores[i])
                }
                table_data.push(table_row);
            }
            let Leaderboard = CurrentPlayers.sort((Player1, Player2) => {
                return Player2.TotalScore - Player1.TotalScore
            })
            let state = { Players: CurrentPlayers, table_headers: headers, table_data: table_data, chart_data: chart_data, currentRounds: this.state.currentRounds + 1, RoundInProgress: false, openPlayerHandler: false, leaderboard: Leaderboard, seconds: this.state.seconds }
            this.setState(state);
            setValue(this.state.GameId, state);
        } else {
            let TotalRoundScore = 0;
            // eslint-disable-next-line array-callback-return
            CurrentPlayers.map((Player, index) => {
                Player.CurrentRoundScore = data[Player.ID]
                TotalRoundScore += data[Player.ID]
            })
            this.setState({ Players: CurrentPlayers, RoundInProgress: true, openPlayerHandler: false, TotalRoundScore: TotalRoundScore });
        }
    }
    render() {
        return (<Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            {this.state.openPlayerHandler ? <HorizontalLabelPositionBelowStepper handleScoreUpload={this.updateScorecard} players={this.state.Players} RoundInProgress={this.state.RoundInProgress} handleBack={() => this.setState({ openPlayerHandler: false })} currentRounds={this.state.currentRounds} /> : null}
            <AppBar position="static">
                <Toolbar>
                    <Container>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Typography variant="h5">
                                Judgement
    </Typography>
                            <Typography variant="h6">
                                {this.state.seconds.toString().toHHMMSS()}
                            </Typography>
                        </Grid>
                    </Container>
                </Toolbar>
                <BottomNavigation
                    value={"Recents"}
                    onChange={(event, newValue) => {
                        // setValue(newValue);
                    }}
                    showLabels
                >
                    <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                    {this.state.currentRounds > 0 ? <BottomNavigationAction label="End game" icon={<AppsIcon />} onClick={() => this.setState({ GameStarted: false })} /> : <BottomNavigationAction label="Start game" icon={<PlayCircleFilledWhiteIcon />} onClick={() => this.setState({ openPlayerHandler: true })} />}

                    <BottomNavigationAction icon={<Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>End</Grid>
                            <Grid item>
                                <Switch
                                    checked={this.state.RoundInProgress ? true : false}
                                    onChange={() => this.setState({ openPlayerHandler: true })}
                                    value="Start"
                                />
                            </Grid>
                            <Grid item>Start</Grid>
                        </Grid>
                    </Typography>} />

                </BottomNavigation>

            </AppBar>

            <Grid
                container
                direction="row"
            >
                <Grid item xs={12} sm={8}>
                    {this.state.RoundInProgress ?
                        // <Container maxWidth="lg" style={{minHeight: '100%'}}>
                        <Grid
                            container
                            direction="column"
                            justify="space-evenly"
                            alignItems="stretch"
                            style={{ minHeight: '100%' }}
                        >
                            <Grid container
                                direction="row"
                                justify="space-evenly"
                                alignItems="center"
                            >
                                {/* Chart */}
                                <Grid item xs={12} md={4} lg={3}>
                                    <Paper elevation={3}>


                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar variant="square" style={this.state.trump_color ? { backgroundColor: this.state.trump_color } : {}}>{this.state.TotalRoundScore}</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={"Hands total"}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="text secondary"
                                                        >
                                                            for round {this.state.currentRounds + 1}
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                    </Paper>
                                </Grid>

                                <Grid item xs={12} md={4} lg={3}>
                                    <Paper elevation={3}>
                                        <ListItem alignItems="flex-start">
                                            {this.state.Players.map(Player =>
                                                <ListItemAvatar>
                                                    <Badge
                                                        overlap="circle"
                                                        anchorOrigin={{
                                                            vertical: 'bottom',
                                                            horizontal: 'right',
                                                        }}
                                                        badgeContent={<Avatar style={{ height: '22px', width: '22px', backgroundColor: Player.ColorCode }} >{Player.CurrentRoundScore}</Avatar>}
                                                    >

                                                        <Avatar alt={Player.Name} src={Player.Profile} style={{ height: '40px', width: '40px' }} />
                                                    </Badge>                                    </ListItemAvatar>)}
                                        </ListItem>

                                    </Paper>
                                </Grid>

                            </Grid>
                            <Grid container
                                direction="row"
                                justify="space-evenly"
                                alignItems="center">
                                <Grid item xs={12} md={4} lg={3}>
                                    <Paper elevation={3}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar style={{ backgroundColor: '#ff5722' }}>{this.state.currentRounds + 1}</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={"Round"}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="text secondary"
                                                        >
                                                            in progress
  </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={4} lg={3}>
                                    <Paper elevation={3}>

                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar variant="square" style={this.state.trump_color ? { backgroundColor: this.state.trump_color } : {}}>T</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Trump"
                                                secondary={
                                                    <React.Fragment>
                                                        <FormControl>
                                                            <Select
                                                                onChange={(e) => this.setState({ trump_color: e.target.value })}
                                                                input={<Input />}
                                                                style={{ minWidth: '120px' }}
                                                            >
                                                                <MenuItem value="black">हुकुम</MenuItem>
                                                                <MenuItem value="red">पान</MenuItem>
                                                                <MenuItem value="black">चिडी</MenuItem>
                                                                <MenuItem value="red">ईंट</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>

                        // </Container>
                        : <ScoreGraph scores={this.state.chart_data} />}
                </Grid>
                <Grid item xs={12} sm={4} container direction="column"
                    justify="space-evenly"
                    alignItems="stretch">
                    {/* <List> */}
                    {this.state.leaderboard.map(Player =>
                        <ListItem key={Player.Name}>
                            <ListItemAvatar>
                                <Avatar src={Player.Profile} />
                            </ListItemAvatar>
                            <ListItemText primary={Player.Name} />
                            <ListItemSecondaryAction>
                                <ListItemAvatar>
                                    <Avatar style={{ backgroundColor: Player.ColorCode }}>{Player.TotalScore}</Avatar>
                                </ListItemAvatar>
                            </ListItemSecondaryAction>
                        </ListItem>)}
                    {/* </List> */}
                </Grid>
            </Grid>


            {this.state.currentRounds > 0 ? <Container maxWidth={false}>
                <MUIDataTable
                    title={<Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Scorecard
</Typography>}
                    data={this.state.table_data}
                    columns={this.state.table_headers}
                    options={{
                        filterType: 'checkbox',
                        rowsPerPage: 20,
                        fixedHeader: true,
                        selectableRows: false,
                        selectableRowsHeader: false,
                        sort: false
                    }}
                />
            </Container> : null}
        </Grid>)

    }
}
export default withRouter(App);
