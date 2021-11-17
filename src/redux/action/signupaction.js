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
  try{
   const response = await axios.post('http://localhost:8000/api/login/',body)
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