import React from 'react';
import si from 'systeminformation';
import { Line, Circle } from 'rc-progress';
import Gauge from 'react-svg-gauge';

function formatGB(size) {
  return size / 1000000000;
}

export default class ComputerStats extends React.Component {
  constructor() {
    super();
    this.state = {

    };
    si.fsSize().then(devices => {
      this.setState({
        devices,
      });
    });

    si.cpu().then(cpu => this.setState({ cpu }));

    setInterval(() => {
      si.currentLoad().then(load => {
        this.setState({
          currentLoad: load.currentload,
        });
      });
    }, 1000);
  }

  renderCpu() {
    const { cpu } = this.state;
    if (!cpu) {
      return;
    }
    return (
      <div>
        CPU: {cpu.manufacturer} {cpu.brand} {cpu.speed} GHz ({cpu.cores} cores)
        <Gauge value={this.state.currentLoad && this.state.currentLoad.toFixed(0)} label='CPU Load' />
      </div>
    );
  }

  renderDevices() {
    if (!this.state.devices) {
      return (
        <div>
          Loading..
        </div>
      );
    }
    if (this.state.error) {
      return (
        <div>
          Could not get storage info
        </div>
      );
    }
    return (
      <div>
        {this.state.devices.map((device, index) => {
          let storageNumber = '';
          if (this.state.devices.length > 1) {
            storageNumber = ' ' + device.fs;
          }

          let strokeColor = undefined;
          if (device.use >= 0.85) {
            strokeColor = '#ff0000';
          }
          if (device.use <= 0.15) {
            strokeColor = '#00ff00';
          }

          return (
            <div key={index} style={{ width: '240px' }}>
              Storage{storageNumber}: {formatGB(device.size - device.used).toFixed(2)} GB free of {formatGB(device.size).toFixed(2)} GB
              <Line
                strokeColor={strokeColor}
                percent={device.use}
                strokeWidth={2}
                trailWidth={2} />
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div style={{ width: '500px', padding: '20px' }}>
        {this.renderCpu()}
        {this.renderDevices()}
      </div>
    );
  }
}
