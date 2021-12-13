import {
    AssignmentCreateSuccess,
    AssignmentCreateFailed,
    CreateAssignmentUpdateSuccess,
    CreateAssignmentUpdateFailed,
    CreateAssignmentFetchSuccess,
    CreateAssignmentFetchFailed,
    AssignmentSubmitSuccess,
    AssignmentSubmitFailed,
    SubmitAssignmentUpdateSuccess,
    SubmitAssignmentUpdateFailed,
    SubmitAssignmentFetchSuccess,
    SubmitAssignmentFetchFailed,
    AssignmentSubmitGradeSuccess,
    AssignmentSubmitGradeFailed,
    AssignmentFetchGradeSuccess,
    AssignmentFetchGradeFailed
} from '../actiontype'
import axios from 'axios'

export const AssignmentCreate = (body, token) => async(dispatch) => {
    console.log("hi")
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

export const CreateAssignmentUpdate = (id, token,body) => async(dispatch) => {
    console.log("hi")
    try{
      const response = await axios.patch(`http://localhost:8000/api/assignment_create/id=${id}`,body,{headers:{'Authorization':`Bearer ${token}`}})
      console.log(body)
      console.log(token)
      dispatch({
          type:CreateAssignmentUpdateSuccess,
          payload:response
      })
    } catch(err) {
      dispatch({
          type:CreateAssignmentUpdateFailed,
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

export const AssignmentSubmit = (body, token) => async(dispatch) => {
    console.log(body, token)
    try{
      const response = await axios.post('http://localhost:8000/api/assignment_submit/',body,{headers:{'Authorization':`Bearer ${token}`}})
      console.log(body)
      console.log(token)
      dispatch({
          type:AssignmentSubmitSuccess,
          payload:response
      })
    } catch(err) {
      dispatch({
          type:AssignmentSubmitFailed,
          payload:err.response.data
      })
    }
}

export const SubmitAssignmentUpdate = (id, token,body) => async(dispatch) => {
    console.log("hi")
    try{
      const response = await axios.patch(`http://localhost:8000/api/assignment_submit/id=${id}`,body,{headers:{'Authorization':`Bearer ${token}`}})
      console.log(body)
      console.log(token)
      dispatch({
          type:SubmitAssignmentUpdateSuccess,
          payload:response
      })
    } catch(err) {
      dispatch({
          type:SubmitAssignmentUpdateFailed,
          payload:err.response.data
      })
    }
}

export const SubmitAssignmentFetch = (token, student=null, assignment=null) => async(dispatch) => {
    
    console.log(typeof(assignment))
    let url = ""
    if (student !== null && assignment !== null){
        url = `?student_submit=${student}&assignment=${assignment}`
    } else if (student !== null){
        url = `?student_submit=${student}`
    } else if (assignment !== null){
        url = `?assignment=${assignment}`
    } else{
        url = ""
    }
    console.log(url)
    try{
      const response = await axios.get(`http://localhost:8000/api/assignment_submit/${url}`,{headers:{'Authorization':`Bearer ${token}`}})
       console.log(response)
      dispatch({
          type:SubmitAssignmentFetchSuccess,
          payload:response
      })
    }catch(err){
     dispatch({
         type:SubmitAssignmentFetchFailed,
         payload:err.response
     })
    }
}

export const SubmitAssignmentGrade = (token, body) => async(dispatch) => {
    try{
       const response = await axios.post('http://localhost:8000/api/assignment/grade/',body, {headers:{'Authorization':`Bearer ${token}`}})
       dispatch({
           type:AssignmentSubmitGradeSuccess,
           payload:response
       })
    }catch(err){
        dispatch({
            type:AssignmentSubmitGradeFailed,
            payload:err.response
        })
    }   
}

export const FetchSubmitAssignmentGrade = (token) => async(dispatch) => {
    try{
     const response = await axios.get('http://localhost:8000/api/assignment/grade/', {headers:{'Authorization':`Bearer ${token}`}})
     
     dispatch({
         type:AssignmentFetchGradeSuccess,
         payload:response
     })
    }catch(err){
     dispatch({
         type:AssignmentFetchGradeFailed,
         payload:err.response
     })
    }
}