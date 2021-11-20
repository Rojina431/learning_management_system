import { combineReducers } from "redux"
import LoginReducer from "./loginreducer"
import SignupReducer from './signupreducer'
import SubjectReducer from "./subjectreducer"

const AppReducer =combineReducers({
    signup:SignupReducer,
    login:LoginReducer,
    subject:SubjectReducer
})

export const RootReducer = (state, action) => {
 return AppReducer(state, action)
}