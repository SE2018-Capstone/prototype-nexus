import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';

export default function counter(count = 0, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return count + 1;
    case DECREMENT_COUNTER:
      return count - 1;
    default:
      return count;
  }
}
