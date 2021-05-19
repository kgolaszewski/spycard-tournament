import './App.css';
import React from 'react';
import { Link } from 'react-router-dom'

function TutorialLobby() {
    return (
        <div className="ml-1 mt-3" style={{textAlign: "center"}}>

            <div className="row">
                <div  className="col-1" style={{textAlign: "left"}}>
                    <Link to="/" style={{textAlign: "left"}}>
                        <button className="btn btn-primary ml-1">←</button>
                    </Link>
                </div>
            
                <div className="col-10" style={{textAlign: "center"}}>
                    <h1 className="mb-5" style={{textAlign: "center"}}>SpyCards 101</h1> 
                    <Link to="/howtoplay">
                    <button className="btn btn-info mt-1" style={{minWidth: "180px"}}>
                        1. Learn the Rules
                    </button>
                    </Link>

                    <br />
                    <Link to="/generaltips">
                    <button className="btn btn-info mt-1" style={{minWidth: "180px"}}>
                        2. General Advice
                    </button>
                    </Link>

                    <br />
                    <Link to="/effectstutorial">
                    <button className="btn btn-info mt-1" style={{minWidth: "180px"}}>
                        3. Effect Keywords
                    </button>
                    </Link>

                    <br />
                    <Link to="/faq">
                    <button className="btn btn-info mt-1" style={{minWidth: "180px"}}>
                        4. F.A.Q.
                    </button>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default TutorialLobby;