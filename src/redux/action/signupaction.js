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
  localStorage.removeItem('user_id')
  localStorage.removeItem('roll_no')
  localStorage.removeItem('user_name')
  localStorage.removeItem('email')
  try{
    const response = await axios.post('http://localhost:8000/api/login/',body)
    console.log(response.data.user_id)
    console.log(response.data.name)
    localStorage.setItem('access', response.data.data.access)
    localStorage.setItem('refresh', response.data.data.refresh)
    localStorage.setItem('role', response.data.data.role)
    localStorage.setItem('user_id',response.data.user_id)
    localStorage.setItem('user_name',response.data.name)
    localStorage.setItem('roll_no',response.data.roll_no)
    localStorage.setItem("email", response.data.data.email)
    localStorage.setItem('status',200)
    localStorage.setItem('class', response.data.data.role === 'student' ? response.data.student_class : response.data.teacher_class)
    console.log(localStorage.getItem('access'))
    dispatch({
        type:LoginSuccess,
        payload:response
    })
  }catch(err){
    console.log(err.response)
     dispatch({
         type:LoginFailed,
         payload:err.response.data
     })
  }
}

export const LogoutUser = () =>{
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  localStorage.removeItem('role')
  localStorage.removeItem('class')
  localStorage.removeItem('status')
  localStorage.removeItem('user_id')
  localStorage.removeItem('roll_no')
  localStorage.removeItem('user_name')
  localStorage.removeItem('email')
}