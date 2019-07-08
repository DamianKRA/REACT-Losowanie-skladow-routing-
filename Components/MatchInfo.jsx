import React, { Component } from 'react';

export default class MatchInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score1: "",
            score2: "",
            team1p0goals: "",
            team1p1goals: "",
            team1p2goals: "",
            team2p0goals: "",
            team2p1goals: "",
            team2p2goals: "",
            canUpdate: true,//true-dodaj, false-edytuj
        };
        this.handleInputs = this.handleInputs.bind(this);
    }

    resetState() {
        this.setState({
            score1: "",
            score2: "",
            team1p0goals: "",
            team1p1goals: "",
            team1p2goals: "",
            team2p0goals: "",
            team2p1goals: "",
            team2p2goals: "",
            canUpdate: true,
        });
    }

    updateScoreAndGoals(matchPlayed) { //rozegrany mecz. 
        this.setState({
            score1: matchPlayed.score[0],
            score2: matchPlayed.score[1],
            team1p0goals: matchPlayed.info[0].goals,
            team1p1goals: matchPlayed.info[1].goals,
            team1p2goals: matchPlayed.info[2].goals,
            team2p0goals: matchPlayed.info[3].goals,
            team2p1goals: matchPlayed.info[4].goals,
            team2p2goals: matchPlayed.info[5].goals,
            canUpdate: false,
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentMatch.index !== this.props.currentMatch.index) {
            // this.setState({ canUpdate: true });
            if (this.props.matchesPlayed.length > 0) {
                let reset = true;//flaga. jesli false to resetuje wszystkie pola 
                for (let matchPlayed of this.props.matchesPlayed) {
                    if (this.props.currentMatch.index === matchPlayed.index) {
                        this.updateScoreAndGoals(matchPlayed);
                        reset = false;
                        break;
                    }
                }
                if (reset) this.resetState();
            }
        }
    }

    componentDidMount() {
        //jesli currentMatch został już rozegrany to ustaw wynik meczu i bramki poszczególnych zawodników
        if (this.props.matchesPlayed.length > 0) {
            for (let match of this.props.matchesPlayed) {
                if (this.props.currentMatch.index === match.index)
                    this.updateScoreAndGoals(match);
            }
        }
    }

    handleInputs(e) {
        const value = (e.target.validity.valid) ? e.target.value : this.state[e.target.name];
        this.setState({ [e.target.name]: value });
    }

    render() {
        let team1 = this.props.currentMatch.t1; //tablica zawodnikow z 1. druzyny
        // console.log(team1[0]);
        let team2 = this.props.currentMatch.t2; //tablica zawodnikow z 2. druzyny
        //imie zawodnika | strzelone bramki | 1-wygrany mecz, 0-przegrany mecz
        const tabOfGoals = [
            { player: team1[0], goals: this.state.team1p0goals, winOrLose: this.state.score1 > this.state.score2 ? 1 : 0 },
            { player: team1[1], goals: this.state.team1p1goals, winOrLose: this.state.score1 > this.state.score2 ? 1 : 0 },
            { player: team1[2], goals: this.state.team1p2goals, winOrLose: this.state.score1 > this.state.score2 ? 1 : 0 },
            { player: team2[0], goals: this.state.team2p0goals, winOrLose: this.state.score1 < this.state.score2 ? 1 : 0 },
            { player: team2[1], goals: this.state.team2p1goals, winOrLose: this.state.score1 < this.state.score2 ? 1 : 0 },
            { player: team2[2], goals: this.state.team2p2goals, winOrLose: this.state.score1 < this.state.score2 ? 1 : 0 },
        ];

        return (
            <div className="matchInfoComponent">
                <table className="table">
                    <thead>
                        <tr>
                            <td colSpan="2" className="header">Wynik</td>
                        </tr>
                        <tr>
                            <td>
                                <input className="inputScore" type="text" pattern="[0-9]*" name="score1" value={this.state.score1} onChange={this.handleInputs} />
                            </td>
                            <td>
                                <input className="inputScore" type="text" pattern="[0-9]*" name="score2" value={this.state.score2} onChange={this.handleInputs} />
                            </td>
                        </tr>
                        <tr className="spacer">
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="2" className="header">Bramki</td>
                        </tr>
                        <tr>
                            <td>
                                {team1[0].name}<br />
                                <input className="inputGoals" pattern="[0-9]*" type="text" name="team1p0goals" value={this.state.team1p0goals} onChange={this.handleInputs} />
                            </td>
                            <td>
                                {team2[0].name}<br />
                                <input className="inputGoals" pattern="[0-9]*" type="text" name="team2p0goals" value={this.state.team2p0goals} onChange={this.handleInputs} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {team1[1].name}<br />
                                <input className="inputGoals" pattern="[0-9]*" type="text" name="team1p1goals" value={this.state.team1p1goals} onChange={this.handleInputs} />
                            </td>
                            <td>
                                {team2[1].name}<br />
                                <input className="inputGoals" pattern="[0-9]*" type="text" name="team2p1goals" value={this.state.team2p1goals} onChange={this.handleInputs} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {team1[2].name}<br />
                                <input className="inputGoals" pattern="[0-9]*" type="text" name="team1p2goals" value={this.state.team1p2goals} onChange={this.handleInputs} />
                            </td>
                            <td>
                                {team2[2].name}<br />
                                <input className="inputGoals" pattern="[0-9]*" type="text" name="team2p2goals" value={this.state.team2p2goals} onChange={this.handleInputs} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input
                    className="submit"
                    type="button"
                    name="submit"
                    value={this.state.canUpdate ? "Zatwierdź" : "Edytuj"}
                    onClick={() => this.props.getMatchResult(this.state.score1, this.state.score2, tabOfGoals)} />
            </div>
        );
    }
}