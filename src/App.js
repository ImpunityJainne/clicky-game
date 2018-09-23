import React, { Component } from "react";
import MatchCard from "./components/MatchCard";
import Wrapper from "./components/Wrapper";
import matches from "./matchcards.json";

let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Complete your collection by clicking each painting only once per round.";

class App extends Component {
    
    // Setting this.state.matches to the matches json array
    state = {
        matches,
        correctGuesses,
        bestScore,
        clickMessage
    };

    setClicked = id => {

        // Make a copy of the state matches array to work with
        const matches = this.state.matches;

        // Filter for the clicked match
        const clickedMatch = matches.filter(match => match.id === id);

        // If the matched image's clicked value is already true, start over
        if (clickedMatch[0].clicked){

            console.log ("Correct Guesses: " + correctGuesses);
            console.log ("Best Score: " + bestScore);

            correctGuesses = 0;
            clickMessage = "Oops! That one is a duplicate. Let's start from scratch."

            for (let i = 0 ; i < matches.length ; i++){
                matches[i].clicked = false;
            }

            this.setState({clickMessage});
            this.setState({ correctGuesses });
            this.setState({matches});

        // Otherwise, if clicked = false, and the user hasn't finished
        } else if (correctGuesses < 11) {

            // Set its value to true
            clickedMatch[0].clicked = true;

            // increment the appropriate counter
            correctGuesses++;
            
            clickMessage = "Yep, that's a new one. Keep going! Click only the paintings you haven't already clicked on this round.";

            if (correctGuesses > bestScore){
                bestScore = correctGuesses;
                this.setState({ bestScore });
            }

            // Shuffle the array to be rendered in a random order
            matches.sort(function(a, b){return 0.5 - Math.random()});

            // Set this.state.matches equal to the new matches array
            this.setState({ matches });
            this.setState({correctGuesses});
            this.setState({clickMessage});
        } else {

            // Set its value to true
            clickedMatch[0].clicked = true;

            // restart the guess counter
            correctGuesses = 0;

            // Let user know they've one and that they can continue playing.
            clickMessage = "CONGRATULATIONS! What a fine collection. Simply keep clicking to start a new round.";
            bestScore = 12;
            this.setState({ bestScore });
            
            for (let i = 0 ; i < matches.length ; i++){
                matches[i].clicked = false;
            }

            // Shuffle the array to be rendered in a random order
            matches.sort(function(a, b){return 0.5 - Math.random()});

            // Set this.state.matches equal to the new matches array
            this.setState({ matches });
            this.setState({correctGuesses});
            this.setState({clickMessage});

        }
    };

    render() {
        return (
            <Wrapper>

                <div class="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Fine Art Collection Game</h1>
                        <p clasName="lead scoreSummary">{this.state.clickMessage}</p>

                        <h6 className="scoreSummary">
                            Current Collection: {this.state.correctGuesses} 
                            <br />
                            Largest Collection: {this.state.bestScore} 
                        </h6>

                    </div>
                </div>
                
                <div class="row">

                    {this.state.matches.map(match => (
                        <MatchCard
                            setClicked={this.setClicked}
                            id={match.id}
                            key={match.id}
                            image={match.image}
                        />
                    ))}

                </div>

            </Wrapper>
        );
    }
}

export default App;
