import './App.css';
import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from 'react-router-dom';

function HowToPlay() {
const markdown = `
## Game Objective
---
The goal of each turn of SpyCards is to play a stronger hand than your opponent! 
If a player's hand is bested by their opponent's, they lose 1 HP. 
The player to deplete all of their opponent's 5 HP is the winner! 

## Hand Strength
---
Hand strength is determined by totaling the ATK value of each played card, after calculating card effects. 
Most cards provide ATK when played, but some provide other benefits:
* effects that can conditionally further increase your own ATK, 
* decrease your opponent's ATK, 
* regain your lost HP, 
* or summon reinforcements.

## Playing Cards & TP
---
What is true of all cards is that they cost TP, the game's currency, to play. 
The number on a card's top-right corner denotes its cost.

Players regain all TP at the start of their turns, so there's no need to save TP for future turns. 
The only limit on TP is the number of turns played -- 
players start with 2 TP and gain 1 each turn, up to the maximum of 10.

## Anatomy of a Turn
---
* To start, both players **draw 2 cards**. 
Players must have a **minimum of 3** and a **maximum of 5** cards in hand, 
and draw more or less to satisfy those conditons.
* Both players gain 1 Max TP (up to 10) and all TP is restored.
* They then choose the cards they wish to play, play them and apply the results of combat.
* After combat, cards are **shuffled back into the deck**. 
If you're lucky, you can draw your strongest card immediately after playing it!
* The turn ends, and this process repeats until there is a winner.

## Bosses & Minibosses
---
Every SpyCard deck features 3 especially powerful cards: 2 unique Minibosses and 1 Boss. 
They were designed to have distinct cardbacks, so you can tell if your opponent has one in their hand!

Minibosses cards have Silver cardbacks and Bosses cards have Purple cardbacks.

## Deckbuilding
---
To play, one must build a deck of exactly 15 cards:
* 1 Boss card
* 2 unique Miniboss cards
* 12 Non-Boss/Miniboss cards

Note: Your deck can include up to 12 copies of any card so long as the rules above are followed.

## Time to Practice!
---
That's it! That's all you really need to know before playing. If this is your first time, 
play a practice game against the computer using the Default Deck to get a feel for the game.

For rules lawyers and players interested in technical minutae, 
you can read a detailed explanation of all card effects: [here](/effectstutorial).
`

    return (
        <div className="row mt-5 mb-5">
            <div className="col-1" style={{textAlign: "left"}}>
                <Link to="/tutoriallobby" style={{textAlign: "left"}}>
                    <button className="btn btn-primary ml-1">←</button>
                </Link>
            </div>
            <div className="offset-1 col-8">
                <h1 className="mb-3" style={{"textAlign": "center"}}>How to Play</h1>
            <ReactMarkdown>
                {markdown}
            </ReactMarkdown>
            </div>
        </div>
    )
}

export default HowToPlay;