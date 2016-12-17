import React from 'react';
import SpotifyController from './spotify-controller';

export default class Main extends React.Component {
  render() {
    return (
      <div id="main">
        <SpotifyController />
      </div>
    );
  }
}
