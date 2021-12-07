import {
 UserFetchSuccess,
 UserFetchFailed,
 StudentFetchSuccess,
 StudentFetchFailed,
 TeacherFetchSuccess,
 TeacherFetchFailed
} from '../actiontype'
import axios from 'axios'

export const UserFetch = (access) => async(dispatch) => {
    try{
      const response = await axios.get('http://localhost:8000/api/user',{headers:{'Authorization' : `Bearer ${access}`}})
      dispatch({
          type:UserFetchSuccess,
          payload:response
      })
    } catch(err) {
        dispatch({
            type:UserFetchFailed,
            payload:err.response.data
        })
    }
}

export const StudentFetch = (access) => async(dispatch) => {
    try{
        const response = await axios.get('http://localhost:8000/api/student/', {headers:{'Authorization': `Bearer ${access}`}})
        dispatch({
            type:StudentFetchSuccess,
            payload:response
        })
    }catch(err){
        dispatch({
            type:StudentFetchFailed,
            payload:err.response.data
        })
    }
}

export const TeacherFetch = (access) => async(dispatch) => {
    try{
        const response = await axios.get('http://localhost:8000/api/teacher/', {headers:{'Authorization': `Bearer ${access}`}})
        dispatch({
            type:TeacherFetchSuccess,
            payload:response
        })
    }catch(err){
        dispatch({
            type:TeacherFetchFailed,
            payload:err.response.data
        })
    }
}