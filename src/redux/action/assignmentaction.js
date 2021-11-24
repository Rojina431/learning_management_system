import {
    AssignmentCreateSuccess,
    AssignmentCreateFailed,
    CreateAssignmentFetchSuccess,
    CreateAssignmentFetchFailed,
    AssignmentSubmitSuccess,
    AssignmentSubmitFailed,
    SubmitAssignmentFetchSuccess,
    SubmitAssignmentFetchFailed
} from '../actiontype'
import axios from 'axios'

export const AssignmentCreate = (body, token) => async(dispatch) => {
    try{
      const response = await axios.post('http://localhost:8000/api/assignment_create/',body,{headers:{'Authorization':`Bearer ${token}`}})
      console.log(body)
      console.log(token)
      dispatch({
          type:AssignmentCreateSuccess,
          payload:response
      })
    } catch(err) {
      dispatch({
          type:AssignmentCreateFailed,
          payload:err.response.data
      })
    }
}

export const CreateAssignmentFetch = (token, teacher=null, subject=null) => async(dispatch) => {
    let url = ""
    if (teacher !== null && subject !== null){
        url = `?subject_teacher=${teacher}&subject_create=${subject}`
    } else if (teacher !== null){
        url = `?subject_teacher=${teacher}`
    } else if (subject !== null){
        url = `?subject_create=${subject}`
    } else{
        url = ""
    }
    try{
      const response = await axios.get(`http://localhost:8000/api/assignment_create/${url}`,{headers:{'Authorization':`Bearer ${token}`}})
      dispatch({
          type:CreateAssignmentFetchSuccess,
          payload:response
      })
    }catch(err){
     dispatch({
         type:CreateAssignmentFetchFailed,
         payload:err.response.data
     })
    }
}