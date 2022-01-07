import React from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

/* component that displays our items */
import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.scss';


const CollectionPage = ({collection}) => {
    const {params} = useParams(); 
    /* destructure off title & items properties off collection */
    const { title, items } = collection;
    // const collection = useSelector(selectCollection(params.collectionId));
    return (
        <div className='collection-page'>
            <h2 className='title'>{ title }</h2>
            <div className='items'>
                {items.map(item => (
                    <CollectionItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

/* we need to pass in the state bc unlike other selectors, this one needs a part of the state
depending on the URL param */
/* ownProps are the props of the component that we're wrapping in our connect */
/* `state` can be passed to `selectCollection(ownProps.match.params.collectionId)` bc 
`selectCollection()` is a curried function (a function that returns a function) */
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);