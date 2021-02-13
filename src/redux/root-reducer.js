import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import headerReducer from './header/header.reducer'
import userReducer from './user/user.reducer'
import shopReducer from './shop/shop.reducer'
import cartReducer from './cart/cart.reducer';
import messagesReducer from './messages/messages.reducer'
import modalReducer from './modal/modal.reducer'
import profileReducer from './profile/profile.reducer'


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user','shop','profile','cart']
}

const rootReducer = combineReducers({
    header: headerReducer,
    user: userReducer,
    shop: shopReducer,
    cart: cartReducer,
    messages: messagesReducer,
    modal: modalReducer,
    profile: profileReducer
})

export default persistReducer(persistConfig, rootReducer)