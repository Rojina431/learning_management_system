import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router"
import { Table } from "reactstrap"
import { CreateAssignmentFetch } from "../../redux/action/assignmentaction"
import AssignedAssignmentTable from "../Common/assignedassignmenttaable"
import Refresh from "../refresh"

const AssignedAssignment = (props) =>{


    const [redirect, setRedirect] = useState(false)
    const createassignmentdata = useSelector(state => state.assignmentcreate.fetchlogs)
    const createassignmentstatus = useSelector(state => state.assignmentcreate.fetchstatus)
    const dispatch = useDispatch()


    useEffect(() => {
       if (props.subject_id !== undefined && props.subject_id !== null){
           fetchCreateAssignment()
       }
    }, [props.subject_id])

    const fetchCreateAssignment = async() => {
        const access = await Refresh()
        if (access !== null && access !== undefined) {
          await dispatch(CreateAssignmentFetch(access, null , props.subject_id))
        } else {
          setRedirect(true)
        }
    }


if (redirect) {
    return <Navigate to='/login'/>
} else {
    return (
        <div style={{padding:"0 5px"}}>
        <h6>Assigned Assignment</h6>
         <AssignedAssignmentTable createassignmentdata={createassignmentdata} createassignmentstatus={createassignmentstatus} from={"student"}/>
         </div>
    )
}
}

export default AssignedAssignment