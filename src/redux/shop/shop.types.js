/* updating from a simple UPDATE_COLLECTIONS action call bc we were handling all the asynchronous activity in shop.component's 
`componentDidMount` action, but now we wanna set multiple states our shop actions could be in as far as fetching the async
data. */
const ShopActionTypes = {
    /* tells Redux we're starting to fetch the data; our first API call  */
    FETCH_COLLECTIONS_START: 'FETCH_COLLECTIONS_START',
    /* the data successfully comes back to us */
    FETCH_COLLECTIONS_SUCCESS: 'FETCH_COLLECTIONS_SUCCESS',
    FETCH_COLLECTIONS_FAILURE: 'FETCH_COLLECTIONS_FAILURE'
};

export default ShopActionTypes;