import React from 'react';


const electron = require('electron');
const dialog = electron.remote.dialog;
export default class Main extends React.Component {

  play() {
    dialog.showMessageBox({
      type: 'info',
      message: 'Play',
      detail: 'You pressed play!',
      buttons: ['OK']
    });
  }

  stop() {
    dialog.showMessageBox({
      type: 'info',
      message: 'Stop',
      detail: 'You pressed stop!',
      buttons: ['OK']
    });
  }

  render() {
    return (
      <div id="main">
        Music Player
        <button id="play" onClick={() => this.play()} > Play </button>
        <button id="stop" onClick={() => this.stop()} > Stop </button>
      </div>
    );
  }
}
