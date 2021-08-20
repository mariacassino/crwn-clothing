// combineReducers comes from redux library
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

/* localStorage */
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
    key: 'root',
    storage,
    /* the cartReducer is the only reducer we wanna whitelist, since 
    userReducer is already being persisted by Firebase */
    whitelist: ['cart']
};

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);







