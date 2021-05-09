import './App.css';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import {socket} from './socket';

function PvpLobby() {

    
    let [username, setUsername] = useState("")
    let store_username = (username) => { sessionStorage.setItem("username", username) }

    let [registered, setRegistered] = useState(false)

    const newRoomId = uuidv4()

    useEffect(() => {
        if (sessionStorage.getItem("username")) { setRegistered(true) }
        socket.emit("view-rooms", "")
    }, [])

    return (
        <div className="mt-3" style={{textAlign: "center"}}>
            <h1 className="mb-5" style={{textAlign: "center"}}>Lobby</h1> 
            
            {
            registered ?
            (<div>
                <h2>Welcome, {sessionStorage.getItem("username")}</h2>
                <Link to= {{pathname: "/pvpvs", state: { roomId: newRoomId } }} >
                <button 
                    className="btn btn-primary mt-1" style={{minWidth: "150px"}}
                    onClick={() => {
                        socket.emit(
                            "create-room", 
                            {
                                "room": newRoomId,
                                "user": sessionStorage.getItem("username")
                            }
                        )
                    }}
                >
                    Create Room
                </button>
                </Link>
                <br />
                <Link to="/pvprooms">
                <button className="btn btn-secondary mt-1" style={{minWidth: "150px"}}>
                    Join Room
                </button>
                </Link> 
            </div>) 
                : 
            (<div className="row mt-5" style={{justifyContent: "center"}}>
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
            </div>)
            }



        </div>
    )
}

export default PvpLobby;