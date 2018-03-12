import { combineReducers } from 'redux';
import products from './products';
import { reducer as formReducer } from 'redux-form';


const rootReducer = combineReducers({
  products,
  form: formReducer
});

export default rootReducer;
