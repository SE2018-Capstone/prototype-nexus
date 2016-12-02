import React from 'react';
import DevTools from 'components/dev-tools';
import Store from 'store';
import { Provider } from 'react-redux';

export default class App extends React.Component {

  render() {
    return (
      <Provider store={Store}>
        <div>
          {this.props.children}
          <DevTools />
        </div>
      </Provider>
    );
  }

}
