import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


import { toggleCartHidden } from '../../redux/cart/cart.actions';

import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ( {toggleCartHidden, itemCount} ) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{itemCount}</span>
    </div>
);

// hide or un-hide shopping cart icon
const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

// when user clicks to add more items to cart, add more to cart icon number
const mapStateToProps = createStructuredSelector({
    // this passes state to selectCartItemsCount, which references selectCartItems, which 
        // references selectCartItems, which references selectCart
    itemCount: selectCartItemsCount
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartIcon);