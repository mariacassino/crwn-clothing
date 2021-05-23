import CartActionTypes from './cart.types';

const INITIAL_STATE = {
    hidden: true
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // 'TOGGLE_CART_HIDDEN' is a string but we want it to be an action type, 
        // so we set the string to a constant in cart.types.js & called it on CartActionTypes below:
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        default:
            return state;
    }
}

export default cartReducer;