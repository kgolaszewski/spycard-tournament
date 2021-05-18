import React from 'react';
import { 
    Route, 
    // Redirect 
} from 'react-router-dom';
import Lobby from './Lobby'
import VsCpu from './VsCpu'
import DeckBuilder from './DeckBuilder'
import PvpLobby from './pvpLobby'
import PvpRooms from './pvpRooms'
import PvpUi from './pvpUI'
import EffectsTutorial from './EffectsTutorial';
import HowToPlay from './HowToPlay';

const Hoc = props => props.children;

const BaseRouter = () => (
    <Hoc>
        <Route exact path="/deckbuilder" component={DeckBuilder} />
        <Route exact path="/vs" component={VsCpu} />
        <Route exact path="/" component={Lobby} />
        <Route exact path="/pvplobby" component={PvpLobby} />
        <Route exact path="/pvprooms" component={PvpRooms} />
        <Route exact path="/pvpvs" component={PvpUi} />
        <Route exact path="/effectstutorial" component={EffectsTutorial} />
        <Route exact path="/howtoplay" component={HowToPlay} />
    </Hoc>
)

export default BaseRouter;