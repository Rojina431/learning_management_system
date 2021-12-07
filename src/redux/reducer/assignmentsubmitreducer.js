import {
    AssignmentSubmitSuccess,
    AssignmentSubmitFailed,
    SubmitAssignmentUpdateSuccess,
    SubmitAssignmentUpdateFailed,
    SubmitAssignmentFetchSuccess,
    SubmitAssignmentFetchFailed
} from '../actiontype'

const initialState = {
    submitlogs:[],
    fetchlogs:[],
    submitstatus:null,
    fetchstatus:null
}

export default function AssignmentSubmitReducer(state=initialState,action){
    switch(action.type){
        case AssignmentSubmitSuccess:
            return{
                ...state,
                submitlogs:action.payload,
                submitstatus:200
            } 
        case SubmitAssignmentFetchSuccess:
            return{
                ...state,
                fetchlogs:action.payload,
                fetchstatus:200
            }  
        case SubmitAssignmentUpdateSuccess:
            return{
                    ...state,
                    fetchlogs:action.payload,
                    fetchstatus:200
                }    
        case AssignmentSubmitFailed:
            return {
                ...state,
                submitlogs:action.payload,
                submitstatus:400
            } 
        case SubmitAssignmentFetchFailed:
            return {
                ...state,
                fetchlogs:action.payload,
                fetchstatus:400
            } 
        case SubmitAssignmentUpdateFailed:
            return {
                    ...state,
                    fetchlogs:action.payload,
                    fetchstatus:400
                } 
        default:
            return state             
    }
}