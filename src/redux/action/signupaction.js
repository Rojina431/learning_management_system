import {
    SignupSuccess,
    SignupFailed,
    LoginSuccess,
    LoginFailed
} from '../actiontype'
import axios from 'axios'

export const SignupUser = (body) =>async(dispatch) => {
  try{
    const response = await axios.post('http://localhost:8000/api/signup/',body)
    dispatch({
        type:SignupSuccess,
        payload:response
    })
  }catch(err){
     dispatch({
         type:SignupFailed,
         payload:err.response.data
     })
  }
}

export const LoginUser = (body) => async(dispatch) => {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  localStorage.removeItem('role')
  localStorage.removeItem('class')
  localStorage.removeItem('status')
  try{
    const response = await axios.post('http://localhost:8000/api/login/',body)
    localStorage.setItem('access', response.data.data.access);
    localStorage.setItem('refresh', response.data.data.refresh);
    localStorage.setItem('role', response.data.data.role);
    localStorage.setItem('status',200)
    localStorage.setItem('class', response.data.data.role === 'student' ? response.data.student_class : response.data.teacher_class)
    console.log(localStorage.getItem('access'))
    dispatch({
        type:LoginSuccess,
        payload:response
    })
  }catch(err){
     dispatch({
         type:LoginFailed,
         payload:err.response.data
     })
  }
}