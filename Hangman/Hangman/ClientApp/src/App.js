import React, { Component } from 'react';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            usedCharacters: "",
            activeString: "_ ____ __ __ ______",
            targetString: "I need to do better",
            inputCharacter: ""
        };


        this.changeValue = this.changeValue.bind(this);
        this.onInput = this.onInput.bind(this);
        this.onStart = this.onStart.bind(this);
    }

    changeValue = event => {
        this.setState({
            [event.target.name]: event.target.value
        });

    };

    onStart = event => {
        var url = 'https://hangman-api.lively.software/';
        var req = new XMLHttpRequest();
        req.open('POST', url);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send('difficulty=' + encodeURIComponent(event.target.difficulty));
        console.log(req.responseText);
    }

    onInput = event => {
        event.preventDefault();
        var positions = [];
        for (var i = 0; i < this.state.targetString.length; i++) {
            if (this.state.targetString.charAt(i).toLowerCase() == this.state.inputCharacter.toLowerCase()) {
                positions.push(i);
            }
        }
        if (positions.length == 0) {
            var used = this.state.usedCharacters + " " + this.state.inputCharacter.toLowerCase();
            this.setState({ usedCharacters: used });
        }
        else {
            var activeString = this.state.activeString.split("");
            var char = this.state.inputCharacter.toLowerCase();
            positions.forEach(function (element) {
                activeString[element] = char;
            })
            var temp = activeString.join("");
            this.setState({ activeString: temp });

        }
    }

    render() {
        return (
            <div>
                <h1> Hangman </h1>

                <div className="ButtonControl">
                    <input type="radio" name="difficulty" value="easy" /> Easy
                <input type="radio" name="difficulty" value="medium" /> Medium
                <input type="radio" name="difficulty" value="hard" /> Hard
                <button type="submit" value="input" onClick={(event) => this.onStart(event)}>Start</button>
                </div>

                <div className="GameArea">
                    <canvas>
                    </canvas>
                    <h3> Used Characters:
                </h3>
                    <p> {this.state.usedCharacters}
                    </p>

                </div>

                <div className="LetterArea">
                    <p> {this.state.activeString}
                    </p>
                    <input type="text" name="inputCharacter" value={this.state.inputCharacter} onChange={event => this.changeValue(event)} />
                    <button type="submit" value="input" onClick={(event) => this.onInput(event)}>Input</button>
                </div>
            </div>

        );
    }
}
