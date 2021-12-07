import { useEffect, useState } from "react"
import { PlusCircle } from "react-feather"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router"
import { Table, Tooltip } from "reactstrap"
import { CreateAssignmentFetch } from "../../redux/action/assignmentaction"
import AssignedAssignmentTable from "../Common/assignedassignmenttaable"
import Refresh from "../refresh"
import AssignmentCreateModal from "./assignmentcreatemodal"

const AssignmentCreateComponent = (props) => {

    const [isTooltipOpen, setIsTooltipOpen] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const createassignmentdata = useSelector(state => state.assignmentcreate.fetchlogs)
    const createassignmentstatus = useSelector(state => state.assignmentcreate.fetchstatus)
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()

    const Toggle = () => {
       setIsTooltipOpen(!isTooltipOpen)
    }

    useEffect(() => {
  
      fetchCreateAssignment()
    }, [props.subjectdata])

    const fetchCreateAssignment = async() => {
        const access = await Refresh()
        if (access !== null && access !== undefined){
          dispatch(CreateAssignmentFetch(access, localStorage.getItem('user_id'), props.subjectdata.id))  
        } else {
            setRedirect(true)
        }
    }

  

    const OpenModal = (value) => {
      setShow(value)
    }

    if (redirect) {
        return <Navigate to='/login'/>
    } else {
    return(
        <div className="create_assignment" style={{padding:"10px 0",marginRight:"5px"}}>
         <h6>Created Assignment <span id="create_assignment" onClick={() => OpenModal(true)}> <PlusCircle color="green" size={15} style={{cursor:"pointer"}}/></span></h6>
         <Tooltip placement="right" target="create_assignment" toggle={Toggle} isOpen={isTooltipOpen}>Create Assignment</Tooltip>
         {createassignmentdata.data !== undefined && <AssignedAssignmentTable createassignmentdata={createassignmentdata} createassignmentstatus={createassignmentstatus} from={"teacher"}/>}
        
             <AssignmentCreateModal show={show} toggleOpen={OpenModal} subject={props.subjectdata.id} fetchCreateAssignment={fetchCreateAssignment}/>
            </div>
    )
}
}

export default AssignmentCreateComponent