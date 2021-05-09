import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import BaseRouter from './routes'
function App() {
  return (
    <Router>
      {/* <CustomLayout {...this.props}> */}
      <BaseRouter />
      {/* </CustomLayout> */}
    </Router>
  );
}
export default App;