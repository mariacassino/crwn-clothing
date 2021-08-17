import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDirectorySections } from './directory.selectors.js';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

/* we don't need access to state here, so we can just have this be a functional component instead of 
class component */
const Directory = ({sections}) => (
/*
Or to make it less verbose, instead of all these props being passed in manually,
we can "spread" them and the below function could be:
  {sections.map(({id, ...otherSectionProps}) => (
    <MenuItem key={id} {...otherSectionProps} />
  ))}
*/
  <div className='directory-menu'>
    {sections.map(({title, imageUrl, id, size, linkUrl}) => (
        <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl} />
      ))}
  </div>
);
  

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});


export default connect(mapStateToProps)(Directory);
