import {applyMiddleware, createStore} from 'redux'
import {RootReducer} from './reducer/rootreducer'
import thunk from 'redux-thunk'

const initialState = {}

const middleware = [thunk]

const Store = createStore(RootReducer,initialState,applyMiddleware(...middleware))
export default Store