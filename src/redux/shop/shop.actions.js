import ShopActionTypes from "./shop.types";

import {firestore, convertCollectionSnapshotToMap} from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());

        /* whenever the collectionRef updates or this code gets run for the first time, 
        this collectionRef will send us the snapshot respresenting the code of our `collections` object's
        array at the time this code renders. We'll want to perform some async requests bc the data is 
        on the actual objects inside the snapshot.  */
        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
    }
}