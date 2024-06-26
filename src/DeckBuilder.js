import './App.css';
import bestiary from './SpyCards_Bestiary';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'

// let banned = ["The Everlasting King"]

let redundant = [
    "Broodmother",                              // Zommoth
    "Midge", "Zombiant",                        // Jellyshroom 
    "Security Turret",                          // Krawler 
    "Diving Spider",                            // Jumping Spider 
    "Psicorp",                                  // Thief 
    "Belostoss",                                // Ruffian 
    "Plumpling",                                // Madesphy
    "Arrow Worm", "Water Strider",              // Zombee 
    "Abomihoney", "Mantidfly", "Haunted Cloth", // Bloatshroom 
]

let awful = [
    // "The Beast", 
    "Peacock Spider", "Jumping Spider", "Mimic Spider", 
    "False Monarch", "Mothfly", "Mothfly Cluster",
    "Seedling King", "Seedling", "Underling", "Flowerling", 
    "Venus' Guardian", "Venus' Bud", "Acolyte Aria",
    // "Maki", "Kina", "Yin", 
    // "Primal Weevil",
    // "Cross", "Poi", 
    "Cenn", "Pisci",
    "Ahoneynation", 
    "Carmina", 
    "Dead Lander Beta", 
]

let coins = [
    "Acornling", "Cactiling", "Inichas", "Denmuki", "Madesphy", "Bee-Boop", "Wild Chomper",
]

let bosses     = Object.keys(bestiary)
    .filter(e => !redundant.includes(e))
    .filter(e => !awful.includes(e))
    // .filter(e => !banned.includes(e))
    .map(e => bestiary[e])
    .filter(card => card.type === "boss")

let minibosses = Object.keys(bestiary)
    .filter(e => !redundant.includes(e))
    .filter(e => !awful.includes(e))
    .map(e => bestiary[e])
    .filter(card => card.type === "miniboss")
let nonbosses  = Object.keys(bestiary)
    .filter(e => !redundant.includes(e))
    .filter(e => !awful.includes(e))
    .filter(e => !coins.includes(e))
    .map(e => bestiary[e])
    .filter(card => ["effect", "attacker"].includes(card.type))

function BackButton(props) {
    const location = useLocation()
    const origin   = location.state?.origin

    let previousView = (view) => {
        if (view === "Miniboss") { return "Boss" }
        if (view === "Nonboss") { return "Miniboss" }
        if (view === "ConfirmMenu") { return "Nonboss"}
    }
    return (
        <div>
        { props.view === "Boss" ? 
        (
        <Link to={props.origin}>
            <button className="btn btn-primary ml-1">←</button>
        </Link> 
        ) : (
        <button 
            className="btn btn-primary ml-1"
            onClick={() => props.setCurrentView(previousView(props.view))}
        >
            ←
        </button>
        )
        }
        </div>
    )
}

function BosstypeMenu(props) {
    let img_folder = process.env.PUBLIC_URL
    let name_to_img = (cardname) => {
        let image_name = cardname.toLowerCase().split(" ").join("_")
        return `${img_folder}/spycard_imgs/${image_name}.png`
    }

    return (
        <div className="row ml-3 mt-3" style={{width: "98%"}} >
        {
            props.boss_group.map(e => (
                <div className="row mt-1 ml-1 mr-4">
                    <div className="card-image pl-0">
                        <img 
                            className="mr-1" width="135px" alt="" src={`${name_to_img(e.name)}`} 
                        />
                    </div>
                    <div className="button-tower mt-4 pl-0 pr-0">
                        <button className="btn btn-dark btn-sm pl-2 pr-2"
                            onClick={() => props.change_quantity(props.group, e.name, 1, 1)} 
                        >
                                ▲
                        </button><br/>
                        <button 
                            className={`
                                btn btn-sm
                                ${props.selected[props.group][e.name] > 0 ? "btn-success" : "btn-outline-dark"}
                            `} disabled="disabled"
                            style={{width: "31px"}}
                        >
                            {props.selected[props.group][e.name]}
                        </button><br/>
                        <button 
                            className="btn btn-dark btn-sm pl-2 pr-2"
                            onClick={() => props.change_quantity(props.group, e.name, -1, 1)}
                        >
                            ▼
                        </button>
                    </div>
                </div>
            ))
        }
        </div>
    )
}

function BossMenu(props) {
    let valid = () => (Object.keys(props.selected["boss"]).reduce((sum, e) => (
        sum += props.selected["boss"][e]
    ), 0) === 1)
    
    return (
        <div className="">
            <h1 style={{textAlign: "center"}}>Boss Cards</h1> 
            <BosstypeMenu 
                boss_group={bosses} 
                group={"boss"}
                card_limit={1} 
                selected={props.selected} 
                change_quantity={props.change_quantity}
            />
            <div className="row mt-4" style={{justifyContent: "center"}}>
                <div >
                <button 
                className={`
                    btn 
                    ${valid()? "btn-success" : "btn-info"}
                    mb-5
                `}
                disabled={valid()? "" : "disabled"}
                onClick={() => props.setCurrentView("Miniboss")}
                style={{justifyContent: "center", minWidth: "200px"}}
            >
                { valid() ?
                    "Add Boss to Deck" :
                    "Please select exactly 1 Boss card."
                }
            </button>
            </div>
            </div>
        </div>
    )
}

function MinibossMenu(props) {
    let valid = () => (
        (Object.keys(props.selected["miniboss"]).reduce((sum, e) => (
            sum += props.selected["miniboss"][e]
        ), 0) === 2)
            && 
        (Object.keys(props.selected["miniboss"])
            .filter(name => props.selected["miniboss"][name] === 1)
            .length === 2)
    )
        
    
    return (
        <div>
            <h1 style={{textAlign: "center"}}>Miniboss Cards</h1> 
            <BosstypeMenu 
                boss_group={minibosses} 
                group={"miniboss"}
                selected={props.selected} 
                change_quantity={props.change_quantity}
            />
            <div className="row mt-4" style={{justifyContent: "center"}}>
            <button 
                className={`mb-5 btn 
                    ${valid()? "btn-success" : "btn-info"}
                `}
                disabled={valid()? "" : "disabled"}
                onClick={() => props.setCurrentView("Nonboss")}
                style={{minWidth: "150px"}}
            >
                { valid() ?
                    "Add Minibosses to Deck" :
                    "Please select 2 different Miniboss cards."
                }
            </button>
            </div>
        </div>
    )
}

function NonBossMenu(props) {
    let valid = () => (
        (Object.keys(props.selected["nonboss"]).reduce((sum, e) => (
            sum += props.selected["nonboss"][e]
        ), 0) === 12)
    )

    let name_to_img = (cardname) => {
        let img_folder = process.env.PUBLIC_URL
        let image_name = cardname.toLowerCase().split(" ").join("_")
        return `${img_folder}/spycard_imgs/${image_name}.png`
    }

    let remaining_selections = 12 - Object.keys(props.selected[props.group])
                                    .reduce((sum, e) => (sum += props.selected[props.group][e]), 0)

    return (
        <div style={{width: "98%"}}>
        <h1 style={{textAlign: "center"}}>Attack and Effect Cards</h1>
        <div className="row ml-3 mt-3" >
        {
            nonbosses.map((card, i) => (
                <div key={i} className="row mt-1 mr-4 ml-1">
                    <div className="card-image pl-0">
                        <img className="mr-1" 
                            width="135px"
                            alt=""
                            src={`${name_to_img(card.name)}`} 
                        />
                    </div>
                    <div className="button-tower mt-4 pl-0 pr-0">
                        <button className="btn btn-dark btn-sm pl-2 pr-2"
                            onClick={() => props.change_quantity(props.group, card.name, 1, 12)}
                        >
                            ▲
                        </button><br/>
                        <button 
                            className={`
                                btn btn-sm pl-2 pr-2
                                ${props.selected[props.group][card.name] > 0 ? 
                                    "btn-success" : "btn-outline-dark"}
                            `} disabled="disabled"
                            style={{minWidth: "32px"}}
                        >
                            {props.selected[props.group][card.name]}
                        </button><br/>
                        <button 
                            className="btn btn-dark btn-sm pl-2 pr-2"
                            onClick={() => props.change_quantity(props.group, card.name, -1, 12)}
                        >
                            ▼
                        </button>
                    </div>
                </div>
            ))
        }
        </div>
        <div>
            <div className="row mt-5 mb-5" style={{justifyContent: "center"}}>
            <button 
                    className={`
                        btn 
                        ${valid()? "btn-success" : "btn-info"}
                    `}
                    disabled={valid()? "" : "disabled"}
                    style={{minWidth: "150px"}}
                    onClick={() => props.setCurrentView("ConfirmMenu")}
                >
                    { valid() ?
                        "Submit Deck" :
                        `Please 
                            ${remaining_selections > 0 ? "select" : "remove"} ${
                            Math.abs(remaining_selections)
                        } more card${
                            Math.abs(remaining_selections) > 1?
                            "s" : ""
                        }.
                        `
                    }

                </button>
            </div>
        </div>
        </div>
    )

}

function ConfirmMenu(props) {
    let was_selected = (group, key) => (props.selected[group][key] > 0)
    let final_selection = [
        ...Object.keys(props.selected["boss"])
            .filter(e => was_selected("boss", e)).map(e => [e, props.selected["boss"][e]]),
        ...Object.keys(props.selected["miniboss"])
            .filter(e => was_selected("miniboss", e)).map(e => [e, props.selected["miniboss"][e]]),
        ...Object.keys(props.selected["nonboss"])
            .filter(e => was_selected("nonboss", e)).map(e => [e, props.selected["nonboss"][e]]),
    ]
    let final_deck = final_selection.reduce((tot, arr) => {
        tot[arr[0]] = arr[1]; 
        return tot; 
    }, {})

    let [deckname, setDeckname] = useState("")

    const save_deck = () => {
        let decks_value = localStorage.getItem("decks") ? 
            JSON.stringify([...JSON.parse(localStorage.getItem("decks")), deckname])
                : 
            JSON.stringify([deckname])
        localStorage.setItem("decks", decks_value)
        localStorage.setItem(`spydeck_${deckname}`, JSON.stringify(final_deck))
    }

    return (
        <div>
            <h1 style={{textAlign: "center"}}>Deck List</h1>
            {
                final_selection.map(e => (
                    <div className="row" style={{textAlign: "left"}}>
                        <div className="offset-5 col-2">
                            <b>{e[0]}: </b>
                        </div>
                        {e[1]}
                    </div>
                ))
            }
            <div className="row mt-5" style={{justifyContent: "center"}}>
                <input 
                    onChange={(event) => setDeckname(event.target.value)} 
                    placeholder="Enter deck name here" 
                />
                <Link to={props.origin}>
                <button className="btn btn-primary ml-1" onClick={() => { save_deck(); }} >
                    Save Deck
                </button>
                </Link>
            </div>
        </div>
    )
}

function DeckBuilder() {
    let initialSelected = {
        "boss": bosses.reduce((tot, card) => { tot[card.name] = 0; return tot; }, {}),
        "miniboss": minibosses.reduce((tot, card) => { tot[card.name] = 0; return tot; }, {}),
        "nonboss": nonbosses.reduce((tot, card) => { tot[card.name] = 0; return tot; }, {}),
    }

    let [currentView, setCurrentView] = useState("Boss")
    let [selected, setSelected] = useState(initialSelected)

    let change_quantity = (group, cardname, amount, limit) => {
        setSelected({
            ...selected,
            [group]: {
                ...selected[group],
                [cardname]: Math.max(0, Math.min(limit, selected[group][cardname] + amount)),
            }
        })
    }

    const location = useLocation()
    const origin   = location.state?.origin

    return (
        <div className="App row ml-0 mr-0">
            <div className="col-1" style={{textAlign: "left"}}>
                <BackButton setCurrentView={setCurrentView} view={currentView} origin={origin}/>
            </div>
            <div className="col-10">
            {
                currentView === "Boss" ?
                    (
                    <BossMenu 
                        selected={selected} 
                        change_quantity={change_quantity}
                        setCurrentView={setCurrentView}
                    />) :
                currentView === "Miniboss" ? 
                    (
                    <MinibossMenu 
                        selected={selected} 
                        change_quantity={change_quantity}
                        setCurrentView={setCurrentView}
                    />
                    ) : 
                currentView === "Nonboss" ? (
                    <NonBossMenu 
                        selected={selected} 
                        change_quantity={change_quantity}
                        setCurrentView={setCurrentView}
                        group={"nonboss"}
                    />
                    ) : 
                    (
                    <ConfirmMenu 
                        selected={selected} 
                        setCurrentView={setCurrentView}
                        origin={origin}
                    />
                    )
            }
            </div>
        </div>
    )
}

export default DeckBuilder;