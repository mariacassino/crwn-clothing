import React from 'react'
import { withRouter } from 'react-router-dom'

import './menu-item.styles.scss';

const MenuItem = ({title, imageUrl, size, history, linkUrl, match}) => (
  // this onclick pushes history to some URL
  <div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
    <div
      className='background-image'
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    />
    <div className='content'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <span className='subtitle'>SHOP NOW</span>
    </div>
  </div>

);

// withRouter will return us a superpowered MenuItem component with access to
// location, match, and history props
export default withRouter(MenuItem);
