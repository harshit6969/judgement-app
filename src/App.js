import React from 'react';
import './App.css';
import players from './players.js';
import JudgementHome from './JudgementHome.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      IsPlaying: false,
      Players: [],
      HeaderText: "Kaun kaun khelega"
    }
    this.startPlay = this.startPlay.bind(this);
    this.endPlay = this.endPlay.bind(this);
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
  }

  startPlay() {
    if(this.state.Players.length>3&&this.state.Players.length<7){
      this.setCookie("IsPlaying", true, .125);
      this.setCookie("Players", JSON.stringify(this.state.Players), .125);
      this.setState({IsPlaying:true, HeaderText: "Ab khel sakte hain"});
    }else{
      alert("no no");
    }
    return;
}
endPlay(){
  this.setCookie("IsPlaying", "", .125);
  this.setCookie("Players", "", .125);
  this.setState({IsPlaying:false, HeaderText: "Ab khel sakte hain"});
}
handlePlayerChange(event){
  if(event.target.checked){
    let CurrentPlayers = this.state.Players;
    let Player = players.find(Player=> Player.ID == event.target.id);
CurrentPlayers.push(Player);
this.setState({Players: CurrentPlayers});
  }else{
    let CurrentPlayers = this.state.Players;
    let UpdatedPlayers = [];
    CurrentPlayers.forEach(Player=>{
      if(Player.ID==event.target.id){

      }else{
        UpdatedPlayers.push(Player);
      }
    });
    this.setState({Players:UpdatedPlayers});
  }
}
  IsValid = (target) => {
    if (target.hasAttribute('required') && !target.value) {
      target.nextSibling.innerText = target.name + " is mandatory";
      target.nextSibling.style.color = "red";
      target.style.borderColor = "red";
      return false;
    }
    if (target.value) {
      if (target.type == 'email') {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(target.value))) {
          target.style.borderColor = "red";
          target.nextSibling.style.color = "red";
          target.nextElementSibling.innerText = "Invalid Email Format";
          return false;
        }
      }
      //validate all datatypes
    }
    target.style.borderColor = "green";
    if (target.nextElementSibling) {
      target.nextElementSibling.innerText = '';
    }
    return true;
  }
  getGameplayStatus = new Promise((resolve, reject) =>{
    if(this.getCookie("IsPlaying"))resolve();
    reject();
  });

  componentDidMount() {
    this.getGameplayStatus.then(()=>{
    this.setState({Players: JSON.parse(this.getCookie("Players"))});
    console.log(this.state.Players);
    this.startPlay();
    }).catch(()=>{
    });
  }

  render() {
    return (
      <div className="container-fluid">
<div class="jumbotron jumbotron-fluid text-center">
  <div class="container">
    <h1 class="display-4">{this.state.HeaderText}</h1>
    <button type="button" class="btn btn-primary" onClick={this.startPlay}>Start Game</button>
    <p class="lead">...</p>
  </div>
</div>
{this.state.IsPlaying?<JudgementHome players={this.state.Players} endPlay={this.endPlay}/>:<div className="row" className="text-center">
<div className="row col-12">
  {players.map(player=>
    <div class="col-4 form-group form-check">
    <input type="checkbox" class="form-check-input" id={player.ID} onChange={this.handlePlayerChange}/>
    <label class="form-check-label" for={player.ID}>{player.Name}</label>
  </div>
  )}
  <div className="row col-12">
    <div className="col-6">
    <button type="button" class="btn btn-primary btn-block" onClick={this.startPlay}>Start Game</button>
      </div>
      <div className="col-6">
      <button type="button" class="btn btn-info btn-block" onClick={()=>{
        document.getElementById("PlayerName").value = null;
        document.getElementById("AddPlayerForm").style.visibility="visible";
      }}>Add player</button>
      <br></br>
      <div id="AddPlayerForm" className="row col-12" style={{visibility: "hidden"}}>
      <input type="text" class="col-6 form-control" id="PlayerName" placeholder="Name of player"/>
      <button type="submit" class="col-6 btn btn-primary btn-block" onClick={()=>{
        if(document.getElementById("PlayerName").value){
          players.push({
            "ID": Math.floor(Math.random() * 90 + 10),
            "Name": document.getElementById("PlayerName").value
          });
          document.getElementById("AddPlayerForm").style.visibility="hidden";
          this.setState({IsPlaying: false});
        }else{
          alert("no");
        }
      }}>Add</button>
        </div>
      </div>
      </div>
  </div>

</div>}
</div>
    );
}
}
export default App;
