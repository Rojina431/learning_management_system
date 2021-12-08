import {
    AssignmentSubmitGradeSuccess,
    AssignmentSubmitGradeFailed,
    AssignmentFetchGradeSuccess,
    AssignmentFetchGradeFailed
} from '../actiontype'

const initialState = {
    submitgrade:[],
    submitgradestatus:null,
    fetchgrade:[],
    fetchgradestatus:null
}

export default function AssignmentGradeReducer(state = initialState, action){
    switch(action.type){
       case AssignmentSubmitGradeSuccess:
           return{
               ...state,
               submitgradestatus:200,
               submitgrade:action.payload
           }
        case AssignmentSubmitGradeFailed:
            return{
                ...state,
                submitgradestatus:400,
                submitgrade:action.payload
            } 
        case AssignmentFetchGradeSuccess:
            return{
                ...state,
                fetchgradestatus:200,
                fetchgrade:action.payload
            }   
        case AssignmentFetchGradeFailed:
            return{
                ...state,
                fetchgradestatus:400,
                fetchgrade:action.payload
            }     
        default:
            return state     
    }
}