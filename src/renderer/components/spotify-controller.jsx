import React from 'react';


const electron = require('electron');
const dialog = electron.remote.dialog;
const exec = require('child_process').exec;



export default class SpotifyController extends React.Component {
  // trackName;
  constructor() {
    super();
    this.state = {trackName: "", artist: "", album: "", albumArtworkUrl: ""};
    this.getMetadata();
  }

  openSpotify() {
    exec("osascript -e 'tell application \"Spotify\" to activate'");
  }

  play() {
    // dialog.showMessageBox({
    //   type: 'info',
    //   message: 'Play',
    //   detail: 'test',
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

  getMetadata() {
    this.getTrackName();
    this.getArtistName();
    this.getAlbumName();
    this.getAlbumArtworkUrl();
  }

  getTrackName() {
    exec("osascript -e 'tell application \"Spotify\" to return name of current track as string'", (error, stdout, stderr) => {
      console.log(stdout);
      // trackName = stdout;
      this.setState({ trackName: stdout });
    });
  }

  getArtistName() {
    exec("osascript -e 'tell application \"Spotify\" to return artist of current track as string'", (error, stdout, stderr) => {
      console.log(stdout);
      // trackName = stdout;
      this.setState({ artist: stdout });
    });
  }

  getAlbumName() {
    exec("osascript -e 'tell application \"Spotify\" to return album of current track as string'", (error, stdout, stderr) => {
      console.log(stdout);
      // trackName = stdout;
      this.setState({ album: stdout });
    });
  }

  getAlbumArtworkUrl() {
    exec("osascript -e 'tell application \"Spotify\" to return artwork url of current track as string'", (error, stdout, stderr) => {
      console.log(stdout);
      // trackName = stdout;
      this.setState({ albumArtworkUrl: stdout });
    });    
  }

  render() {
    return (
      <div id="spotify">
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

        <div id="song-metadata">
          <h3> Song Info: </h3>
          Track Name: {this.state.trackName}
          <br/>
          Artist: {this.state.artist}
          <br/>
          Album: {this.state.album}
          <webview src={this.state.albumArtworkUrl} ></webview> 
        </div>
      </div>
    );
  }
}
