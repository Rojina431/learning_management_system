import {
    SubmitMeetingScheduleSuccess,
    SubmitMeetingScheduleFailed
} from '../actiontype'

const initialState = {
    submitlogs:[],
    submitstatus:null
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
        default:
            return state     
    }
}