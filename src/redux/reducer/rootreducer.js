import { combineReducers } from "redux"
import SignupReducer from './signupreducer'

const AppReducer =combineReducers({
    signup:SignupReducer
})

export const RootReducer = (state, action) => {
 return AppReducer(state, action)
}