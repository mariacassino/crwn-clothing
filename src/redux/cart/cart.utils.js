// this const will need to be imported into cart.reducer
export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id == cartItemToAdd.id 
    );

    // map through cartItems, take each cartItem, if cartItem exists, basically just add 1 to it, or return the cartItem
    if (existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.id == cartItemToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
    }

    // if cartItem is not found in array, return new array w/ existing cartItems, but 
    // also add in `{ ...cartItemToAdd, quantity: 1}` object
    return [...cartItems, { ...cartItemToAdd, quantity: 1}];
}