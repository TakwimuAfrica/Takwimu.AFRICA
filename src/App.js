/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Legal from './pages/Legal';
import NotFound from './pages/404';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/legal" component={Legal} />
          <Route
            exact
            path="/privacy"
            render={props => <Legal activeContent="privacy" {...props} />}
          />
          <Route
            exact
            path="/terms"
            render={props => <Legal activeContent="terms" {...props} />}
          />
          <Route component={NotFound} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
