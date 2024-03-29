import React from 'react';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect'; 
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);



/* We have access to the object `match` here bc in App.js, our /shop page
is nested in a route, and <Route/> automatically passes the 3 objects
`match`, `location`, and `history` via the props  */
/* We need to tell our route that the route name is a param (`/shop/:category`, with 
category being hats, jackets, etc.) */
class ShopPage extends React.Component { 
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match, isFetchingCollections, isCollectionsLoaded } = this.props;
    return (
      <div className='shop-page'>
        <Route 
          exact 
          path={`${match.path}`} 
          render={(props) => ( 
            <CollectionsOverviewWithSpinner 
              isLoading={isFetchingCollections} 
              {...props} 
            />
          )} 
        />
        <Route 
          path={`${match.path}/:collectionId`} 
          render={(props) => (
            <CollectionPageWithSpinner 
              isLoading={!isCollectionsLoaded} 
              {...props} 
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isFetchingCollections: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopPage);

