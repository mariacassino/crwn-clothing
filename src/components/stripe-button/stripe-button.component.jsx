import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    /* Stripe deals in cents, so price needs to be multiplied by 100 */
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_51JXWcXEPnbNkBsMtSkolGqejSA9GwAkzASSSnFX4idqVRvNII6eqWjU2YUHOGTeW97mbKnZ3Ou1waLrOCcHt412X00wtDPmgxb"

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;