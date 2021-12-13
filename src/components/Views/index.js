import { Navigate } from "react-router"
import TeacherSidebarComponent from "../teachersidebar"
import SidebarComponent from "../studentsidebar"
import '../../App.css'
import NavbarComponent from "../navbar"
import DashboardStudent from "./studentdashboard"


const ViewsComponent = (props) => {

    const status = localStorage.getItem('status')
    const role = localStorage.getItem('role')

if (status === '200'){
   return(
    <div className="main">
    <div className="sidebar">
    {role === 'student'? <SidebarComponent/> : <TeacherSidebarComponent/>}
    </div>    
    
    <div className="body">
    <NavbarComponent/>
    {role === 'student' ? <DashboardStudent/> : <div></div>}
    </div>
    </div>
   )
}else{
    return <Navigate to='/login'/>
}
}

export default ViewsComponent