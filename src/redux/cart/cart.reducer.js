import CartActionTypes from './cart.types';
import { addItemToCart } from './cart.utils'

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // 'TOGGLE_CART_HIDDEN' is a string but we want it to be an action type, 
        // so we set the string to a constant in cart.types.js & called it on CartActionTypes below:
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            };
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                // pass in cartItems from state, and item we want to add
                cartItems: addItemToCart(state.cartItems, action.payload )
            }
        default:
            return state;
    }
}

export default cartReducer;