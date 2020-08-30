import React from 'react';
import './styles/index.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/landingpage';
import Board from './components/Board/board'

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/board" component={Board} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
