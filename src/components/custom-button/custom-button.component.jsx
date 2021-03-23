import React from 'react';

import './custom-button.styles.scss';

//destructure props into otherProps property, and "spread" that into our custom-button
const CustomButton = ({ children, ...otherProps}) => (
    <button className='custom-button' {...otherProps}>
        {children}
    </button>
);

export default CustomButton;