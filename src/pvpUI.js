import './App.css';
// import bestiary from './SpyCards_Bestiary';
import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { Link, useLocation } from "react-router-dom";

function Icon(props) {
    let img_folder = process.env.PUBLIC_URL
    return (<img alt="" width="45px" src={`${img_folder}/spycard_imgs/${props.name}_icon.png`} />)
}

function CombatStats(props) {
    return (
        <div className="" style={{fontSize: "20px"}}>
            { props.player.stats.atk || props.player.stats.atk === null ? 
            <div>
                {/* EDGE CASE: JSON.Parse will read Infinity as null */}
                <Icon name="atk" /> {props.player.stats.atk === null ? "∞" : props.player.stats.atk }
            </div> 
            : ""
            }
            { (props.player.stats.def) ? 
            <div className="mt-1">
                <Icon name="def" /> {props.player.stats.def}
            </div> 
            : ""
            }
            { (props.player.stats.numb_def) ? 
            <div className="mt-2">
                <Icon name="numb" /> {props.player.stats.numb_def}
            </div> 
            : ""
            }
        </div>
    )
}

function PvpUI() {
    const img_folder = process.env.PUBLIC_URL
    const location = useLocation()
    const user = sessionStorage.getItem("username")
    const localdeck = sessionStorage.getItem("deck") === "DefaultDeck" ? 
        '{"Numbnail":2,"Chomper":2,"Underling":4,"Wasp Trooper": 4,"Zasp":1,"Mothiva":1,"Spider":1}'
            : 
        localStorage.getItem(`spydeck_${sessionStorage.getItem("deck")}`)
    const roomId = location.state?.roomId

    let [ready, setReady] = useState(false)

    // this.state
    let [turn, setTurn]   = useState(1)
    let [phase, setPhase] = useState("Main Phase")
    let [submitted, setSubmitted] = useState(false)
    let [result, setResult] = useState("")
    let [aborted, setAborted] = useState(false)
    let [empty, setEmpty] = useState(false)

    let tp = Math.min(10, turn + 1)
    let new_blank_stats = () => ({"heal":0,"lifesteal":0,"numb":0,"atk":0,"def":0,"numb_def":0,"atk_or_def":[]})

    const [p1, setP1] = useState({ 
        name: user, hp: 5, field: [], deck: [], hand: [], 
        summons: [], stats: new_blank_stats(), setup: [], selected: [], selected_tp: 0
    })

    const [p2, setP2] = useState({ 
        name: "", hp: 5, field: [], deck: [], hand: [], summons: [], 
        stats: new_blank_stats(), setup: [], selected: [], selected_tp: 0
    })



    useEffect(() => {
        socket.emit("player-join", {
            room: roomId,
            player: user,
            deck: localdeck
        })
    
        socket.on("match-start", (data) => { 
            let [players, phase, turn] = [data.players, data.phase, data.turn]
            for (let player in players) {
                let [set_player, p] = player === user ? [setP1, p1] : [setP2, p2]
                set_player({...p, ...players[player]})
            }
            setReady(true) 
            setPhase(phase)
            setTurn(turn)
            setResult("")
            setSubmitted(false)
        })
    
        socket.on("all-moves-submitted", data => {
            let [players, phase] = [data.players, data.phase]
            for (let player in players) {
                let [set_player, p] = player === user ? [setP1, p1] : [setP2, p2]
                set_player({...p, ...players[player]})
            }
            setPhase(phase)
        })
    
        socket.on("battle-phase-result", data => {
            let [players, phase] = [data.players, data.phase]
            console.log(players)
            for (let player in players) {
                let [set_player, p] = player === user ? [setP1, p1] : [setP2, p2]
                set_player({...p, ...players[player]})
            }
            setPhase(phase)
        })
    
        socket.on("end-of-turn", data => {
            let [players, phase, turn] = [data.players, data.phase, data.turn]
            console.log(players[user])
            for (let player in players) {
                let [set_player, p] = player === user ? [setP1, p1] : [setP2, p2]
                set_player({...p, ...players[player]})
            }
            setPhase(phase)
            setTurn(turn)
        })

        socket.on("start-next-turn", data => {
            let [players, phase, status] = [data.players, data.phase, data.submitted]
            for (let player in players) {
                let [set_player, p] = player === user ? [setP1, p1] : [setP2, p2]
                set_player({...p, ...players[player]})
            }
            setPhase(phase)
            setSubmitted(status)
        })

        socket.on("game-over", winner => {
            console.log(winner)
            setResult(user === winner ? "W" : "L") 
        })

        socket.on("match-abort", () => {
            setAborted(true)
            setEmpty(true)
            console.log("match-abort detected")
        })

        socket.on("rematch-declined", () => {
            setEmpty(true)
        })

        return function cleanup() {
            socket.emit("player-disconnect")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomId, user])


    let toggle_card = (player, id) => {
        if (phase === "Main Phase") {
            setP1({
                ...player,
                hand: [...player.hand],
                selected: [
                    ...player.selected.slice(0,id), 
                    !player.selected[id], 
                    ...player.selected.slice(id+1)
                ],
                selected_tp: [
                    ...player.selected.slice(0,id), 
                    !player.selected[id], 
                    ...player.selected.slice(id+1)
                ].map((e,i) => e ? player.hand[i].cost : 0).reduce((e, sum) => (sum += e))
            })
        }
    }

    let play_selected = () => {
        socket.emit("move-submitted", {room: roomId, player: user, selected: p1.selected})
    }

    let convert_name_to_image = (card) => {
        let image_name = card.name.toLowerCase().split(" ").join("_")
        return `${img_folder}/spycard_imgs/${image_name}.png`
    }

    let render_enemy_card = (card) => {
        let cardtype = card.type.slice(-4) === "boss" ? card.type : "normal"
        return `${img_folder}/spycard_imgs/${cardtype}_cardback.png`
    }

    return (
        <div>
        { ready ?
        (<div className="App row" style={{backgroundColor: "#ababab", width: "100%"}}>
            <div className="col-1" id="left-column"></div>
        <div id="main-column" className="col-10">
            <div className="mt-1" id="p2-hand" style={{ minHeight: "122px", }} >
            {
                p2.hand.map((card, i) => (
                    <img key={"p2-hand-"+i} alt="" className="mr-1" width="82px" src={render_enemy_card(card)}/>
                ))
            }
            </div>

            <div id="p2-field" className="mt-1" style={{ minHeight: "155px", }} >
            {
                [...p2.field, ...p2.summons].map((card, i) => (
                    <img alt="" key={"p2-field-"+i} className="mr-1" width="110px" 
                        src={convert_name_to_image(card)} 
                    />
                ))
            }
            </div>

            { !result ? 
            (
            <div id="player1-field" className="mt-1" style={{ minHeight: "155px", }} >
            { ((!aborted) || (aborted && phase !== "Main Phase")) ? 
                [...p1.field, ...p1.summons].map((card, i) => (
                    <img alt="" key={"p1-field-"+i} className="mr-1" width="110px" 
                        src={convert_name_to_image(card)} 
                    />
                )) : 
                <div>
                    <p style={{fontSize: "30px"}}>
                        <b>Your opponent has disconnected.</b><br/> 
                        </p>
                    <button className="btn btn-success"
                        onClick={() => socket.emit("claim-disconnect-win", {
                            player: user,
                            room: roomId
                        })}
                    >
                        Claim Victory
                    </button>
                </div>
            }
            </div>
            ) 
                :
            (
            <div className="mt-1" style={{minHeight: "155px"}}>
                {
                result === "W" ? 
                    <p className="" style={{fontSize: "24px", marginBottom: "5px"}}>
                        <b>Congratulations!</b><br />You win!
                    </p> 
                        :
                    <p className="" style={{fontSize: "24px", marginBottom: "5px" }}>
                        <b>GAME OVER</b><br />You lose.
                    </p> 
                }
                { empty === false ?
                (
                <button 
                    className="btn btn-primary btn-sm" style={{minWidth:"150px"}} 
                    onClick={() => {socket.emit("rematch-request", {
                        room: roomId,
                        player: user,
                        deck: localdeck
                    })}}
                >
                    Request Rematch
                </button>
                ) 
                    : 
                (
                <button className="btn btn-secondary btn-sm" style={{minWidth:"150px"}} disabled="disabled">
                    Room is Empty
                </button>
                )

                }
                <br />
                <Link to="/pvplobby">
                    <button className="btn btn-info btn-sm mt-1" style={{minWidth:"150px"}}>
                        Leave Room
                    </button>
                </Link>
            </div>
            )
            }

            <div id="p1-hand" className="mt-1" style={{ minHeight: "155px", }} >
            { p1.hand.map((card, i) => {
                return (
                <img key={"p1-card-"+i} width="110px" alt="" className={`mr-2`}
                    onClick={() => toggle_card(p1, i)} 
                    style={{outline: p1.selected[i] ? "3px yellow solid" : ""}}
                    src={convert_name_to_image(card)} 
                />
                )
            })}
            </div>
            
            <div id="phase-action-button" className="mt-2" >
            { (phase === "Main Phase") && (submitted === false) && (!result) ?
            <button 
                className={`btn 
                    btn-${p1.selected_tp !== 0 ? (tp >= p1.selected_tp ? "success" : "danger") : "warning"}
                `} 
                disabled={tp >= p1.selected_tp ? "" : "disabled"}
                onClick={() => {play_selected(); setSubmitted(true)}}
                style={{minWidth: "200px"}}
            >
            {
                tp >= p1.selected_tp ? 
                    `Play ${p1.selected.filter(e => e).length} Selected Cards` 
                        : 
                    "Insufficient TP"
            }
            </button>
            : 
            <button className="btn btn-dark" disabled="disabled" style={{minWidth: "200px"}}>
                {phase !== "Main Phase" ? phase : (result ? "Game Over" : "Waiting for opponent...")}
            </button>
            }

            </div>

            <div className="mt-1">
                <Icon name="tp" /> {tp-p1.selected_tp}/{tp} TP 
            </div>
            <br/>



        </div>

        <div id="right-column" className="col-1" 
            style={{ display: "flex", flexDirection: "column", alignContent: "center" }}
        >
            
            <div className="mt-1" id="p2-hand"
                style={{
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    minHeight: "122px",
                }}
            >
                <div className="" style={{ fontSize: "16px", display: "flex", flexDirection: "column", }} >
                    <div style={{fontSize: "16px"}}>
                        <Icon name="hp" /> {p2.hp}/5
                    </div>
                </div>

            </div>

            <div className="mt-1" id="p2-field"
                style={{ minHeight: "155px",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                }}
            >
                <CombatStats player={p2} />
            </div>

            <div className="mt-1" style={{ minHeight: "155px",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                }}
            >
                <CombatStats player={p1} />
            </div>

            <div className="mt-1" style={{
                minHeight: "155px",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            }}
            >
            <div className="mt-2" style={{fontSize: "16px"}}>
                <Icon name="hp" /> {p1.hp}/5
            </div>
            </div>
        </div>

        </div>) : 
        (<div className="App mt-5">
            <h3>Waiting for second player to join...</h3>
        </div>)
        }
        </div>
    );
}

export default PvpUI;