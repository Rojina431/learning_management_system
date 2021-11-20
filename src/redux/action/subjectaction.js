import axios from 'axios'
import {
  SubjectFetchFailed,
  SubjectFetchSuccess
} from '../actiontype'

export const FetchSubject = (token=1, grade = 0, subject_code = "") => async(dispatch) => {
  let url = ""
  if (grade !== 0 && subject_code !== ""){
    url = `?grade=${grade}&subject_code=${subject_code}`
  }else if(grade !== 0){
      url = `?grade=${grade}`
  }else if(subject_code !== ""){
      url = `?subject_code=${subject_code}`
  }else{
      url = ""
  }
  axios.get(`http://localhost:8000/api/subject/${url}`).then((response) => {
      dispatch({
          type:SubjectFetchSuccess,
          payload:response
      })
  }).catch((err) => {
      console.log(err.response.data)
      dispatch({
          type:SubjectFetchFailed,
          payload:err.response.data
      })
  })
}