import React from 'react';

const exec = require('child_process').exec;

export default class SpotifyController extends React.Component {
  constructor() {
    super();
    this.songCheckTimer = null;
    this.state = {trackName: "", artist: "", album: "", albumArtworkUrl: ""};
    this.getMetadata();
    this.checkForNewSong();
  }

  openSpotify() {
    exec("osascript -e 'tell application \"Spotify\" to activate'");
    this.stopTimer();
    this.checkForNewSong();
  }

  quitSpotify() {
    this.stopTimer();
    exec("osascript -e 'if application \"Spotify\" is running then tell application \"Spotify\" to quit'");
  }

  play() {
    exec("osascript -e 'if application \"Spotify\" is running then tell application \"Spotify\" to play'");
    this.stopTimer();
    this.checkForNewSong();
  }

  pause() {
    exec("osascript -e 'if application \"Spotify\" is running then tell application \"Spotify\" to pause'");
  }

  prevTrack() {
    exec("osascript -e 'if application \"Spotify\" is running then tell application \"Spotify\" to previous track'");
    setTimeout(() => this.getMetadata(), 200);
  }

  nextTrack() {
    exec("osascript -e 'if application \"Spotify\" is running then tell application \"Spotify\" to next track'");
    setTimeout(() => this.getMetadata(), 200);
  }

  //TODO try and combine everything into one applescript call
  getMetadata() {
    this.getTrackName();
    this.getArtistName();
    this.getAlbumName();
    this.getAlbumArtworkUrl();
  }

  getTrackName() {
    exec("osascript -e 'tell application \"Spotify\" to return name of current track as string'", (error, stdout, stderr) => {
      console.log(stdout);
      this.setState({ trackName: stdout });
    });
  }

  getArtistName() {
    exec("osascript -e 'tell application \"Spotify\" to return artist of current track as string'", (error, stdout, stderr) => {
      console.log(stdout);
      this.setState({ artist: stdout });
    });
  }

  getAlbumName() {
    exec("osascript -e 'tell application \"Spotify\" to return album of current track as string'", (error, stdout, stderr) => {
      console.log(stdout);
      this.setState({ album: stdout });
    });
  }

  getAlbumArtworkUrl() {
    exec("osascript -e 'tell application \"Spotify\" to return artwork url of current track as string'", (error, stdout, stderr) => {
      console.log(stdout);
      this.setState({ albumArtworkUrl: stdout });
    });    
  }

  checkForNewSong() {
    exec("osascript -e 'tell application \"Spotify\" to return player position as real'", (error, stdout, stderr) => {
      // console.log(stdout);
      if (stdout <= 1.0) {
        this.getMetadata();
      }
      this.songCheckTimer = setTimeout(() => this.checkForNewSong(), 500);
    });
  }

  stopTimer() {
    if (this.songCheckTimer !== null) {
      clearTimeout(this.songCheckTimer);
    }
    this.songCheckTimer = null;
  }

  render() {
    return (
      <div
        id="spotify"
        style={{
          backgroundColor: '#141414',
          color: '#FFFFFF',
          fontFamily: 'arial',
          width: 500,
          height: 350,
          paddingTop: 1,
          paddingTop: 20,
          paddingLeft: 20,
          paddingBottom: 20
        }} >

        <div id="title-container" style={{fontSize: 30, fontWeight: 'bold'}} >
          <img src="../res/spotify-logo.png" style={{width: 25, height: 25, paddingRight: 7}} />
          Spotify Controller
        </div>
        <div id="controls" style={{textAlign: 'center'}} >
          <p style={{paddingTop: 15}} >
            <button id="open-spotify" onClick={() => this.openSpotify()} > Open Spotify </button>
            <button id="close-spotify" onClick={() => this.quitSpotify()} > Quit Spotify </button>
          </p>
          <p style={{paddingBottom: 15}} >
            <button
              id="rewind"
              onClick={() => this.prevTrack()}
              style={{
                background: "url('../res/rewind-button.png')",
                width: 40,
                height: 40,
                backgroundSize: '100%',
                backgroundColor: '#FFFFFF'
              }}
            />
            <button
              id="play"
              onClick={() => this.play()}
              style={{
                background: "url('../res/play-button.png')",
                width: 40,
                height: 40,
                backgroundSize: '100%',
                backgroundColor: '#FFFFFF'
              }}
            />
            <button
              id="pause"
              onClick={() => this.pause()}
              style={{
                background: "url('../res/pause-button.png')",
                width: 40,
                height: 40,
                backgroundSize: '100%',
                backgroundColor: '#FFFFFF'
              }}
            />
            <button
              id="fast-forward"
              onClick={() => this.nextTrack()}
              style={{
                background: "url('../res/fast-forward-button.png')",
                width: 40,
                height: 40,
                backgroundSize: '100%',
                backgroundColor: '#FFFFFF'
              }}
            />
          </p>
        </div>

        <div id="song-metadata">
          <h3> Song Info: </h3>
          <div id="album-art" style={{float: 'left', width: '30%'}}>
            <webview src={this.state.albumArtworkUrl} style={{width: 120, height: 120}} />
          </div>
          <div id="song-data" style={{float: 'right', width: '70%'}}>
            Track Name: {this.state.trackName}
            <br/>
            Artist: {this.state.artist}
            <br/>
            Album: {this.state.album}
          </div>
          <br style={{clear: 'both'}} />
        </div>
      </div>
    );
  }
}
