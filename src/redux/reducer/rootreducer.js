import { combineReducers } from "redux"
import AssignmentCreateReducer from "./assignmentcreatereducer"
import AssignmentSubmitReducer from "./assignmentsubmitreducer"
import LoginReducer from "./loginreducer"
import SignupReducer from './signupreducer'
import SubjectReducer from "./subjectreducer"
import { StudentFetchReducer, TeacherFetchReducer, UserFetchReducer } from "./userfetchreducer"

const AppReducer =combineReducers({
    signup:SignupReducer,
    login:LoginReducer,
    subject:SubjectReducer,
    assignmentcreate:AssignmentCreateReducer,
    assignmentsubmit:AssignmentSubmitReducer,
    user:UserFetchReducer,
    student:StudentFetchReducer,
    teacher:TeacherFetchReducer,
})

export const RootReducer = (state, action) => {
 return AppReducer(state, action)
}