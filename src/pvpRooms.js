import './App.css';
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Link } from "react-router-dom";
import {socket} from './socket';

function PvpRooms() {

    let [rooms, setRooms] = useState([])

    useEffect(() => {
        socket.emit("view-rooms", "")
        socket.on("room-list-sent", all_rooms => {
            console.log(all_rooms)
            setRooms([...all_rooms])
        })
        socket.on("room-created", all_rooms => {
            console.log("room-created detected")
            setRooms([...all_rooms])
        })
        socket.on("room-joined", all_rooms => {
            setRooms([...all_rooms])
        })
    }, [])

    return (
        <div className="mt-3" style={{textAlign: "center"}}>
            <h1 className="mb-5" style={{textAlign: "center"}}>Room List</h1> 
            <div>
            {
                rooms.map(e => (
                    <div className="mt-1">
                    <Link to= {{pathname: "/pvpvs", state: { roomId: e} }} >
                    <button 
                        className="btn btn-outline-dark" 
                        style={{minWidth: "500px"}}
                        key={e}
                        onClick={() => {
                            socket.emit(
                                "join-room", 
                                {
                                    "room": e,
                                    "user": sessionStorage.getItem("username")
                                }
                            )
                        }}
                    >
                        Join Room: {e}
                    </button>
                    </Link>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default PvpRooms;