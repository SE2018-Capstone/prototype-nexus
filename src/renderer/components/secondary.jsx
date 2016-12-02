import React from 'react';
import { decrement } from 'actions/counter';
import { connect } from 'react-redux';

class Secondary extends React.Component {

  static propTypes = {
    counter: React.PropTypes.number.isRequired,
    decrement: React.PropTypes.func.isRequired,
  };

  handleClick() {
    this.props.decrement();
  }

  render() {
    return (
      <div className="Secondary">
        Hello Mars!
        <button onClick={this.handleClick.bind(this)}> Click count: {this.props.counter} </button>
      </div>
    );
  }

}

export default connect((state) => ({
  counter: state.counter,
}), (dispatch) => ({
  decrement: () => dispatch(decrement()),
}))(Secondary);
