import {
    SignupSuccess,
    SignupFailed
} from '../actiontype'

const initialState = {
    logs:[],
    status:null
}

export default function SignupReducer(state=initialState,action){
    switch(action.type){
        case SignupSuccess:
            return{
                ...state,
                logs:action.payload,
                status:200
            }
        case SignupFailed:
            return{
                ...state,
                logs:action.payload,
                status:400
            } 
        default:
            return state       
    }
}