import React from 'react'

function DeckSelector(props) {
  return (
    <div className="mt-3 mb-3">
      <strong style={{fontSize: "20px"}}>Deck: </strong>
      <select 
        className="custom-select ml-1" 
        style={{width: "15%"}}
        onChange={(e) => { props.setDeck(e.target.value); sessionStorage.setItem("deck", e.target.value) }}
        defaultValue={props.deck === null ? "" : props.decklist.filter(deck => props.deck === deck)[0]}
      >
          { !props.deck ? (<option value="" disabled>Choose...</option>) : "" }
          {
            props.decklist.map((deckname, i) => (
                <option value={deckname} key={i}>
                    {deckname}
                </option>
            ))
          }
      </select>
    </div>
  )
}

export default DeckSelector;