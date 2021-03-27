import React from 'react';

import './custom-button.styles.scss';

//destructure props into otherProps property, and "spread" that into our custom-button
const CustomButton = ({ children, isGoogleSignin, ...otherProps}) => (
    <button 
        className={`${isGoogleSignin ? 'google-sign-in' : ''} custom-button`}
        {...otherProps}
    >
        {children}
    </button>
);

export default CustomButton;