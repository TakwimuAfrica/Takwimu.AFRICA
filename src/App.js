/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import NotFound from './pages/404';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/faqs" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/legal" component={Legal} />
          <Route exact path="/privacy" component={Legal} />
          <Route exact path="/terms" component={Legal} />
          <Route component={NotFound} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
