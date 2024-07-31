import bestiary from './SpyCards_Bestiary';

/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/
Array.prototype.sum            = function() { return this.reduce((e, sum) => (sum += e), 0) }
Array.prototype.nonnull        = function() { return this.filter(e => e) }
Array.prototype.find_abilities = function(keyword) { return this.map(e => e[keyword]).nonnull() }

let set = (arr) => { return arr.filter((e,i) => arr.indexOf(e) === i) }

const k_combinations = (arr, k) => {
    let i, j, combs, head, tailcombs
    if (k > arr.length || k <= 0) { return [] }
    if (k === arr.length) { return [arr] }
    if (k === 1) { return arr.map(e => [e]) }
    combs = [];
    for (i = 0; i < arr.length - k + 1; i++) {
        head = arr.slice(i, i+1);
        tailcombs = k_combinations(arr.slice(i + 1), k - 1);
        for (j = 0; j < tailcombs.length; j++) { combs.push(head.concat(tailcombs[j])); }
    }
    return combs
}

let coin_atk_ev = {
    "Acornling": 3*0.99*0.5,
    "Cactiling": 4*0.99*0.5,
    "Plumpling": 6*0.99*0.5,
    "Inichas":   2*0.99*0.5,
    "Madesphy":  3*0.99*0.5 + 3*0.99*0.5,
    "Wild Chomper": 1,
    "Ahoneynation": 4*0.5+4*0.5,
    "Acolyte Aria": 0,
    "Bee-Boop": 0.95,
    "Wasp Bomber": 0.5,
    "Denmuki": 0,
}

let summon_atk_ev = {
    "Watcher": 5,
    "Spider": 1+coin_atk_ev["Inichas"],
}

let total_tp = (hand) => ( hand.map(card => card.cost).sum() )


const calc_empower = (card, field) => {
    let empower = card.abilities.empower
    return empower.gain * field.filter(card => card.tribe.includes(empower.ally)).length
}

const calc_unity = (field) => {
    let unity_gain = 0
    let abilities = field.map(e => e.abilities).nonnull()
    let unity_abilities = abilities.find_abilities("unity")
    let unique_initiators = unity_abilities.map(e => e.initiator)
    let unique_unity = unique_initiators.map(e => bestiary[e].abilities.unity)


    for (let unity of unique_unity) {
        let num_unique_allies = set(field.filter(e => e.tribe === unity.ally).map(e => e.name))
        unity_gain += unity["gain"] * num_unique_allies
    }
    return unity_gain
}

const calc_combo = (field) => {
    let combo_gain = 0 
    let abilities = field.map(e => e.abilities).nonnull()
    let combo_abilities = abilities.find_abilities("combo")

    for (let combo of combo_abilities) {
        if (field.map(e => e.name).includes(combo.card) && combo.effect.stat.includes("atk")) {
            // console.log("Combo found in hand")
            combo_gain += combo.effect.amount
        }
    }
    return combo_gain
}

const calc_expected_atk = (hand) => {
    let expected_atk = hand.map(e => e.atk).nonnull().sum()

    let field = hand
    let names_in_hand = hand.map(card => card.name)
    // if (hand.includes(tidal_wyrm)) { expected_atk += 4 }
    if (names_in_hand.includes("Zasp"))    { expected_atk -= 0.01}
    if (names_in_hand.includes("Mothiva")) { expected_atk -= 0.01}
    if (names_in_hand.includes("Astotheles")) { expected_atk -= 0.01}
    if (names_in_hand.includes("Ultimax Tank")) { expected_atk -= 0.01}
    if (names_in_hand.includes("Devourer")) { expected_atk += 0.01}
    if (names_in_hand.includes("Weevil"))   { expected_atk += 0.01}
    if (names_in_hand.includes("Scarlet") && (total_tp(hand) < 7)) { expected_atk -= 0.01}

    let abilities = field.map(e => e.abilities).nonnull();
    if (!abilities) { return expected_atk }

    expected_atk += calc_unity(field)
    expected_atk += calc_combo(field)

    let ability_cards = hand.filter(card => card.abilities)
    for (let card of ability_cards) {
        // eslint-disable-next-line no-restricted-globals
        if (card.name in coin_atk_ev) {expected_atk += coin_atk_ev[card.name]}
        // eslint-disable-next-line no-restricted-globals
        if (card.name in summon_atk_ev) { expected_atk += summon_atk_ev[card.name] }

        // handle Empower Cards 
        if ("empower" in card.abilities) {
            expected_atk += calc_empower(card, field)
            // handle Empower && Summon interactions
            if (card.name === "Mother Chomper" && field.map(card => card.name).includes("Wild Chomper")) {
                expected_atk += field.filter(e => e.name === "Wild Chomper").length*0.5
            }
        }
    }
    return expected_atk
}

const find_best_hand = (hand, tp) => {
    // console.log("P2 Hand:", hand)
    let hand_by_index = hand.map((e,i) => i)

    let best_hand = []
    let playable_hands = []

    let playable_cards = hand.filter(card => card.cost <= tp)
    if (!playable_cards) {return []}

    let hand_size = hand.length
    while (hand_size > 0) {
        let combos = k_combinations(hand_by_index, hand_size)
        // console.log("combos", combos)
        let playable_combos = combos.filter(
            combo => total_tp(combo.map(i => hand[i])) <= tp
        )

        // console.log("aiLogic", "playable_combos", playable_combos, "total_tp", 
        //     playable_combos.map(index_hand => total_tp(index_hand.map(i => hand[i])))
        // )

        for (let combo of playable_combos) { 
            playable_hands = [...playable_hands, combo]
        }

        hand_size -= 1
    }

    let best_atk = 0
    for (let candidate of playable_hands) {

        let expected_atk = calc_expected_atk(candidate.map(i => hand[i]))
        if (expected_atk > best_atk) {
            best_atk = expected_atk
            best_hand = candidate
        }
    }
    return best_hand

}

export default find_best_hand;