import CartActionTypes from './cart.types';
import { addItemToCart, removeItemFromCart } from './cart.utils'

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        /* 'TOGGLE_CART_HIDDEN' is a string but we want it to be an action type, 
        so we set the string to a constant in cart.types.js & called it on CartActionTypes below: */
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
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                // pass in cartItems from state, and item we want to remove
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            }
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                /* update cartItems to return a new array without any instance 
                of the item we're trying to clear away. If cartItem id does not match action.payload id
                (the item we're trying to remove), keep it. If it does match, filter it out. Filter
                returns us back anything that yields true as a new array. */
                cartItems: state.cartItems.filter(
                    cartItem => cartItem.id !== action.payload.id  
                )
            }
        default:
            return state;
    }
}

export default cartReducer;