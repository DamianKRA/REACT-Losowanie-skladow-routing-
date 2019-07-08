import React, { Component } from 'react';

function Stats(props) {
    return (
        <table className={props.className}>
            <thead>
                <tr>
                    <th>ZAWODNIK</th>
                    <th>Z</th>
                    <th>P</th>
                    <th>G</th>
                </tr>
            </thead>
            <tbody>
                {props.players.map(p =>
                    <tr key={p.name}>
                        <td>{p.name}</td>
                        <td>{p.matchesWon}</td>
                        <td>{p.matchesLost}</td>
                        <td>{p.goals}</td>
                    </tr>)}
            </tbody>
        </table>
    );
}

function BestAndWorst(props) {
    return (
        <table className={props.className}>
            <tbody>
                <tr>
                    <td>Najwięcej goli strzelił:</td>
                    <td>{props.mostGoals}</td>
                </tr>
                <tr>
                    <td>Najwięcej wygranych:</td>
                    <td>{props.mostWins}</td>
                </tr>
                <tr>
                    <td>Najmniej goli strzelił:</td>
                    <td>{props.leastGoals}</td>
                </tr>
                <tr>
                    <td>Najwięcej przegranych:</td>
                    <td>{props.mostLost}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default class PlayersInfo extends Component {
    mostGoals(players) { //players = tablica obiektów (player)
        let mostGoals = 0;
        let player = "";
        for (let p of players) {
            if (p.goals > mostGoals) {
                mostGoals = p.goals;
                player = p.name + " ";
            } else if (p.goals === mostGoals) {
                mostGoals = p.goals;
                player += (p.name + " ");
            }
        }
        return player;
    }

    leastGoals(players) { //players = tablica obiektów (player)
        let leastGoals = players[0].goals;
        let player = "";
        for (let p of players) {
            if (p.goals < leastGoals) {
                leastGoals = p.goals;
                player = p.name + " ";
            } else if (p.goals === leastGoals) {
                leastGoals = p.goals;
                player += (p.name + " ");
            }
        }
        return player;
    }

    mostWins(players) { //players = tablica obiektów (player)
        let mostWins = players[0].matchesWon;
        let player = "";
        for (let p of players) {
            if (p.matchesWon > mostWins) {
                mostWins = p.matchesWon;
                player = p.name + " ";
            } else if (p.matchesWon === mostWins) {
                mostWins = p.matchesWon;
                player += (p.name + " ");
            }
        }
        return player;
    }

    mostLost(players) { //players = tablica obiektów (player)
        let mostLost = players[0].matchesLost;
        let player = "";
        for (let p of players) {
            if (p.matchesLost > mostLost) {
                mostLost = p.matchesLost;
                player = p.name + " ";
            } else if (p.matchesLost === mostLost) {
                mostLost = p.matchesLost;
                player += (p.name + " ");
            }
        }
        return player;
    }

    render() {
        let players = [];
        for (let x in this.props.players) players.push(this.props.players[x]);

        return (
            <div className="playersInfoComponent">
                <Stats className="stats" players={players} />
                <hr />
                <BestAndWorst
                    className="bestAndWorst"
                    mostGoals={this.mostGoals(players)}
                    leastGoals={this.leastGoals(players)}
                    mostWins={this.mostWins(players)}
                    mostLost={this.mostLost(players)}
                />
            </div >
        );
    }
}