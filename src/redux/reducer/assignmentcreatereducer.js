import {
    AssignmentCreateSuccess,
    AssignmentCreateFailed,
    CreateAssignmentFetchSuccess,
    CreateAssignmentFetchFailed
} from '../actiontype'

const initialState = {
    createlogs:[],
    fetchlogs:[],
    createstatus:null,
    fetchstatus:null
}

export default function AssignmentCreateReducer(state=initialState,action){
    switch(action.type){
        case AssignmentCreateSuccess:
            return{
                ...state,
                createlogs:action.payload,
                createstatus:200
            } 
        case CreateAssignmentFetchSuccess:
            return{
                ...state,
                fetchlogs:action.payload,
                fetchstatus:200
            }  
        case AssignmentCreateFailed:
            return {
                ...state,
                createlogs:action.payload,
                createstatus:400
            } 
        case CreateAssignmentFetchFailed:
            return {
                ...state,
                fetchlogs:action.payload,
                fetchstatus:400
            } 
        default:
            return state             
    }
}