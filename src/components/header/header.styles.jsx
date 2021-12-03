/* `css` below allows you to write a block of css that allows you to pass it in to const's */
/* import styled, { css } from 'styled-components'; */

import styled from 'styled-components';
import { Link } from 'react-router-dom';

/* block of css you could add into const's */
// const OptionContainerStyles = css`
//     padding: 10px 15px;
//     cursor: pointer;
// `;

export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;
`;

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

 /* you could use CSS block like this in theory: `${OptionContainerStyles}` */
export const OptionLink = styled(Link)`
    padding: 10px 15px;
    cursor: pointer;
`;