import {combineReducers} from 'redux';
import cart from './cart/reducer';
import userReducer from './user/userReducer';
import orderReducer from './user/orderReducer';
import addressReducer from './user/addressReducer';

const allReducer = combineReducers({
    cart: cart,
    user: userReducer,
    order: orderReducer,
    addresses: addressReducer
});

export default allReducer;