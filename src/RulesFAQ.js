import './App.css';
import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from 'react-router-dom';

function EffectsTutorial() {
    const markdown = `
# Frequently Asked Questions



## Differences with Bug Fables?
---
##### **Q**: Why doesn't this card's text match the in-game card text?

**A**: As of Bug Fables Update 1.1, all cards on this site accurately reflect all in-game card effects. 
Note: instead of transforming, Carmina *summons* a random miniboss.
However, Carmina has 0 ATK and no type, so both effects have the same result.

By contrast, some in-game cards do not accurately reflect their in-game effects:
* **General Ultimax**: has Empower, not Unity
* **Mender**: requires Bots(5), not Bots(4)

##### **Q**: Why isn't the Wasp King a Wasp?

**A**: He isn't a Wasp in-game either. In-game dialogue implies the Wasp King is 
not actually a Wasp but a Mimic Fly. 

##### **Q**: Why isn't the Broodmother a Midge?
**A**: Because she isn't a Midge in-game either. Why? ¯\\\\_ (ツ)_/¯

##### **Q**: Why does Numb only affect my opponent's weakest Attackers, not the front N Attackers?

**A**: Numb N matches the behavior of Bug Fables' Numb. 
However, this game client auto-sorts played cards by ATK value, so the only time
the 'weakest N attackers' shortcut doesn't match involves summoned cards. 




## Effect Interactions
---
##### **Q**: If my card gets Numbed, does it still count towards card effects like Empower or Unity?

**A**: Yes. A numbed Attacker has 0 ATK but remains in play.

##### **Q**: If I play Monsieur Scarlet and a Burglar, but my Burglar gets numbed, do I still get to heal?

**A**: Yes. Numb and Defense are applied last, after any "If ATK(X)" effects.

##### **Q**: Do Empower cards count themselves if they are members of the listed tribe?

**A**: Yes. Empower (and Unity) initiators count towards their own effect.

##### **Q**: Do I count my opponent's cards towards "If" effects or Empower/Unity?

**A**: No, only count cards **you** played this turn.
The only card effects that acknowledge your opponent's cards are **Numb**, **Pierce** and **VS**.

##### **Q**: 

**A**: 
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

export default EffectsTutorial;