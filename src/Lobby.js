import './App.css';
import React from 'react';
import { Link } from 'react-router-dom'

function Lobby() {

    return (
        <div className="ml-1 mt-3" style={{textAlign: "center"}}>
            <h1 className="mb-5" style={{textAlign: "center"}}>SpyCards Lobby</h1> 

            <Link to="/tutoriallobby">
                <button className="btn btn-dark mt-1" style={{minWidth: "180px"}}>
                    SpyCards 101
                </button>
            </Link>
            <br />

            <Link to="/practicelobby">
                <button className="btn btn-info mt-1" style={{minWidth: "180px"}}>
                    Practice vs CPU
                </button>
            </Link>
            <br />

            <Link to="/pvplobby" >
                <button className="btn btn-primary mt-1" style={{minWidth: "180px"}}>
                    Join Unranked Lobby
                </button>
            </Link>
        </div>
    )
}

export default Lobby;