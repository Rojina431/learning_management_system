import { useEffect, useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router"
import { FetchSubject } from "../../redux/action/subjectaction"
import Loading from "../loading"
import Refresh from "../refresh"
import TeacherSidebarComponent from "../teachersidebar"
import AssignmentCreateComponent from "./assignmentcreate"
import SubjectComponent from "./subject"

const TeacherComponent = (props) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const subjectdata = useSelector(state=>state.subject.logs)
    const subjectstatus = useSelector(state =>state.subject.status)
    const [redirect , setRedirect] = useState(false)
    useEffect(() => {
     const fetchSubject = async() => {
       const access = await Refresh()
       if (access !== null && access !== undefined){
           dispatch(FetchSubject(access,parseInt(location.state.grade),"",localStorage.getItem('user_id')))
       } else {
         setRedirect(true)
       }
     }
     fetchSubject()
    },[location.state.grade])

 if (redirect){
   return <Navigate to='/login'/>
 } else {
    return(
    <div className="main">
    <div className="sidebar">
    <TeacherSidebarComponent/>
    </div>
    {subjectdata.data !== undefined && <div>    
    {subjectdata.data.length > 0 ? <div><SubjectComponent subjectdata={subjectdata} subjectstatus={subjectstatus} grade={location.state.grade}/> 
    
    </div> : subjectdata.data.length === 0 && subjectstatus === 200 ? <p style={{textAlign:"center", padding:"10px"}}>No any subject assigned for this class yet!</p> : 
    subjectstatus === 400 ? <p>Error!</p> : <Loading/>} 
    </div>}
    </div>
    )
}
}

export default TeacherComponent