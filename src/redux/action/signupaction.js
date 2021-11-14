import {
    SignupSuccess,
    SignupFailed
} from '../actiontype'
import axios from 'axios'

export const SignupUser = (body) =>async(dispatch) => {
  console.log(body)
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