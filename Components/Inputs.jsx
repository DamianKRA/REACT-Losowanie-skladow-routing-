import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";

export default class Inputs extends Component {
    constructor(props) {
        super(props);
        //tekst w inputach
        this.state = {
            names: ["", "", "", "", "", ""] //6 inputów
        };
        this.handleInput = this.handleInput.bind(this);
    }

    //jeśli mecze zostały wygenerowane to wpisz imiona z powrotem do inputów
    componentDidMount() {
        if (this.props.showTable) {
            let tab = [];
            for (let i = 0; i < 6; i++)
                tab[i] = this.props.playersNames[i];
            this.setState({ names: tab });
        }
    }

    //reset tekstu w inputach
    componentDidUpdate() {
        if (this.props.reset)
            this.setState({ names: ["", "", "", "", "", ""] });
    }

    //pobranie tekstu z inputa i zapisanie go do state'a
    handleInput(e) {
        let tab = [...this.state.names];
        tab[e.target.name] = e.target.value;
        this.setState({ names: tab });
    }

    render() {
        return (
            <div className="inputsComponent">
                <h1>PODAJ IMIONA ZAWODNIKÓW</h1>
                <div className="inputs">
                    <input
                        type="text"
                        name="0"
                        value={this.state.names[0]}
                        onChange={this.handleInput}
                    /><br />
                    <input
                        type="text"
                        name="1"
                        value={this.state.names[1]}
                        onChange={this.handleInput}
                    /><br />
                    <input
                        type="text"
                        name="2"
                        value={this.state.names[2]}
                        onChange={this.handleInput}
                    /><br />
                    <input
                        type="text"
                        name="3"
                        value={this.state.names[3]}
                        onChange={this.handleInput}
                    /><br />
                    <input
                        type="text"
                        name="4"
                        value={this.state.names[4]}
                        onChange={this.handleInput}
                    /><br />
                    <input
                        type="text"
                        name="5"
                        value={this.state.names[5]}
                        onChange={this.handleInput}
                    /><br />
                    <Link to="/table">
                        <input className="submit"
                            type="button"
                            value="Generuj mecze"
                            onClick={(event) => this.props.initPlayers(this.state.names, event)} />
                    </Link>
                </div>

                <Route path="/table" />
            </div>
        );
    }
}
