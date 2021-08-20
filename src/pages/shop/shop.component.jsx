import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

/* We have access to the object `match` here bc in App.js, our /shop page
is nested in a route, and <Route/> automatically passes the 3 objects
`match`, `location`, and `history` via the props  */
/* We need to tell our route that the route name is a param (`/shop/:category`, with 
category being hats, jackets, etc.) */
const ShopPage = ( {match} ) => (
  <div className='shop-page'>
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);

export default ShopPage;

/*
{ collections.map(({id, ...otherCollectionProps}) => (
  <CollectionPreview key={id} {...otherCollectionProps} />
  ))}
*/