import React from 'react';


const electron = require('electron');
const dialog = electron.remote.dialog;
const exec = require('child_process').exec;
export default class Main extends React.Component {
  openSpotify() {
    exec("osascript -e 'tell application \"Spotify\" to activate'");
  }

  play() {
    // dialog.showMessageBox({
    //   type: 'info',
    //   message: 'Play',
    //   detail: 'You pressed play!',
    //   buttons: ['OK']
    // });
    // exec("osascript -e 'tell application \"System Events\" to keystroke space using command down'");
    exec("osascript -e 'if application \"Spotify\" is running then tell application \"Spotify\" to play'");
  }

  pause() {
    // dialog.showMessageBox({
    //   type: 'info',
    //   message: 'Pause',
    //   detail: 'You pressed pause!',
    //   buttons: ['OK']
    // });
    exec("osascript -e 'if application \"Spotify\" is running then tell application \"Spotify\" to pause'");
  }

  prevTrack() {
    exec("osascript -e 'if application \"Spotify\" is running then tell application \"Spotify\" to previous track'");
  }

  nextTrack() {
    exec("osascript -e 'if application \"Spotify\" is running then tell application \"Spotify\" to next track'");
  }

  quitSpotify() {
    exec("osascript -e 'if application \"Spotify\" is running then tell application \"Spotify\" to quit'");
  }

  render() {
    return (
      <div id="main">
        <h2> Spotify Controller </h2>
        <br/>
        Application:
        <button id="open-spotify" onClick={() => this.openSpotify()} > Open Spotify </button>
        <button id="close-spotify" onClick={() => this.quitSpotify()} > Quit Spotify </button>
        <br/>
        Controls:
        <button
          id="rewind"
          onClick={() => this.prevTrack()}
          style={{
            background: "url('../res/rewind-button.png')",
            width: 40,
            height: 40,
            backgroundSize: '100%'
          }}
        />
        <button
          id="play"
          onClick={() => this.play()}
          style={{
            background: "url('../res/play-button.png')",
            width: 40,
            height: 40,
            backgroundSize: '100%'
          }}
        />
        <button
          id="pause"
          onClick={() => this.pause()}
          style={{
            background: "url('../res/pause-button.png')",
            width: 40,
            height: 40,
            backgroundSize: '100%'
          }}
        />
        <button
          id="fast-forward"
          onClick={() => this.nextTrack()}
          style={{
            background: "url('../res/fast-forward-button.png')",
            width: 40,
            height: 40,
            backgroundSize: '100%'
          }}
        />
      </div>
    );
  }
}
