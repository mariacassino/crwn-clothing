import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
});

// function that gets the item to add it to cartItems array in cart.reducer, and returns new
//  actiontype object, where the type is CartActionTypes.ADD_ITEM, and the payload is equal to the item
export const addItem = item  => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
})

export const removeItem = item => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: item
})

// action that dispatches CLEAR_ITEM_FROM_CART
export const clearItemFromCart = item => ({
    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item
})