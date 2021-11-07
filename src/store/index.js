import { createStore } from 'redux'
import { combineReducers } from 'redux'
import users from './users'

const reducers = combineReducers({ users })
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;