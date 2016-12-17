import React from 'react';

// This is used to establish global styles / wrappers
// that are common to all windows
export default class App extends React.Component {
  render() {
    return (
      <div style={{
        height: '100%',
        width: '100%',
        margin: 0,
      }}>
        {this.props.children}
      </div>
    );
  }
}
