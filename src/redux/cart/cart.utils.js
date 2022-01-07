/* 
this const will need to be imported into cart.reducer
*/
export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id == cartItemToAdd.id 
    );

    /* 
    map through cartItems, take each cartItem, if cartItem exists, 
    basically just add 1 to it, or return the cartItem
    */
    if (existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.id == cartItemToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
    }

    /* 
    if cartItem is not found in array, return new array w/ existing cartItems, but 
    also add in `{ ...cartItemToAdd, quantity: 1}` object 
    */
    return [...cartItems, { ...cartItemToAdd, quantity: 1}];
};


/* 
this const will need to be imported into cart.reducer
*/
export const removeItemFromCart = (cartItems, cartItemToRemove) => {

    const existingCartItem = cartItems.find(
        cartItem => cartItem.id == cartItemToRemove.id 
    );

    /* 
    if there are cartItems, filter out the ones that match the id of cartItemToRemove and 
    keep the rest.
    */
    if (existingCartItem.quantity == 1) {
        /*
        `filter` keeps the items where the function returns `true`. If the id is not the one
        we want to remove, we keep the item. If it is, we want to remove the item entirely.
        */
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    /*
    if existingCartItem is greater than one and it matches cartItemToRemove's id, 
    we don't remove the entire item, we just decrease it by one
    */
    return cartItems.map(
        cartItem => 
        cartItem.id == cartItemToRemove.id ?
            {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
    )
};