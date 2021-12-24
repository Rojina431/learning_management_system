import { FetchRecordingFailed, FetchRecordingSuccess, PostRecordingFailed, PostRecordingSuccess } from "../actiontype";

const initialState = {
    fetchlogs:[],
    fetchstatus:null,
    postlogs:[],
    poststatus:null
}

export default function RecordingReducer(state = initialState , action) {
    switch(action.type){
        case FetchRecordingSuccess:
            return {
               ...state,
               fetchlogs:action.payload,
               fetchstatus:200 
            }
        case FetchRecordingFailed:
            return {
                ...state,
                fetchlogs:action.payload,
                fetchstatus:400
            } 
        case PostRecordingSuccess:
            return {
                ...state,
                 postlogs:action.payload,
                 poststatus:200
            }      
        case PostRecordingFailed:
            return {
                ...state,
                postlogs:action.payload,
                poststatus:400
            }    
        default:
            return state     
    }
}