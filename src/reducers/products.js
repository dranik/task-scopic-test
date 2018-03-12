import {INITIAL_FETCH_PRODUCTS, DELETE_PRODUCT, UPDATE_PRODUCT} from '../actions';
import _ from 'lodash';
export default function(state = {}, action) {
  switch (action.type) {
    case INITIAL_FETCH_PRODUCTS:
      return _.merge ({},state, _.keyBy(action.payload, 'id'));
    case DELETE_PRODUCT:
      return _.omit(state, action.payload);
    case UPDATE_PRODUCT:
      return { ... state, [action.payload.id]: action.payload }
    default:
      return state;
  }
}
