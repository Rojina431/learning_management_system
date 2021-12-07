import {
    UserFetchSuccess,
    UserFetchFailed,
    StudentFetchSuccess,
    StudentFetchFailed,
    TeacherFetchSuccess,
    TeacherFetchFailed
   } from '../actiontype'

const initialState = {
    user:[],
    userfetchstatus:null,
    student:[],
    studentfetchstatus:null,
    teacher:[],
    teacherfetchstatus:null
}

export const UserFetchReducer = (state=initialState, action) => {
    switch(action.type){
        case UserFetchSuccess:
            return {
                ...state,
                user:action.payload,
                userfetchstatus:200
            }
        case UserFetchFailed:
            return {
                ...state,
                user:action.payload,
                userfetchstatus:400
            }  
        default:
            return state      
    }
}

export const TeacherFetchReducer = (state=initialState, action) => {
    switch(action.type){
        case TeacherFetchSuccess:
            return {
                ...state,
                teacher:action.payload,
                teacherfetchstatus:200
            }
        case TeacherFetchFailed:
            return {
                ...state,
                teacher:action.payload,
                teacherfetchstatus:400
            } 
        default:
                return state         
    }
}

export const StudentFetchReducer = (state=initialState, action) => {
    switch(action.type){
        case StudentFetchSuccess:
            return {
                ...state,
                student:action.payload,
                studentfetchstatus:200
            }
        case StudentFetchFailed:
            return {
                ...state,
                student:action.payload,
                studentfetchstatus:400
            }  
        default:
            return state    
    }
}