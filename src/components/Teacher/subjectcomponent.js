import { useEffect, useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useLocation } from "react-router"
import { FetchSubject } from "../../redux/action/subjectaction"
import Refresh from "../refresh"
import TeacherSidebarComponent from "../teachersidebar"

const TeacherSubject = (props) => {
    console.log(props)
    const dispatch = useDispatch()
    const location = useLocation()
    const subjectdata = useSelector(state=>state.subject.logs)
    const subjectstatus = useSelector(state =>state.subject.status)
    console.log(location.state.grade)
    useEffect(() => {
     const fetchSubject = async() => {
       const access = await Refresh()
       if (access !== null && access !== undefined){
           dispatch(FetchSubject(access,parseInt(location.state.grade),"",localStorage.getItem('id')))
       }
     }
     fetchSubject()
    },[location.state.grade])

    const ClassLabel = {
        1:'one',
        2:'two',
        3:'three',
        4:'four',
        5:'five',
        6:'six',
        7:'seven',
        8:'eight',
        9:'nine',
        10:'ten'
    }

    console.log(subjectdata,subjectstatus)
    return(
   <div className="main">
    <div className="sidebar">
    <TeacherSidebarComponent/>
    </div>    
    
    <div className="body" style={{padding:"6px"}}>
    <h2 style={{textAlign:"center"}}>Class {ClassLabel[location.state.grade]}</h2>
    <div className="subject">
      {subjectdata.data !== undefined ? subjectdata.data.length > 0 ? subjectdata.data.map((sub,index) => {
          return (
              <div key={index}>
              <h4>{sub.subject_name}</h4>
              <small>Subject Code : {sub.subject_code}</small>
              </div>
          )
      }) : subjectdata.data.length === 0 && subjectstatus === 200 ? <p style={{textAlign:"center"}}>No any subject assigned for this class yet!</p> : 
     <p className="error">Error!</p> :<p className="error">Error!</p>}
    </div>
    </div>
    </div>
    )
}

export default TeacherSubject