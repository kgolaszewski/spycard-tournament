import '../CSS/App.css';
import React from 'react';
import { Link } from 'react-router-dom'

function MainLobby() {

    return (
        <div className="ml-1 mt-3" style={{textAlign: "center"}}>
            <h1 className="mb-5 page-title" style={{textAlign: "center"}}>SpyCards Online</h1> 
            <img 
                alt="SpyCards Logo"
                src={`${process.env.PUBLIC_URL}/spyLogo.png`} 
                height="250px"
                width="250px"
                className="mb-5"
            /> <br/>

            <Link to="/tutoriallobby">
                <button className="btn btn-success mt-1" style={{minWidth: "180px"}}>
                    Learn to Play!
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

export default MainLobby;