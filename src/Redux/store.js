// import { legacy_createStore, applyMiddleware } from 'redux';
// import rootReducer from './reducers/rootReducer.js';
// import { composeWithDevTools } from 'redux-devtools-extension'


// const store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));




import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducers/userSlice'

const store = configureStore({
    reducer: {
        user: userSlice
    },
})
export default store;