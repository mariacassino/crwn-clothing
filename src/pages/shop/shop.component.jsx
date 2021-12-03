import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

/* We have access to the object `match` here bc in App.js, our /shop page
is nested in a route, and <Route/> automatically passes the 3 objects
`match`, `location`, and `history` via the props  */
/* We need to tell our route that the route name is a param (`/shop/:category`, with 
category being hats, jackets, etc.) */
class ShopPage extends React.Component { 
  /* unsubscribe from snapshot representation of collections array that we get from Firestore after 
  fetching it from componentDidMount() */
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    /* 'collections' is the name of our collections */
    const collectionRef = firestore.collection('collections');

    /* whenever the collectionRef updates or this code gets run for the first time, 
    this collectionRef will send us the snapshot respresenting the code of our `collections` object's
    array at the time this code renders. We'll want to perform some async requests bc the data is 
    on the actual objects inside the snapshot.  */
    collectionRef.onSnapshot(async snapshot => {
      convertCollectionSnapshotToMap(snapshot);
    });
  }

  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
      </div>
    );
  }
}

export default ShopPage;

/*
{ collections.map(({id, ...otherCollectionProps}) => (
  <CollectionPreview key={id} {...otherCollectionProps} />
  ))}
*/