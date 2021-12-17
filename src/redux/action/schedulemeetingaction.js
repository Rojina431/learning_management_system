import {
    SubmitMeetingScheduleSuccess,
    SubmitMeetingScheduleFailed
} from '../actiontype'
import axios from 'axios'

export const SubmitMeetingSchedule = (token, body) => async(dispatch) => {
   try {
      const response = await axios.post('http://localhost:8000/api/meeting/', body,  {headers:{'Authorization':`Bearer ${token}`}})
      dispatch({
         type:SubmitMeetingScheduleSuccess,
         payload:response
      })
   } catch (err) {
   dispatch({
      type:SubmitMeetingScheduleFailed,
      payload:err.response
   })
   }
}