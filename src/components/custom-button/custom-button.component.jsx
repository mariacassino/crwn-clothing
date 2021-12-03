import React from 'react';

import { CustomButtonContainer } from './custom-button.styles.jsx';

//destructure props and "spread" that into our custom-button
const CustomButton = ({ children, ...props }) => (
    <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomButton;