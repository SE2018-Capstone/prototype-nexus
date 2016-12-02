import React from 'react';
import { increment } from 'actions/counter';
import { connect } from 'react-redux';

class Main extends React.Component {

  static propTypes = {
    counter: React.PropTypes.number.isRequired,
    increment: React.PropTypes.func.isRequired,
  };

  handleClick(e) {
    this.props.increment();
  }

  render() {
    return (
      <div className="Main">
        Hello World!
        <button onClick={this.handleClick.bind(this)}> Click count: {this.props.counter} </button>
      </div>
    );
  }

}

export default connect((state) => ({
  counter: state.counter,
}), (dispatch) => ({
  increment: () => dispatch(increment()),
}))(Main);
