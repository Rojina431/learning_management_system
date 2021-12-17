import axios from 'axios'
import {
  SubjectFetchFailed,
  SubjectFetchSuccess
} from '../actiontype'

export const FetchSubject = (token=1, grade = 0, subject_code = "",teacher=0) => async(dispatch) => {
  console.log(token,grade,subject_code,teacher)
    let url = ""
  if(grade !== 0 && subject_code !== "" && teacher !== 0){
    url=`?grade=${grade}&subject_code=${subject_code}&subject_teacher=${teacher}`
  }else if(subject_code !== "" && teacher !== 0){
    url=`?subject_code=${subject_code}&subject_teacher=${teacher}`
  }else if(grade !== 0 && teacher !== 0){
    url=`?grade=${grade}&subject_teacher=${teacher}`
  }else if (grade !== 0 && subject_code !== ""){
    url = `?grade=${grade}&subject_code=${subject_code}`
  }else if(grade !== 0){
      url = `?grade=${grade}`
  }else if(subject_code !== ""){
      url = `?subject_code=${subject_code}`
  }else{
      url = ""
  }
  axios.get(`http://localhost:8000/api/subject/${url}`,{headers:{'Authorization':`Bearer ${token}`}}).then((response) => {
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