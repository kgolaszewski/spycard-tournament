import './App.css';
import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from 'react-router-dom';

function EffectsTutorial() {
    const markdown = `
# Types of Card Effects
---
Despite the multitude of keywords, SpyCards effects only have 4 different types of outcomes:
* **Decrease ATK** (Def, Numb)
* **Add Card to Combat** (Summon)
* **Increase HP**  (Heal, Lifesteal)
* **Increase ATK** (Empower, Unity, Pierce)

Of these, the most unintuitive is Numb, so we'll start there.

### Enemy ATK Reduction (Numb & Defense)
---

> Figuratively, "Numb N" makes it so that your opponent's N weakest Attacker cards (Green border "non-boss" cards) don't attack this turn.
They remain in play, but don't attack.

* **DEF X**: reduce your opponent's ATK by X (*cannot fall below 0 ATK*)
* **Numb N**:  gain DEF equal to the ATK of your opponent's N weakest Attacker cards
    * **Note**: Numb will target any played/non-summoned cards before it targets any summoned cards 
    * **Note**: playing two cards with "Numb 1" is equivalent to playing one card with Numb 2


### Summoning
---

* **Summon X**: play X card (add copy of X card to your played cards); do not shuffle it back into the deck after combat

### HP Gain
---

* **Heal X**: grants the player X HP, up to a maximum of 5
* **Lifesteal X**: grants the player Heal X, but only if they won the round

### ATK Gain
---

* **ATK+X**: gain X ATK
* **Pierce X**: reduce enemy DEF by X (*cannot fall below 0*)
* **Empower +X (T)**: gain X ATK for every card of tribe T you've played this round (including this card)
* **Unity (X, T)**: gain X ATK for every uniquely-named card of tribe T you've played this round (including this card) 
if this is the 1st copy of this card you've played this turn
    * **Note**: Unity is a weaker, more restricted version of Empower that discourages 
playing many copies of the same cards

#  Conditional Card Effects
---

All other keywords describe conditions for the listed effect to activate.

### If...
---

> "If" refers to three different types of conditional keywords, but if the cards you've played satisfy the criteria, then you gain the effect. The three "If" conditions are:

* **If CARD**: if you played CARD this turn, gain the effect
* **If T(X):** if you played X cards of tribe T, gain the effect
* **If ATK(X)**: if you have X ATK before DEF and Numb are applied, gain the effect

### VS (If Opponent...)
---

* **VS T(X)**: if your opponent played X cards of tribe T, gain the effect

### Coinflip
---
* **Coin (X)**: flip X coins and gain the effect for each heads flipped

### Miscellaneous Conditions
---
* **Setup(*effect*)**: gain *effect* at the start of next turn
`
    return (
        <div className="row mt-5 mb-5 ml-0 mr-0" >
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

export default EffectsTutorial;