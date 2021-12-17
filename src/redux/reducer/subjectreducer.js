import {
    SubjectFetchSuccess,
    SubjectFetchFailed
} from '../actiontype'

const initialState = {
    fetchlogs : [],
    status : null
}

export default function SubjectReducer(state=initialState, action){
    switch(action.type){
        case SubjectFetchSuccess:
            return{
                ...state,
                fetchlogs:action.payload,
                status:200
            }
        case SubjectFetchFailed:
            return{
                ...state,
                fetchlogs:action.payload,
                status:400
            }   
        default:
            return state     
    }
}