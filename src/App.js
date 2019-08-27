/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import NotFound from './pages/404';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ScrollToTop>
        <Switch>
          <Route
            exact
            strict
            path="/:url*"
            // eslint-disable-next-line react/prop-types
            render={props => <Redirect to={`${props.location.pathname}/`} />}
          />
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/faqs" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/legal" component={Legal} />
          <Route exact path="/methodology" component={About} />
          <Route exact path="/privacy" component={Legal} />
          <Route exact path="/services" component={About} />
          <Route exact path="/terms" component={Legal} />
          <Route component={NotFound} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
