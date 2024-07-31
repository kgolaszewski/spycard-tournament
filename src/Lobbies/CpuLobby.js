import '../CSS/App.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import DeckSelector from '../Components/DeckSelector';

function CpuLobby(props) {
    const navigate = useNavigate()

    let decklist = localStorage.getItem("decks") ? JSON.parse(localStorage.getItem("decks")) : ["DefaultDeck"]
    let [deck, setDeck] = useState(sessionStorage.getItem("deck"))

    return (
        <div className="mt-3 row ml-0 mr-0" style={{textAlign: "center"}}>

        <div className="col-1" style={{textAlign: "left"}}>
            <Link to="/" style={{textAlign: "left"}}>
                <button className="btn btn-primary ml-1">←</button>
            </Link>
        </div>
        
        <div className="col-10" style={{textAlign: "center"}}>
            <h1 className="mb-5" style={{textAlign: "center"}}>Practice Lobby</h1> 

            <DeckSelector deck={deck} decklist={decklist} setDeck={setDeck} />


            <br />

            <Link to={{ pathname: "/deckbuilder", state: {origin: "/practicelobby"}}}>
            <button className="btn btn-dark mt-1" style={{minWidth: "180px"}}>
                Build a Deck
            </button>
            </Link>
            <br />
            
            { deck ?
            (
                // <Link to= {{pathname: "/vs", state: { p1_deck: deck} }} >
                <button className="btn btn-primary mt-1" style={{minWidth: "180px"}}
                    onClick={() => navigate("/vs", { state: { p1_deck: deck} }) }
                >
                    Play Practice Game
                </button>
                // </Link>
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

export default CpuLobby;