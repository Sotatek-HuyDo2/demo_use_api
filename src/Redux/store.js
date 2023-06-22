import { legacy_createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer.js';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;