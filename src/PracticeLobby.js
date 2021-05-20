import './App.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'

function PracticeLobby(props) {
    let decklist = localStorage.getItem("decks") ? JSON.parse(localStorage.getItem("decks")) : ["DefaultDeck"]
    let [deck, setDeck] = useState(sessionStorage.getItem("deck"))

    console.log("decklist", decklist)
    return (
        <div className="mt-3 row ml-0 mr-0" style={{textAlign: "center"}}>

        <div className="col-1" style={{textAlign: "left"}}>
            <Link to="/" style={{textAlign: "left"}}>
                <button className="btn btn-primary ml-1">←</button>
            </Link>
        </div>
        
        <div className="col-10" style={{textAlign: "center"}}>
            <h1 className="mb-5" style={{textAlign: "center"}}>Practice Lobby</h1> 

            <div>
                <strong style={{fontSize: "20px"}}>Deck: </strong>
                <select 
                    className="custom-select ml-1" 
                    style={{width: "15%"}}
                    onChange={(e) => { setDeck(e.target.value); sessionStorage.setItem("deck", e.target.value) }}
                    value={deck}
                >
                    { !deck ? (<option selectedValue value="">Choose...</option>) : "" }
                    {
                        decklist.map(deckname => (
                            <option selected={deck === deckname ? "selected" : "" } value={deckname}>
                                {deckname}
                            </option>
                        ))
                    }
                </select>
                <div style={{display: "none"}}>{deck}</div>
            </div>

            <br />

            <Link to={{ pathname: "/deckbuilder", state: {origin: "/practicelobby"}}}>
            <button className="btn btn-dark mt-1" style={{minWidth: "180px"}}>
                Build a Deck
            </button>
            </Link>
            <br />
            
            { deck ?
            (
                <Link to= {{pathname: "/vs", state: { p1_deck: deck} }} >
                    <button className="btn btn-primary mt-1" style={{minWidth: "180px"}}>
                        Play Practice Game
                    </button>
                </Link>
            ) : 
            (
                <button className="btn btn-secondary mt-1" disabled="disabled" style={{minWidth: "180px"}}>
                    Play Practice Game
                </button>
            )
            }

        </div>
        </div>
    )
}

export default PracticeLobby;