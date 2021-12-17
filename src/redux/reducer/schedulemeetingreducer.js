import {
    SubmitMeetingScheduleSuccess,
    SubmitMeetingScheduleFailed,
    FetchMeetingScheduleSuccess,
    FetchMeetingScheduleFailed
} from '../actiontype'

const initialState = {
    submitlogs:[],
    submitstatus:null,
    fetchlogs:[],
    fetchstatus:null
}

export default function ScheduleMeetingReducer(state=initialState, action){
    switch(action.type){
        case SubmitMeetingScheduleSuccess:
            return {
                ...state,
                submitlogs:action.payload,
                submitstatus:200
            }
        case SubmitMeetingScheduleFailed:
            return {
                ...state,
                submitlogs:action.payload,
                submitstatus:400
            } 
        case FetchMeetingScheduleSuccess:
            return {
                ...state,
                fetchlogs:action.payload,
                fetchstatus:200
                }
        case FetchMeetingScheduleFailed:
            return {
                ...state,
                fetchlogs:action.payload,
                fetchstatus:400
                }      
        default:
            return state     
    }
}