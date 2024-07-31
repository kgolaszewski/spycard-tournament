import '../CSS/App.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { socket } from '../socket';
import DeckSelector from '../Components/DeckSelector';

function PvpLobby() {
    const navigate = useNavigate()

    let [username, setUsername] = useState("")
    let [registered, setRegistered] = useState(!!sessionStorage.getItem("username"))
    
    const store_username = (username) => { sessionStorage.setItem("username", username) }

    const newRoomId = uuidv4()

    let decklist = localStorage.getItem("decks") ? JSON.parse(localStorage.getItem("decks")) : ["DefaultDeck"]
    let [deck, setDeck] = useState(sessionStorage.getItem("deck"))

    useEffect(() => {
        if (sessionStorage.getItem("username")) { setRegistered(true) }
        socket.emit("view-rooms", "")
    }, [])

    return (
    <div className="App row ml-0 mr-0">
        <div className="col-1" style={{textAlign: "left"}}>
            <Link to="/" style={{textAlign: "left"}}>
                <button className="btn btn-primary ml-1">←</button>
            </Link>
        </div>
        
        <div className="col-10" style={{textAlign: "center"}}>
            <h1 className="mt-3 mb-5">Unranked Lobby</h1> 
            
            {
            registered ?
            (<div>
                <h4>Welcome, {sessionStorage.getItem("username")}</h4>
                <DeckSelector deck={deck} decklist={decklist} setDeck={setDeck} />

            <Link to={{ pathname: "/deckbuilder", state: {origin: "/pvplobby"}}}>
            <button className="btn btn-dark mt-1" style={{minWidth: "150px"}}>
                Build a Deck
            </button>
            </Link>
            <br />

            { deck ?
            (<div>
            <button 
                className="btn btn-primary mt-1" style={{minWidth: "150px"}}
                onClick={() => { 
                    socket.emit( "create-room", { "room": newRoomId, "user": sessionStorage.getItem("username")});
                    navigate("/pvpvs", { state: { roomId: newRoomId } })
                }}
            >
                Create Room
            </button>
            <br />

            <Link to="/pvprooms">
                <button className="btn btn-info mt-1" style={{minWidth: "150px"}}>
                    Join Room
                </button>
            </Link> 
            </div>) : (

            <div>
                <button className="btn btn-secondary mt-1" style={{minWidth: "150px"}} disabled="disabled">
                    Create Room
                </button>

                <br />

                <button className="btn btn-secondary mt-1" style={{minWidth: "150px"}} disabled="disabled">
                    Join Room
                </button>
            </div>

            )

            }

            </div>
            ) 
                : 
            (
            <div className="row mt-5" style={{justifyContent: "center"}}>
                <input 
                    placeholder="Enter username here" 
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <button className="btn btn-primary ml-1" 
                    onClick={() => {store_username(username); setRegistered(true)}}
                >
                    Register Username
                </button>
            </div>
            )
            }



        </div>
    </div>
    )
}

export default PvpLobby;