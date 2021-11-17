import {
    LoginSuccess,
    LoginFailed
} from '../actiontype'

const initialState = {
    logs:[],
    status:null
}

export default function LoginReducer(state=initialState,action){
    switch(action.type){
        case LoginSuccess:
            return{
                ...state,
                logs:action.payload,
                status:200
            }
        case LoginFailed:
            return{
                ...state,
                logs:action.payload,
                status:400
            }   
        default:
            return state     
    }
}