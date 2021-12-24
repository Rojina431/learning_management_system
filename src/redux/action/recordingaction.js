import axios from 'axios'
import { FetchRecordingFailed, FetchRecordingSuccess, PostRecordingFailed, PostRecordingSuccess } from '../actiontype'

export const RecordingFetch = (token, teacher = 0, subject = 0) => async(dispatch) => {
    let url = ""
    if (teacher !== 0 && subject !== 0) {
      url = `?teacher=${teacher}&subject=${subject}`
    } else if (teacher !== 0) {
        url = `?teacher=${teacher}`
    } else if (subject !== 0) {
        url = `?subject=${subject}`
    } else {
        url = ""
    }
    try {
      const response = await axios.get(`http://localhost:8000/api/recording/${url}`, {headers:{"Authorization":`Bearer ${token}`}})
      dispatch({
          type:FetchRecordingSuccess,
          payload:response
      })
    } catch(err) {
       dispatch({
           type:FetchRecordingFailed,
           payload:err.response.data
       })
    }
}

export const RecordingPost = (token, body) => async(dispatch) => {
    try {
        const response = await axios.post("http://localhost:8000/api/recording/", body, {headers:{"Authorization":`Bearer ${token}`}})
        dispatch({
            type:PostRecordingSuccess,
            payload:response
        })
      } catch(err) {
         dispatch({
             type:PostRecordingFailed,
             payload:err.response.data
         })
      }
}