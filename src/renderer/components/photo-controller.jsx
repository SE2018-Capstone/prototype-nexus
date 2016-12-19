import React from 'react';

const electron = require('electron');
const dialog = electron.remote.dialog;
const exec = require('child_process').exec;
const ipc = require('electron').ipcMain;
// const dialog = require('electron').dialog;


export default class PhotoController extends React.Component {
  // trackName;
  constructor() {
    super();
    this.state = {photoName: "", photoPath: ""};
  }

  openFileView() {
    var output = dialog.showOpenDialog({
      properties: ['openFile', 'openDirectory'],
      filters: [{name: 'Images', extensions: ['jpg', 'png', 'gif']}, {name: 'All Files', extensions: ['*']}]
    });
    this.setState({ photoName: output });
    this.setState({ photoPath: output });
  }

  clearImage() {
   this.setState({photoPath: ""});
   this.setState({photoName: "" });
  }

  render() {
    return (
      <div id="photoView">
        <h2> Photo Controller </h2>
        <br/>
        Application:
        <button id="open-spotify" onClick={() => this.openFileView()} > Select Folder </button>
        <button id="clear-image" onClick={() => this.clearImage()} > Clear Image </button>
        <br/>
        <div id="image-view" style={{float: 'center', width: '100%'}}>
          <img src={this.state.photoPath} style={{width: 400, height: 300}} autosize="on"></img> 
        </div>
        <div id="song-data" style={{float: 'center', width: '100%'}}>
          File Name: {this.state.photoName}
        </div>
      </div>
    );
  }
}
