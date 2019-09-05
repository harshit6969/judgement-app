import React from 'react';
import RoundManager from './AddRow.js';
import './App.css';


class JudgementHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Play: false,
            Players: [],
            DefaultPlayer: null,
            IsPlaying: false,
            showModal: false
        }
        this.updateLeaderboard = this.updateLeaderboard.bind(this);
        this.handleAfterPlayInput = this.handleAfterPlayInput.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    overlay() {
	let el = document.getElementById("overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    }
    updateLeaderboard() {
        let CurrentPlayers = this.state.Players;
        CurrentPlayers.sort(function (a, b) {
            return b.Score - a.Score;
        });
        this.setState({ Players: CurrentPlayers });
    }
    handleAfterPlayInput(PlayerID, PlayerSucceed) {
        let CurrentPlayers = this.state.Players;
        let IfAllProcessed = true;
        CurrentPlayers.forEach((Player) => {
            if (Player.ID == PlayerID) {
                var element = document.getElementById(Player.Name+"InputButtonDiv");
                element.parentNode.removeChild(element);
                Player.CurrentRoundScore = (PlayerSucceed)? 10 + Player.CurrentRoundScore: 0;
                Player.CurrentRoundProcessed = true;
                this.setState({ Players: CurrentPlayers});
            }
            if(!Player.CurrentRoundProcessed)IfAllProcessed = Player.CurrentRoundProcessed;
        });
        if(IfAllProcessed){
            this.completeRound();
        }
    }
    completeRound(){
        let table = document.getElementById("table_body");
        var row = table.insertRow(0);
        let CurrentPlayers = this.state.Players;
        CurrentPlayers.map((Player, index)=>{
            let cell = row.insertCell(index);
            cell.innerHTML = '<th scope="row">'+Player.CurrentRoundScore+'</th>';
            Player.Score+=Player.CurrentRoundScore;
            Player.CurrentRoundScore = null;
            Player.CurrentRoundProcessed = false;
        });
        this.setState({ Players: CurrentPlayers, showModal: false, IsPlaying: false});
        //this.updateLeaderboard();
    }
    closeModal(data){
        console.log(data);
        let CurrentPlayers = this.state.Players;
        if(this.state.IsPlaying){
            console.log(data);
            data.forEach((RoundPlayer)=>{
                let index = CurrentPlayers.findIndex(Player => Player.ID == RoundPlayer.ID);
                CurrentPlayers[index].Scores.push = RoundPlayer.CurrentRoundScore;
                CurrentPlayers[index].CurrentRoundScore = 0;
            });
        }else{
            data.forEach((RoundPlayer)=>{
                CurrentPlayers[CurrentPlayers.findIndex(Player => Player.ID == RoundPlayer.ID)].CurrentRoundScore = RoundPlayer.CurrentRoundScore;
            });
        }
        this.setState({showModal: false, Players: CurrentPlayers, IsPlaying: !this.state.IsPlaying});
        }
    componentDidMount() {
        console.log(this.props);
        let InitPlayers = this.props.players;
        InitPlayers.forEach(Player => {
            Player.Score = 0;
            Player.CurrentRoundScore = 0;
            Player.CurrentRoundProcessed = false;
        });
        this.setState({ Players: this.props.players, DefaultPlayer: this.props.players[2]});
    }

    render() {
        console.log(this.state);
        return (
            <div className="container-fluid row">
                {this.state.showModal?<RoundManager IsPlayingRound={this.state.IsPlaying} Players={this.state.Players} DefaultPlayer={this.state.DefaultPlayer}
                 closeModal={(data)=>this.closeModal(data)}
             />:null}
                
                {/* {this.state.showModal ? <AddRow handleHideModal={()=>this.setState({showModal: false})}/> : null} */}
                {/* <Modal classNames="modal-lg" open={this.state.showModal} onClose={()=>this.setState({showModal: false})} center>
                    <h5>{this.state.IsPlaying?"Confirm karo":"Haath bolo"}</h5>
                    <br></br>
                    {this.state.Players.map(Player =>
                        <div class="form-group row">
                            <label class="col-sm-8 col-form-label">Hands for {Player.Name}</label>
                            {this.state.IsPlaying ?
                                <div id={Player.Name + "InputButtonDiv"} className="col-sm-4 row col-12">
                                    <div className="col-6">
                                        <button type="button" class="btn btn-success" id={Player.ID} onClick={(event) => this.handleAfterPlayInput(event.target.id, true)}>Win</button>
                                    </div>
                                    <div className="col-6">
                                        <button type="button" class="btn btn-danger" id={Player.ID} onClick={(event) => this.handleAfterPlayInput(event.target.id, false)}>Lose</button>
                                    </div>
                                </div> :
                                <div className="col-sm-4">
                                    <select class="form-control" id={Player.ID} value={Player.CurrentRoundScore} onChange={(event) => {
                                        let CurrentPlayers = this.state.Players;
                                        CurrentPlayers.forEach(Player => {
                                            if (Player.ID == event.target.id) {
                                                Player.CurrentRoundScore = parseInt(event.target.value)
                                            }
                                        })
                                        this.setState({Players: CurrentPlayers});
                                    }} >
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                    </select>
                                </div>}
                        </div>
                    )}
                    {this.state.IsPlaying?null:<button type="button" class="btn btn-primary" onClick={(event) => {
                        let CurrentPlayers = this.state.Players;
                        let TotalScore = 0;
                        CurrentPlayers.forEach(Player => {
                            TotalScore += Player.CurrentRoundScore;
                        });
                        if (parseInt(52 / this.state.Players.length) == parseInt(TotalScore)) {
                            alert("no")
                            return
                        } else {
                            this.setState({ showModal: false, Players: CurrentPlayers, IsPlaying: true });
                        }
                    }}>Submit</button>}
                </Modal> */}
                <div className="col-9">
                    <div className="row">
                        <div className="col-8 row">
                            <div className="col">
                                {this.state.IsPlaying ? <button type="button" class="btn btn-danger btn-sm" onClick={() => {
                                    this.setState({showModal: true});
                                }}>End round</button> : <button type="button" class="btn btn-primary btn-sm" onClick={() => this.setState({ showModal: true })}>Play round</button>}
                            </div>
                            <div className="col">
                                <button type="button" class="btn btn-primary btn-sm">Small button</button>
                            </div>
                            <div className="col">
                                <button type="button" class="btn btn-primary btn-sm">End</button>
                            </div>
                        </div>
                        <div className="col-4">
                            adassas
                  </div>
                    </div>
                    <br></br>
                    <table class="table">
                    {this.state.Players.map((Player) =>{
                        return(<tr>
                            <th>{Player.Name}</th>
                            {this.state.IsPlaying?<td>{Player.CurrentRoundScore}</td>:null}
                            {Player.Scores.map((Score)=>
                                <td>{Score}</td>
                            )}
                        </tr>)
                    })}
                    </table>
                </div>
                <ul class="col-3 list-group">
                    {this.state.Players.map(Player => 
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                        {Player.Name}
                        <span class="badge badge-primary badge-pill">{Player.Score}</span>
                    </li>
                    )}
                </ul>
            </div>
        );
    }
}
export default JudgementHome;
