import { useLocation } from "react-router"
import SidebarComponent from "../studentsidebar"
import AssignedAssignment from "./assignmentassigned"

const StudentComponent = (props) => {

    const location = useLocation()

    console.log(location.state.subject_id)

    return (
        <div className="main">
            <div className="sidebar">
                <SidebarComponent/>
            </div>
            <div>
                <h1 style={{textAlign:"center"}}>{location.state.subject_name}</h1>
                {location !== undefined &&  location !== null && <AssignedAssignment subject_id={location.state.subject_id}/>}
            </div>
        </div>
    )
}

export default StudentComponent