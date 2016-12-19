import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'components/app';
import Main from 'components/main';
import PhotoController from 'components/photo-controller'
import SpotifyController from 'components/spotify-controller'
import ComputerStats from './components/computer-stats.jsx';
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
        <Route path="/photo-controller" component={PhotoController}/>
        <Route path="/spotify-controller" component={SpotifyController}/>
        <Route path="/computer-stats" component={ComputerStats}/>
      </Route>
    </Router>
), reactHost);

if (windowParams.route) {
  history.pushState(null, windowParams.route);  // Navigate to the provided route
}
