import React from 'react';
class RoundManager extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    let CurrentPlayers = [];
    var offset = this.props.Players.findIndex(Player => Player.ID == this.props.DefaultPlayer.ID);
    let RoundStarted = false;
    for (let count = offset; count < this.props.Players.length; count++) {
      if (count == offset && RoundStarted) {
        break;
      }
      CurrentPlayers.push(this.props.Players[count]);
      if (count == this.props.Players.length - 1) {
        count = -1;
        RoundStarted = true;
        continue;
      }
    }
    this.state = {
      Players: CurrentPlayers,
      CurrentPlayer: CurrentPlayers[0],
      CurrentStep: 0
    }
    // this.setState({Players: Players, CurrentPlayer: this.props.DefaultPlayer});
    // this.closeModal = this.closeModal.bind(this);
    this.handleAfterPlayInput = this.handleAfterPlayInput.bind(this);
  }
  handleAfterPlayInput(PlayerSucceed) {
    let CurrentPlayers = this.state.Players;
    CurrentPlayers[this.state.CurrentStep].CurrentRoundScore = (PlayerSucceed) ? 10 + CurrentPlayers[this.state.CurrentStep].CurrentRoundScore : 0;
    this.setState({ Players: CurrentPlayers });
    if (this.state.CurrentStep == this.state.Players.length - 1) {
      console.log("here")
      console.log(this.state.Players);
      console.log(CurrentPlayers);
      this.props.closeModal(this.state.Players);
    } else {
      this.setState({ CurrentPlayer: CurrentPlayers[this.state.CurrentStep + 1], CurrentStep: this.state.CurrentStep + 1 });
    }
  }
  componentDidMount() {

  }
  render() {
    return (<div
      className="modal container-fluid">
      <nav class="navbar navbar-light bg-light" style={{ height: "15%" }}>
        <span class="navbar-text">
          {this.props.IsPlayingRound ? "Results" : "Hands"}
        </span>
      </nav>
      <div className="row col-12" style={{ left: "25%", height: "70%" }}>
        <div class="col-6 card">
          <img src="https://www.w3schools.com/css/paris.jpg" class="card-img-top" style={{ height: "120px" }} alt="..." />
          <div class="card-body">
            <p className="card-text"><strong>Name: </strong>{this.state.CurrentPlayer.Name}</p>
            {this.props.IsPlayingRound ? <p className="card-text"><strong>Score: </strong>{this.state.CurrentPlayer.CurrentRoundScore}</p> : null}
            {this.props.IsPlayingRound ? null : <select class="form-control" id={this.state.CurrentPlayer.ID} value={this.state.CurrentPlayer.CurrentRoundScore} onChange={(event) => {
              let CurrentPlayers = this.state.Players;
              CurrentPlayers.forEach(Player => {
                if (Player.ID == event.target.id) {
                  Player.CurrentRoundScore = parseInt(event.target.value)
                }
              })
              this.setState({ Players: CurrentPlayers });
            }}>
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
            </select>}
          </div>
        </div>
      </div>
      <div className="row" style={{ height: "15%" }}>
        {this.props.IsPlayingRound ? <div className="row col-12">
          <div className="col-6">
            <button type="button" class="btn btn-success btn-block" onClick={() => {
              console.log(this.state.Players);
              if (this.state.CurrentStep == this.state.Players.length - 1) {
                console.log(this.state.Players);
              } else {
                let CurrentPlayers = this.state.Players;
                CurrentPlayers[this.state.CurrentStep].CurrentRoundScore = 10 + CurrentPlayers[this.state.CurrentStep].CurrentRoundScore;
                this.setState({ Players: CurrentPlayers });
                this.setState({ CurrentPlayer: CurrentPlayers[this.state.CurrentStep + 1], CurrentStep: this.state.CurrentStep + 1 });
              }
            }}>Bohot zyada chud</button>
          </div>
          <div className="col-6">
            <button type="button" class="btn btn-danger btn-block" onClick={() => {
              if (this.state.CurrentStep == this.state.Players.length - 1) {
                console.log(this.state.Players);
                // this.props.closeModal(this.state.Players);
              } else {
                this.setState({ CurrentPlayer: this.state.Players[this.state.CurrentStep + 1], CurrentStep: this.state.CurrentStep + 1 });
              }
            }}>Chud</button>
          </div>
        </div> : <button className="btn btn-primary btn-block" onClick={(event) => {
          if (this.state.CurrentStep == this.state.Players.length - 1) {
            let CurrentPlayers = this.state.Players;
            let TotalScore = 0;
            CurrentPlayers.forEach(Player => {
              TotalScore += Player.CurrentRoundScore;
            });
            if (parseInt(52 / this.state.Players.length) == parseInt(TotalScore)) {

              return
            } else {
              this.props.closeModal(this.state.Players);
            }
          } else {
            this.setState({ CurrentPlayer: this.state.Players[this.state.CurrentStep + 1], CurrentStep: this.state.CurrentStep + 1 });
          }
        }}>
            {this.state.CurrentStep == this.state.Players.length - 1 ? "Start" : "Next"}
          </button>}
      </div>
    </div>);
  }
}
export default RoundManager;