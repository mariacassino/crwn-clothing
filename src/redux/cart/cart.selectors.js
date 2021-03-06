import { createSelector } from 'reselect';

// input selector
const selectCart = state => state.cart;

// export selector
export const selectCartItems = createSelector(
    // first arg is array of input selectors
    [selectCart],
    // second arg is function that will return the value we want out of the selectors
    cart => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => 
        cartItems.reduce( 
            (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 
            0
        )
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => 
    cartItems.reduce( 
        (accumulatedQuantity, cartItem) => 
            accumulatedQuantity + cartItem.quantity * cartItem.price,
        0
    )
)