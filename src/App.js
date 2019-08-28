/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';

import config from './config';

import Home from './pages/Home';
import About from './pages/About';
import Analysis from './pages/Analysis';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import NotFound from './pages/404';
import Search from './pages/Search';
import ScrollToTop from './components/ScrollToTop';

const supportedCountries = config.countries.reduce(
  (previousValue, currentValue) =>
    previousValue ? `${previousValue}|${currentValue.slug}` : currentValue.slug,
  undefined
);

/**
 * NOTE: We use redirect to ensure all urls end with `/` consistently.
 *       Otherwise `/about` and `/about/` would be treated as 2 URLs for SEO, etc.
 */
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
          <Route
            path={`/profiles/:countrySlug(${supportedCountries})`}
            component={Analysis}
          />
          <Route exact path="/search" component={Search} />
          <Route exact path="/services" component={About} />
          <Route exact path="/terms" component={Legal} />
          <Route component={NotFound} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
