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