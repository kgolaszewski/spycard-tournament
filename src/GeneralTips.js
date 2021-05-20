import './App.css';
import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from 'react-router-dom';

function GeneralTips() {
    const markdown = `
# Basic Strategies & Metagame 


### ATK Output & Deckbuilding 
---
SpyCards is balanced around a simple guideline: **a player spending X TP receives X ATK**. 
So, for 8 TP you can normally play 8 ATK's worth of cards. 

The rare cards or combos that can beat this 1:1 return 
are a reliable way of dealing damage to your opponent!

Generally, decks that frequently exceed 1:1, but only by a little, 
tend to outperform decks that exceed 1:1 by a lot, but rarely. 

After all, no card or rule in SpyCards rewards you for overkill -- 
whether you win by 1 ATK or 11, you only deal 1 HP of damage.

### Cards Capable of Exceeding 1:1
---
As a general rule, the only cards able to consistently outperform 1:1 are Bosses and Minibosses.

By definition, **no Attacker card can exceed 1:1**. All Attacker cards provide exactly X ATK for X TP.

The few Effect cards that can outperform 1:1 all feature some sort of risk:
they are equally capable of **under**-performing 1:1 and cause you to take damage! 

### Length of Games & Average TP Costs 
---
Because of the reasons outlined above, two well-built decks will have trouble dealing damage to each other. 
They'll both output X ATK for X TP and tie turn after turn. 

Furthermore, healing is common and powerful enough that 
some decks can even afford a one-time early game loss of 2-3 HP.

As a result, a deck's performance at Turn 10+ tends to decide many games. 
Some questions you may want to consider during deckbuilding are:
* how many ways can my deck output 8, 9, or 10 ATK? 
* how many cards do I need to play to output 8, 9, or 10 ATK? 
* what is the worst hand I can draw on Turn 1 and 2?

### No Holding Back!
---
Also relevant for deck performance at Turn 10+: remember that **players with 0 cards draw 3**, not 2!

This makes hoarding precisely 1 card costly, since it essentially gives your opponent a 1 card drawing handicap. 
Make sure that your combo cards play well without their partners, or that the combo's reward 
is worth the trouble! 


    
`
    return (
        <div className="row mt-5 mb-5">
            <div className="col-1" style={{textAlign: "left"}}>
                <Link to="/tutoriallobby" style={{textAlign: "left"}}>
                    <button className="btn btn-primary ml-1">←</button>
                </Link>
            </div>
            <div className="offset-1 col-8">
            <ReactMarkdown>
                {markdown}
            </ReactMarkdown>
            </div>
        </div>
    )
}

export default GeneralTips;