import SidebarComponent from "../sidebar"
import '../../App.css'
import { Navigate } from "react-router"


const ViewsComponent = () => {

    const status = localStorage.getItem('status')
  

if (status === '200'){
   return(
    <div className="main">
    <div className="sidebar">
    <SidebarComponent/>
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