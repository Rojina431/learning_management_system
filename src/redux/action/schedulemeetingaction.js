import {
    SubmitMeetingScheduleSuccess,
    SubmitMeetingScheduleFailed,
    FetchMeetingScheduleSuccess,
    FetchMeetingScheduleFailed
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

export const FetchMeetingSchedule = (token, teacher = 0, subject = 0) => async(dispatch) => {
   try {
    let url = ""
    if (teacher !== 0 && subject !== 0) {
       url = `?teacher_created=${teacher}&meeting_subject=${subject}`
    }  else if (teacher !== 0) {
      url = `?teacher_created=${teacher}`
   } else if (subject !== 0) {
      url = `?meeting_subject=${subject}`
   } else {
      url = ""
   }
    const response = await axios.get(`http://localhost:8000/api/meeting/${url}`, {headers:{"Authorization":`Bearer ${token}`}})
    dispatch({
       type:FetchMeetingScheduleSuccess,
       payload:response
    })
   } catch(err) {
    dispatch({
       type:FetchMeetingScheduleFailed,
       payload:err.response
    })
   }
}

