import { createSelector } from "reselect";
// import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    /* get all the keys, then map over that array of keys so we get the value  */
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

/* find collection.id matching the url parameter of our collection id map */
export const selectCollection = collectionUrlParam => 
createSelector(
    [selectCollections],
    (collections) => collections ? collections[collectionUrlParam] : null
);

// export const selectCollection = memoize((collectionUrlParam) =>
//   createSelector(
//     [selectCollections],
//     (collections) => collections[collectionUrlParam]
//   )
// );