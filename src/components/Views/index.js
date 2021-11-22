import SidebarComponent from "../studentsidebar"
import '../../App.css'
import { Navigate } from "react-router"
import TeacherSidebarComponent from "../teachersidebar"


const ViewsComponent = (props) => {

    const status = localStorage.getItem('status')
    const role = localStorage.getItem('role')
   console.log(props)

if (status === '200'){
   return(
    <div className="main">
    <div className="sidebar">
    {role === 'student'? <SidebarComponent/> : <TeacherSidebarComponent/>}
    </div>    
    
    <div className="body">
    <h2>Hello</h2>
    </div>
    </div>
   )
}else{
    return <Navigate to='/login'/>
}
}

export default ViewsComponent