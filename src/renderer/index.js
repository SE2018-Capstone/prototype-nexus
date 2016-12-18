import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'components/app';
import Main from 'components/main';
import SpotifyController from 'components/spotify-controller'
import url from 'url';
import createMemoryHistory from 'history/lib/createMemoryHistory';

const queryParams = url.parse(window.location.href, true).query;
const windowParams = queryParams.windowParams ? JSON.parse(queryParams.windowParams) : {};

const reactHost = global.document.getElementById('root');
global.document.body.appendChild(reactHost);

// Allow manually changing the url
const history = createMemoryHistory();

render((
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/main" component={Main}/>
        <Route path="/spotify-controller" component={SpotifyController}/>
      </Route>
    </Router>
), reactHost);

if (windowParams.route) {
  history.pushState(null, windowParams.route);  // Navigate to the provided route
}
