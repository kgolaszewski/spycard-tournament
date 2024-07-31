import React from 'react';
import { Routes, Route } from 'react-router-dom';

import DeckBuilder from './DeckBuilder'
import PvpRooms from './PvpRooms'

import VsCpu from './VsCpu'
import VsPlayer from './VsPlayer'

import EffectsTutorial from './Tutorials/EffectsTutorial';
import HowToPlay from './Tutorials/HowToPlay';
import GeneralTips from './Tutorials/GeneralTips';
import RulesFAQ from './Tutorials/RulesFAQ';

import MainLobby from './Lobbies/MainLobby'
import PvpLobby from './Lobbies/PvpLobby'
import TutorialLobby from './Lobbies/TutorialLobby';
import CpuLobby from './Lobbies/CpuLobby';

// const Hoc = props => props.children;

const BaseRouter = () => (
    <Routes>
        <Route exact path="/deckbuilder" element={<DeckBuilder/>} />
        <Route exact path="/pvprooms" element={<PvpRooms/>} />

        <Route exact path="/vs" element={<VsCpu/>} />
        <Route exact path="/pvpvs" element={<VsPlayer/>} />

        <Route exact path="/effectstutorial" element={<EffectsTutorial/>} />
        <Route exact path="/howtoplay" element={<HowToPlay/>} />
        <Route exact path="/generaltips" element={<GeneralTips/>} />
        <Route exact path="/faq" element={<RulesFAQ/>} />
        
        <Route exact path="/" element={<MainLobby/>} />
        <Route exact path="/pvplobby" element={<PvpLobby/>} />
        <Route exact path="/tutoriallobby" element={<TutorialLobby/>} />
        <Route exact path="/practicelobby" element={<CpuLobby/>} />
    </Routes>
)

export default BaseRouter;