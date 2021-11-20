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
                status:200
            }
        case SubjectFetchFailed:
            return{
                ...state,
                logs:action.payload,
                status:400
            }   
        default:
            return state     
    }
}