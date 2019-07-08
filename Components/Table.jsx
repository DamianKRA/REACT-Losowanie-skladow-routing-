import React, { Component } from 'react';

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = { tabOfMatches: [] };
    }

    findSecondTeam(p1, p2, p3) {
        let secondTeam = [];
        for (let i in this.props.playersNames) {
            if (this.props.playersNames[i] !== p1.name && this.props.playersNames[i] !== p2.name && this.props.playersNames[i] !== p3.name)
                secondTeam.push(this.props.players["p" + (parseInt(i) + 1)]);
        }
        return secondTeam;
    }

    // componentDidUpdate(prevProp) {
    //jesli zmieniły się imiona
    // for (let i in this.props.playersNames) {
    //     if (this.props.playersNames[i] !== prevProp.playersNames[i]) {
    //         this.setState({ rowsChecked: [] });
    //         this.fillTabOfMatches();
    //         break;
    //     }
    // }

    //jesli zmieniła się liczba ukonczonych meczy
    // let nowMP = this.props.matchesPlayed;
    // if (prevProp.matchesPlayed.length !== nowMP.length) {
    // this.setState({ rowsChecked: [] });
    // }

    // if (prevProp.matchesPlayed.length !== nowMP.length && nowMP.length > 0) {
    // let lastElement = nowMP[nowMP.length - 1].index;
    // this.setState({ rowsChecked: [...this.state.rowsChecked, lastElement] });
    // }
    // }

    componentDidMount() {
        this.setState({ tabOfMatches: [] }, () => {
            for (let i = 0; i < 6 / 3; i++) {
                for (let j = 1; j < 6 / 2; j++) {
                    if (i !== j) {
                        for (let k = 2; k < 6; k++) {
                            if (i !== j && i !== k && j !== k) {
                                let team1 = [
                                    this.props.players["p" + (i + 1)],
                                    this.props.players["p" + (j + 1)],
                                    this.props.players["p" + (k + 1)]
                                ];

                                let secondTeamArray = this.findSecondTeam(
                                    this.props.players["p" + (i + 1)],
                                    this.props.players["p" + (j + 1)],
                                    this.props.players["p" + (k + 1)],
                                );

                                let team2 = [secondTeamArray[0], secondTeamArray[1], secondTeamArray[2]];

                                this.setState(prevState => ({
                                    tabOfMatches: [...prevState.tabOfMatches, [team1, team2]]
                                }));
                            }
                        }
                    }
                }
            }
        });
    }

    changeColor(index) {
        for (let i of this.props.matchesPlayed) {
            if (i.index === index)
                return styles.rowPlayed;
        }
    }

    handleRowClick = (row, index) => {
        this.props.getCurrentMatch(row, index);

        //Animacja scrolla----------
        const where = document.getElementsByClassName("tableComponent")[0].offsetHeight;
        let y = document.documentElement.scrollTop;
        const startDist = Math.abs(where - y);
        let step = startDist / 20;

        if (y > where) step *= -1;

        let interval = window.setInterval(() => {
            y += step;
            window.scrollTo(document.documentElement.scrollLeft, y);
            let dist = Math.abs(where - y);
            if (dist <= Math.abs(step / 2)) window.clearInterval(interval);
        }, 1000 / 60);
        //--------------------------
    }

    render() {
        return (
            <div className="tableComponent">
                <table className="tableOfMatches">
                    <thead>
                        <tr>
                            <th>Drużyna 1</th>
                            <th>Drużyna 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tabOfMatches.map((row, index1) =>
                            <tr
                                style={this.changeColor(index1)}
                                key={index1}
                                onClick={() => this.handleRowClick(row, index1)}>
                                {row.map((td, index2) =>
                                    <td key={index2}>
                                        {td.map(element => element.name + " ")}
                                    </td>
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

const styles = {
    rowPlayed: {
        backgroundColor: "rgb(222, 100, 73)",
        color: "rgb(255, 255, 242)",
    },
};