import { ArrowLeft } from "react-feather"
import { useLocation } from "react-router"
import { Link } from "react-router-dom"
import NavbarComponent from "../navbar"
import SidebarComponent from "../studentsidebar"
import AssignedAssignment from "./assignmentassigned"
import Recording from "./recording"

const StudentComponent = (props) => {

    const location = useLocation()

    console.log(location)
    return (
        <div className="main">
            <div className="sidebar">
                <SidebarComponent/>
            </div>
            <div className="body">
                <NavbarComponent/>
                <br/>
                {location !== undefined &&  location !== null && location.state.from === 'dashboard' && <Link to="/"><p><ArrowLeft/> Go to previous page</p></Link>}
                <h1 style={{textAlign:"center", color:"#3895d3"}}>{location.state.subject_name}</h1>
                {location !== undefined &&  location !== null && 
                <>
                <Recording subject_id={location.state.subject_id}/>
                <br/>
                 <AssignedAssignment subject_id={location.state.subject_id}/>
                </>
                }
            </div>
        </div>
    )
}

export default StudentComponent