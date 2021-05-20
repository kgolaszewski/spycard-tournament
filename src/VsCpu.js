import './App.css';
import bestiary from './SpyCards_Bestiary';
import find_best_hand from './aiLogic';
import { Link, useLocation } from "react-router-dom";

import React, { useState, useEffect } from 'react';
import {
  calc_independent_stats,
  calc_enemy_dependent_abilities,
  determine_turn_winner
} from './EvaluateCombat';

let b = bestiary

// Thuglife Cards
let [
  // eslint-disable-next-line no-unused-vars
    thief, bandit, burglar, astotheles, scarlet, king, ultimax_tank,
    // eslint-disable-next-line no-unused-vars
    chomper, chomper_brute, mother_chomper, zombeetle, belostoss, riz, spider, 
    wasp_trooper, underling, zasp, mothiva, leafbug_archer, leafbug_ninja, leafbug_clubber,
    // eslint-disable-next-line no-unused-vars
    tidal_wyrm, devourer, seedling_king, false_monarch, peacock_spider,
    // eslint-disable-next-line no-unused-vars
    mender, weevil, seedling, dune_scorpion, golden_seedling, kabbu, heavy_drone_bee,
    // eslint-disable-next-line no-unused-vars
    security_turret, krawler, warden, bee_boop, numbnail
  ] = [
    "Thief", "Bandit", "Burglar", "Astotheles", "Scarlet", "The Everlasting King", "Ultimax Tank",
    "Chomper","Chomper Brute","Mother Chomper", "Zombeetle", "Belostoss", "Riz", "Spider", 
    "Wasp Trooper", "Underling", "Zasp", "Mothiva", "Leafbug Archer", "Leafbug Ninja", "Leafbug Clubber",
    "Tidal Wyrm", "Devourer", "Seedling King", "False Monarch", "Peacock Spider",
    "Mender", "Weevil", "Seedling", "Dune Scorpion", "Golden Seedling", "Kabbu", "Heavy Drone B-33",
    "Security Turret", "Krawler", "Warden", "Bee-Boop", "Numbnail",
  ].map(e => b[e])


  // eslint-disable-next-line no-unused-vars
let thuglife = [
    thief, thief, thief, thief, bandit, bandit, bandit, bandit, 
    burglar, burglar, burglar, golden_seedling, astotheles, scarlet, ultimax_tank,
]

let thug2 = [
  thief, thief,  numbnail, numbnail, bandit, bandit, bandit, bandit, 
  burglar, burglar, burglar, golden_seedling, astotheles, scarlet, ultimax_tank,
]

// eslint-disable-next-line no-unused-vars
let starter_deck = [
  chomper, chomper, chomper, chomper, underling, underling, underling, underling, 
  wasp_trooper, wasp_trooper, wasp_trooper, wasp_trooper, zasp, mothiva, spider
]

// eslint-disable-next-line no-unused-vars
let leafthug = [
  ultimax_tank, zasp, mothiva, leafbug_archer, leafbug_archer, leafbug_archer, thief, thief, 
  leafbug_ninja, leafbug_ninja, leafbug_ninja, leafbug_clubber, leafbug_clubber, bandit, bandit,
]

// eslint-disable-next-line no-unused-vars
let degenlife = [
  mender, mender, mender, mender, krawler, krawler, krawler, krawler, 
  warden, warden, warden, warden, scarlet, dune_scorpion, heavy_drone_bee,
]

// eslint-disable-next-line no-unused-vars
let chomp = [
  chomper, chomper, chomper, chomper, chomper,  bandit, bandit, 
  chomper_brute, chomper_brute, chomper_brute, chomper_brute,
  golden_seedling, scarlet, dune_scorpion, mother_chomper,
]

// eslint-disable-next-line no-unused-vars
let chomp2 = [
  chomper, chomper, chomper, chomper, chomper, bandit, bandit, 
  chomper_brute, chomper_brute, chomper_brute, zombeetle, zombeetle, 
  scarlet, riz, mother_chomper,
]

let default_deck = starter_deck
let p1_deck = starter_deck
let p2_deck = starter_deck

function Icon(props) {
  let img_folder = process.env.PUBLIC_URL
  return (
    <img alt="" width="45px" src={`${img_folder}/spycard_imgs/${props.name}_icon.png`} />
  )
}

function VsCpu(props) {
  const location = useLocation()
  let img_folder = process.env.PUBLIC_URL
  let new_blank_stats = () => {
    return {
      "heal": 0, "lifesteal": 0, "numb": 0, "atk": 0, "def": 0, "numb_def": 0, "atk_or_def": []
    }
  }

  let jsonstring_to_deck = (jsonstring) => {
    let result = []
    let deck_list = JSON.parse(jsonstring)
    console.log(deck_list)
    for (let card of Object.keys(deck_list)) {
      for (let i=0; i < deck_list[card]; i++) {
        result = [...result, bestiary[card]]
      }
    }
    return result;
  }

  let player_selected_deck = location.state?.p1_deck

  if (player_selected_deck) { 
    if (player_selected_deck === "DefaultDeck") {
      p1_deck = default_deck
    }
    else {
      console.log("player_selected_deck", player_selected_deck)
      let localstored_deck = localStorage.getItem(`spydeck_${player_selected_deck}`)
      console.log("localstored_deck", localstored_deck)
      console.log("pre-convert")
      p1_deck = jsonstring_to_deck(localstored_deck) 
    }
  }

  let shuffle_deck = (deck) => {
    let array = deck 
    let curId = array.length;
    while (0 !== curId) {
        let randId = Math.floor(Math.random() * curId);
        curId -= 1;
        let tmp = array[curId];
        array[curId] = array[randId];
        array[randId] = tmp;
    }
    return array
  }

  // this.state
  const [initialized, setInitialized] = useState(false)
  const [turn, setTurn]   = useState(1)
  const [phase, setPhase] = useState("Main Phase")

  let tp = Math.min(10, turn + 1)

  const [p1, setP1] = useState({ 
    name: "P1", hp: 5, new_hp: 5, field: [], deck: shuffle_deck(p1_deck), hand: [], 
    summons: [], stats: new_blank_stats(), setup: [], selected: [], selected_tp: 0
  })

  const [p2, setP2] = useState({ 
    name: "P2", hp: 5, new_hp: 5, field: [], deck: shuffle_deck(p2_deck), hand: [], summons: [], 
    stats: new_blank_stats(), setup: [], selected: [], selected_tp: 0
  })

  let startNewGame = () => {
    setInitialized(false)
    setTurn(1)
    setPhase("Main Phase")
    setP1({ 
      name: "P1", hp: 5, field: [], deck: shuffle_deck(p1_deck), hand: [], 
      summons: [], stats: new_blank_stats(), setup: [], selected: [], selected_tp: 0
    })
    setP2({ 
      name: "P2", hp: 5, field: [], deck: shuffle_deck(p2_deck), hand: [], summons: [], 
      stats: new_blank_stats(), setup: [], selected: [], selected_tp: 0
    })
  }

  let draw_n_cards = (player) =>  { 
    let n = player.hand.length > 0 ? Math.min(Math.max(5 - player.hand.length, 0), 2) : 3
    let drawn_cards = player.deck.slice(0,n)
    let set_state = player.name === "P1" ? setP1 : setP2
    set_state({
      ...player,
      hand: [...player.hand, ...drawn_cards],
      field: [],
      selected: [...player.selected, ...[...new Array(n)].map(e => false)],
      selected_tp: 0,
      deck: shuffle_deck(player.deck.slice(n))
    })
  }

  let toggle_card = (player, id) => {
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

  let convert_name_to_image = (card) => {
    let image_name = card.name.toLowerCase().split(" ").join("_")
    return `${img_folder}/spycard_imgs/${image_name}.png`
  }

  let play_selected = () => {
    setPhase("Battle Phase")

    // Handle P1, human player inputs
    let played_cards = [ ...p1.hand.filter((e,i) => p1.selected[i]) ]
    setP1({
      ...p1,
      hand: [ ...p1.hand.filter((e,i) => p1.selected[i] === false) ],
      field: played_cards,
      selected: [ ...p1.hand.filter((e,i) => p1.selected[i] === false) ].map(e => false),
      deck: [...shuffle_deck([...p1.deck, ...played_cards])],
    })

    // Handle P2, CPU player inputs
    let ai_selected = find_best_hand(p2.hand, tp)
    let ai_played_cards = ai_selected.map(i => p2.hand[i])

    setP2({
      ...p2,
      hand: [ ...p2.hand.filter((e,i) => !ai_selected.includes(i)) ],
      field: ai_played_cards,
      selected: [ ...p2.hand.filter((e,i) => !ai_selected.includes(i)) ].map(e => false),
      deck: [...shuffle_deck([...p2.deck, ...ai_played_cards])],
    })

  }

  let start_battle_phase = (p1, p2) => {
    let player1 = calc_independent_stats(p1)
    let player2 = calc_independent_stats(p2)

    player1 = calc_enemy_dependent_abilities(player1, player2)
    player2 = calc_enemy_dependent_abilities(player2, player1)

    setP1({ ...player1 })
    setP2({ ...player2 })
    setPhase("End Phase")
  }

  let finish_battle_phase = () => {
    let [player_1, player_2] = determine_turn_winner(p1, p2)
    setP1({
      ...player_1, 
      field: [],
      summons: [],
      stats: {...player_1.stats, ...new_blank_stats()},
      selected_tp: 0,
    })

    setP2({
      ...player_2, 
      field: [],
      summons: [],
      stats: {...player_2.stats, ...new_blank_stats()},
    })
    setPhase("Draw Phase")
    setTurn(turn+1)
  }

  let render_enemy_card = (card) => {
    let cardtype = card.type.slice(-4) === "boss" ? card.type : "normal"
    return `${img_folder}/spycard_imgs/${cardtype}_cardback.png`
  }

  let draw_phase = () => {
    draw_n_cards(p1)
    draw_n_cards(p2)
    setPhase("Main Phase")
  }

  useEffect(() => {
    if (initialized === false) {
      draw_n_cards(p1)
      draw_n_cards(p2)
      setInitialized(true)
    }
    else {
      // console.log(p1.selected)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized])



  return (
    <div className="App row ml-0 mr-0" style={{backgroundColor: "#ababab", width: "100%"}}>
      <div className="col-1" id="left-column">
      </div>
      <div id="main-column" className="col-10">
        <div className="mt-1" id="p2-hand" style={{ minHeight: "122px" }} >
          {p2.hand.map((card, i) => (
                <img key={"p2-hand-"+i} alt="" className="mr-1" width="82px" 
                  src={render_enemy_card(card)}
                />
            ))
          }
        </div>

        <div style={{ minHeight: "155px" }} className="mt-1" id="p2-field" >
          { [...p2.field, ...p2.summons].map((card, i) => (
                <img alt="" key={"p2-field-"+i} className="mr-1"
                    width="110px" 
                    src={convert_name_to_image(card)} 
                />
            )
          )}
        </div>

        <div style={{ minHeight: "155px" }} className="mt-1" id="player1-field" >
          { ["Battle Phase", "End Phase"].includes(phase) ? 
          <div>
            { 
              [...p1.field, ...p1.summons].map((card, i) => (
                <img alt="" key={"p1-field-"+i} 
                    width="110px" 
                    className="mr-1"
                    src={convert_name_to_image(card)} 
                />)
              )
            }
          </div> : ""
          }
          { 
            ["Draw Phase"].includes(phase) ?
              ((p1.hp === 0 || p2.hp === 0) ? 
                
                p1.hp > 0 ? 
                  <div style={{minHeight: "155px"}}>
                  <p className="" style={{fontSize: "24px", marginBottom: "5px"}}>
                    <b>Congratulations!</b><br />You win!
                  </p> 
                  <button className="btn btn-primary btn-sm mt-1"
                    style={{minWidth:"150px"}}
                    onClick={() => startNewGame()}
                  >
                    Rematch!
                  </button><br />
                  <Link to="/">
                    <button className="btn btn-info btn-sm mt-1" style={{minWidth:"150px"}}>
                        Exit Room
                    </button>
                  </Link>
                  </div>
                  : 
                  <div style={{minHeight: "155px"}}>
                    <p className="" style={{fontSize: "24px", marginBottom: "5px"}}>
                      <b>GAME OVER</b><br />You lose...
                    </p>
                    <button className="btn btn-primary btn-sm"
                      style={{minWidth:"150px"}}
                      onClick={() => startNewGame()}
                    >
                      Rematch!
                    </button><br />
                    <Link to="/">
                      <button className="btn btn-info btn-sm mt-1" style={{minWidth:"150px"}}>
                          Exit Room
                      </button>
                    </Link>
                  </div>
                : "")
              : ""
          }
        </div>

        <div className="mt-1" style={{ minHeight: "155px" }} id="player1-hand" >
          { p1.hand.map((card, i) => {
            return (
              <img key={"p1-card-"+i} width="110px"
                onClick={phase === "Main Phase" ? () => toggle_card(p1, i) : ""} 
                alt=""
                className={`mr-2`}
                style={{outline: p1.selected[i] ? "3px yellow solid" : ""}}
                src={convert_name_to_image(card)} 
              />
            )
          })}
        </div>
        <div
            id="phase-action-button"
            className="mt-1"
        >
        { phase === "Main Phase" ?
        <button 
          className={
            `
              btn 
              btn-${p1.selected_tp !== 0 ? (tp >= p1.selected_tp ? "success" : "danger") : "warning"}
            `
          } 
          disabled={tp >= p1.selected_tp ? "" : "disabled"}
          onClick={() => play_selected()}
        >
          {tp >= p1.selected_tp ? 
            `Play ${p1.selected.filter(e => e).length} Selected Cards` 
            : "Insufficient TP"}
        </button>
        : ""
        }

        { phase === "Battle Phase" ?
          <button className="btn btn-info"
            style={{minWidth:"150px"}}
            onClick={() => start_battle_phase(p1, p2)}
          >
            Calculate Attack
          </button>
          : ""  
        }

        { phase === "End Phase" ?
          <button className="btn btn-outline-dark"
            style={{minWidth:"150px"}}
            onClick={() => finish_battle_phase()}
          >
            Conduct Battle Phase
            {/* End Turn {turn} */}
          </button>
          : ""  
        }

        { phase === "Draw Phase" ?
          <button 
            className={`
              btn 
              ${(p1.hp && p2.hp) ? "btn-primary" : "btn-secondary"}
            `}
            style={{minWidth:"150px"}}
            onClick={() => draw_phase()}
            disabled={(p1.hp && p2.hp) ? "" : "disabled"}
          >
            Begin Turn {turn}
          </button>
          : ""  
        }
        </div>
        <div className="mt-1">
          <Icon name="tp" /> {tp-p1.selected_tp}/{tp} TP 
        </div>
        <br/>

        <div className="row" style={{justifyContent: "center"}}>

          <button className="btn btn-danger"
              style={{minWidth:"150px"}}
              onClick={() => startNewGame()}
            >
              Start New Game
          </button>

          <Link to="/">
            <button className="btn btn-info ml-1">
                Return to Lobby
            </button>
          </Link>

        </div>


      </div>

      <div 
        id="right-column" 
        className="col-1" 
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center"
        }}>
        
        <div className="mt-1" id="p2-hand"
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "122px",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div className="" style={{
              fontSize: "16px", 
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{fontSize: "16px"}}>
              <Icon name="hp" /> {p2.hp}/5
            </div>
          </div>
        </div>

        <div className="mt-1" id="p2-field"
          style={{
            minHeight: "155px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div className="" style={{fontSize: "20px"}}>
            { p2.stats.atk ? 
              <div>
                <Icon name="atk" /> {p2.stats.atk !== Infinity ? p2.stats.atk : "∞"}
              </div> 
              : ""
            }
            <br/>
            { (p2.stats.def || p2.stats.numb_def) ? 
              <div>
                <Icon name="def" /> {p2.stats.def + p2.stats.numb_def}
              </div> 
              : ""
            }
            { (p2.stats.numb_def) ? 
              <div>
                <Icon name="numb" /> {p2.stats.numb_def}
              </div> 
              : ""
            }
          </div>
        </div>

        <div className="mt-1" style={{
            minHeight: "155px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="" style={{fontSize: "20px"}}>
            { p1.stats.atk ? 
              <div>
                <Icon name="atk" /> {p1.stats.atk !== Infinity ? p1.stats.atk : "∞"}
              </div> 
              : ""
            }
            { (p1.stats.def) ? 
              <div className="mt-1">
                <Icon name="def" /> {p1.stats.def}
              </div> 
              : ""
            }
            { (p1.stats.numb_def) ? 
              <div className="mt-2">
                <Icon name="numb" /> {p1.stats.numb_def}
              </div> 
              : ""
            }
          </div>
        </div>

        <div className="mt-1" style={{
            minHeight: "155px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="mt-2" style={{fontSize: "16px"}}>
            {/* <Icon name="tp" /> {tp}/{tp}   */}
            <Icon name="hp" /> {p1.hp}/5
          </div>
        </div>
      </div>

    </div>

  );
}

export default VsCpu;