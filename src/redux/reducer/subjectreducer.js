import {
    SubjectFetchSuccess,
    SubjectFetchFailed
} from '../actiontype'

const initialState = {
    logs : [],
    status : null
}

export default function SubjectReducer(state=initialState, action){
    switch(action.type){
        case SubjectFetchSuccess:
            return{
                ...state,
                logs:action.payload,
                status:action.payload.status
            }
        case SubjectFetchFailed:
            return{
                ...state,
                logs:action.payload,
                status:action.payload.status
            }   
        default:
            return state     
    }
}