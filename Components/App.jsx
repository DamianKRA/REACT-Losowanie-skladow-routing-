import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import Inputs from './Inputs';
import Table from './Table';
import MatchInfo from './MatchInfo';
import PlayersInfo from './PlayersInfo';
import Popup from './Popup';

import '../Styles/main.css';

import Player from '../Player';

function Warning(props) {
  return (
    <div className={props.className}>
      <span>Czy na pewno chcesz wszystko zresetować?</span><br />
      <div className="buttons">
        <input className="submit tak" type="button" value="TAK" onClick={props.handleYes} />
        <input className="submit" type="button" value="NIE" onClick={props.handleNo} />
      </div>
    </div>
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: {
        p1: new Player(""),
        p2: new Player(""),
        p3: new Player(""),
        p4: new Player(""),
        p5: new Player(""),
        p6: new Player(""),
      },
      playersNames: [],//imiona zawonikow pobrane z inputów
      matchesPlayed: [],//wszystkie rozegrane mecze, max 10
      showTable: false,//true- gdy wygenerowane składy
      currentMatch: undefined,//aktualny mecz
      showWarning: false,
      reset: false,
      showMenu: false,//czy wyświetlić menu (nav)
      showPopup: false,//czy pokazać wyskakujące okno z informacją
      popupContent: "",//tekst w popupie
    }
    this.initPlayers = this.initPlayers.bind(this);
    this.getCurrentMatch = this.getCurrentMatch.bind(this);
    this.getMatchResult = this.getMatchResult.bind(this);
    this.resetAll = this.resetAll.bind(this);
  }

  componentDidUpdate() {
    if (this.state.reset) this.resetAll();
  }

  resetAll() {
    this.setState({
      players: {
        p1: new Player(""),
        p2: new Player(""),
        p3: new Player(""),
        p4: new Player(""),
        p5: new Player(""),
        p6: new Player(""),
      },
      playersNames: [],
      matchesPlayed: [],
      showTable: false,
      currentMatch: undefined,
      showWarning: false,
      reset: false,
      showMenu: false,
      showPopup: false,
      popupContent: "",
    });
  }

  initPlayers(playersNames, event) {//playersNames-tablica imion, event-event
    //jesli zostały rozegrane juz jakieś mecze
    if (this.state.matchesPlayed.length > 0) {
      event.preventDefault();
      this.setState({ showPopup: true, popupContent: "Mecze już zostały rozegrane" });
      return false;
    }

    //jesli jest jakieś puste pole
    if (playersNames.includes("")) {
      event.preventDefault();
      this.setState({ showPopup: true, popupContent: "Uzupełnij wszystkie pola" });
      return false;
    }

    //jesli są dwa takie same imiona
    for (let i in playersNames) {
      for (let j in playersNames) {
        if (i !== j) {
          if (playersNames[i] === playersNames[j]) {
            event.preventDefault();
            this.setState({ showPopup: true, popupContent: "Imiona nie mogą się powtarzać" });
            return false;
          }
        }
      }
    }

    //jesli nie ma błędów to inicjuj
    this.setState({
      players: {
        p1: new Player(playersNames[0]),
        p2: new Player(playersNames[1]),
        p3: new Player(playersNames[2]),
        p4: new Player(playersNames[3]),
        p5: new Player(playersNames[4]),
        p6: new Player(playersNames[5]),
      },
      playersNames: playersNames,
      matchesPlayed: [],
      currentMatch: undefined,
      showTable: true,
    });
  }

  getCurrentMatch(match, index) {
    // this.setState({ currentMatch: [...match, index] });
    this.setState({ currentMatch: { index: index, t1: match[0], t2: match[1] } });
  }

  //pobierz wynik meczu i wszystkie bramki i zupdate'uj:
  //bramki strzelone przez graczy, kto ile meczy wygrał i wiele innych...
  getMatchResult(score1, score2, arrayOfGoals) {
    if (score1 !== "" || score2 !== "") {
      let s1 = score1 === "" ? 0 : parseInt(score1);
      let s2 = score2 === "" ? 0 : parseInt(score2);
      const match = {
        index: this.state.currentMatch.index,
        score: [s1, s2],
        team1: this.state.currentMatch.t1,
        team2: this.state.currentMatch.t2,
        info: arrayOfGoals
      };
      console.log("goals", arrayOfGoals);

      let playersCopy = { ...this.state.players };
      //dodanie nowego meczu do this.state.matchesPlayed
      if (this.canInsertNewMatch() === true) {
        console.log('dodaje');
        for (let i in arrayOfGoals) {
          for (let player = 0; player < 6; player++) {
            if (this.state.players["p" + (player + 1)].name === arrayOfGoals[i].player.name) {
              let goals = arrayOfGoals[i].goals === "" ? 0 : arrayOfGoals[i].goals;
              playersCopy["p" + (player + 1)].goals += parseInt(goals);
              playersCopy["p" + (player + 1)].matchesPlayed += 1;
              if (arrayOfGoals[i].winOrLose === 1) {
                playersCopy["p" + (player + 1)].matchesWon += 1;
              } else {
                playersCopy["p" + (player + 1)].matchesLost += 1;
              }
              this.setState({ players: playersCopy });
            }
          }
        }
        this.setState({
          matchesPlayed: [...this.state.matchesPlayed, match],
          currentMatch: undefined,
        });
      } else {
        console.log('update');
        //edytowanie znalezionego meczu w this.state.matchesPlayed
        let matchesPlayedNew = [...this.state.matchesPlayed];
        //cofam statystyki graczy oraz rozegrane mecze
        for (let i in matchesPlayedNew) {
          if (matchesPlayedNew[i].index === this.canInsertNewMatch()) {
            let info = matchesPlayedNew[i].info;
            for (let j in info) {
              for (let k = 0; k < 6; k++) {
                if (playersCopy["p" + (k + 1)].name === info[j].player.name) {
                  playersCopy["p" + (k + 1)].goals -= (info[j].goals === "") ? 0 : parseInt(info[j].goals)
                  playersCopy["p" + (k + 1)].matchesPlayed -= 1;
                  if (info[j].winOrLose === 1) {
                    playersCopy["p" + (k + 1)].matchesWon -= 1;
                  } else {
                    playersCopy["p" + (k + 1)].matchesLost -= 1;
                  }
                }
              }
            }
            matchesPlayedNew.splice(i, 1);
          }
        }
        //updateuje statsytyki graczy i rozegranych meczy
        for (let i in arrayOfGoals) {
          for (let player = 0; player < 6; player++) {
            if (this.state.players["p" + (player + 1)].name === arrayOfGoals[i].player.name) {
              let goals = arrayOfGoals[i].goals === "" ? 0 : arrayOfGoals[i].goals;
              playersCopy["p" + (player + 1)].goals += parseInt(goals);
              playersCopy["p" + (player + 1)].matchesPlayed += 1;
              if (arrayOfGoals[i].winOrLose === 1) {
                playersCopy["p" + (player + 1)].matchesWon += 1;
              } else {
                playersCopy["p" + (player + 1)].matchesLost += 1;
              }
              this.setState({ players: playersCopy });
            }
          }
        }
        matchesPlayedNew.push(match);
        this.setState({
          matchesPlayed: matchesPlayedNew,
          currentMatch: undefined,
        });
      }
    }
  }

  canInsertNewMatch() {
    for (let match of this.state.matchesPlayed) {
      if (this.state.currentMatch.index === match.index) {
        return match.index;
      }
    }
    return true;
  }

  switchShowMenu = () => {
    this.setState((state) => ({ showMenu: !state.showMenu }));
  }

  hidePopup = () => {
    this.setState({ showPopup: false });
  }

  render() {
    let matchInfo = null;
    let table = null;
    let playersInfo = null;
    let popup = null;

    if (this.state.showTable) {
      table = <Table
        players={this.state.players}
        getCurrentMatch={this.getCurrentMatch}
        matchesPlayed={this.state.matchesPlayed}
        currentMatch={this.state.currentMatch}
        playersNames={this.state.playersNames} />;
    } else {
      table = <div className="info">
        <h1>Mecze nie zostały wygenerowane!</h1>
        <h4>W tym celu przejdź do części START i wygeneruj mecze</h4>
      </div>;
    }

    if (this.state.matchesPlayed.length > 0) {
      playersInfo = <PlayersInfo
        players={this.state.players}
        matchesPlayed={this.state.matchesPlayed}
        playersNames={this.state.playersNames} />;
    } else {
      playersInfo = <div className="info">
        <h1>Statystyki nie są dostępne!</h1>
        <h4>Aby mieć dostęp do statystyk musisz rozegrać co najmniej jeden mecz</h4>
      </div>;
    }

    if (this.state.currentMatch !== undefined) {
      matchInfo = <MatchInfo
        currentMatch={this.state.currentMatch}
        getMatchResult={this.getMatchResult}
        matchesPlayed={this.state.matchesPlayed} />;
    } else { matchInfo = null; }

    if (this.state.showPopup) {
      popup = <Popup
        text={this.state.popupContent}
        hidePopup={this.hidePopup} />
    } else { popup = null; }

    return (
      <Router>
        <div id="app">
          <nav>
            <div className="background"></div>
            <div className="dropMenu" onClick={this.switchShowMenu}>
              {/* <img src={require("../Styles/imports/bars.svg")} alt="fail"/> */}
            </div>
            <ul style={this.state.showMenu ? { display: "block" } : { display: "none" }}>
              <li>
                <Link to="/" onClick={() => this.setState({ showMenu: false })}>Start</Link>
              </li>
              <li>
                <Link to="/table" onClick={() => this.setState({ showMenu: false })}>Mecze</Link>
              </li>
              <li>
                <Link to="/stats" onClick={() => this.setState({ showMenu: false })}>Statystyki</Link>
              </li>
            </ul>
          </nav>
          <main className="content">
            <Route exact path="/" render={props => <div> <Inputs
              {...props}
              initPlayers={this.initPlayers}
              reset={this.state.reset}
              showTable={this.state.showTable}
              playersNames={this.state.playersNames} />

              <input className="reset" type="button" value="RESET" onClick={() => this.setState({ showWarning: true })} />

              {this.state.showWarning ?
                <Warning
                  className="warningDiv"
                  handleYes={() => this.setState({ reset: true, showWarning: false })}
                  handleNo={() => this.setState({ reset: false, showWarning: false })} />
                : null}
            </div>} />

            <Route path="/table" render={() => <div>
              {table}
              {matchInfo}
            </div>} />

            <Route path="/stats" render={() => <div>
              {playersInfo}
            </div>} />

            {popup}
          </main>
        </div>
      </Router>
    );
  }
}