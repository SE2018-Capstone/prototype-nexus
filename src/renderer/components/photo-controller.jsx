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

  filterName(filePath) {
    console.log(filePath);
    var lastSlash = filePath.lastIndexOf("/");
    var name = filePath.substring(lastSlash+1);
    return name;
  }

  openFileView() {
    var output = dialog.showOpenDialog({
      properties: ['openFile', 'openDirectory'],
      filters: [{name: 'Images', extensions: ['jpg', 'png', 'gif']}, {name: 'All Files', extensions: ['*']}]
    });
    var name = this.filterName(output[0]);
    this.setState({ photoName: name});
    this.setState({ photoPath: output });
  }

  clearImage() {
   this.setState({photoPath: ""});
   this.setState({photoName: "" });
  }

  render() {
    return (
      <div 
        id="photoView"
        style={{
          backgroundColor: '#00cc66',
          color: '#FFFFFF',
          fontFamily: 'calibri',
          width: 400,
          height: 450,
          paddingTop: 1,
          paddingRight: 20,
          paddingLeft: 20,
          paddingBottom: 1
        }} >
        <h4> Photo Viewer </h4>
        <div id="image-view" style={{float: 'center', width: '100%'}}>
          <img src={this.state.photoPath} style={{width: 400, height: 300}} autosize="on"></img> 
        </div>
        <button id="open-spotify" onClick={() => this.openFileView()} > Select Image </button>
        <button id="clear-image" onClick={() => this.clearImage()} > Clear Image </button>
        <div id="song-data" style={{float: 'center', width: '100%'}}>
          File Name: {this.state.photoName}
        </div>
        <br/>
      </div>
    );
  }
}
