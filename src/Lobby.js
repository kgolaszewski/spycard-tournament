import './App.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'

function Lobby(props) {
    let decklist = localStorage.getItem("decks") ? JSON.parse(localStorage.getItem("decks")) : ["DefaultDeck"]
    let [deck, setDeck] = useState("")

    console.log("decklist", decklist)
    return (
        <div className="ml-1 mt-3" style={{textAlign: "center"}}>
            <h1 className="mb-5" style={{textAlign: "center"}}>SpyCards Lobby</h1> 

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
                            <option value={deckname}>
                                {deckname}
                            </option>
                        ))
                    }
                </select>
                <div style={{display: "none"}}>{deck}</div>
            </div>

            <br />

            <Link to="/deckbuilder">
            <button className="btn btn-dark mt-1" style={{minWidth: "180px"}}>
                Build a Deck
            </button>
            </Link>
            <br />
            
            { deck ?
            (
                <Link to= {{pathname: "/vs", state: { p1_deck: deck} }} >
                    <button className="btn btn-primary mt-1" style={{minWidth: "180px"}}>
                        Practice vs CPU
                    </button>
                </Link>
            ) : 
            (
                <button className="btn btn-secondary mt-1" disabled="disabled" style={{minWidth: "180px"}}>
                    Practice vs CPU
                </button>
            )
            }
            <br />

            { deck ?
            (
                <Link to= {{pathname: "/pvplobby", state: { p1_deck: deck} }} >
                    <button className="btn btn-success mt-1" style={{minWidth: "180px"}}>
                        Join Unranked Lobby
                    </button>
                </Link>
            ) : 
            (
                <button className="btn btn-secondary mt-1" disabled="disabled" style={{minWidth: "180px"}}>
                    Join Unranked Lobby
                </button>
            )
            }
            <br />
            <Link to="/howtoplay">
            <button className="btn btn-info mt-1" style={{minWidth: "180px"}}>
                Learn How to Play
            </button>
            </Link>
            <br />
            <Link to="/effectstutorial">
            <button className="btn btn-info mt-1" style={{minWidth: "180px"}}>
                Learn Card Keywords
            </button>
            </Link>

        </div>
    )
}

export default Lobby;