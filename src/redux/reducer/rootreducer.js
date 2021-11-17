import { combineReducers } from "redux"
import LoginReducer from "./loginreducer"
import SignupReducer from './signupreducer'

const AppReducer =combineReducers({
    signup:SignupReducer,
    login:LoginReducer
})

export const RootReducer = (state, action) => {
 return AppReducer(state, action)
}