import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Tooltip } from "reactstrap"
import { PlusCircle } from "react-feather"
import { Navigate } from "react-router"
import { RecordingFetch } from "../../redux/action/recordingaction"
import Refresh from "../refresh"
import DisplayRecording from "../Common/displayrecording"
import AddRecordingModal from "./recordingmodal"

const Recording = (props) => {
  const [redirect, setRedirect] = useState(false)
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  const [show, setShow] = useState(false)
  const recordingfetch = useSelector(state => state.recording.fetchlogs)
  const fetchstatus = useSelector(state => state.recording.fetchstatus)
  const dispatch = useDispatch()
  
  const Toggle = () => {
      setIsTooltipOpen(!isTooltipOpen)
  }

  const OpenModal = (value) => {
    setShow(value)
  }

  const fetchRecording = async() => {
    const token = await Refresh()
    if (token !== undefined && token !== null) {
      dispatch(RecordingFetch(token, localStorage.getItem('user_id'), props.subjectdata.id))
    } else {
        setRedirect(true)
    }
}

  useEffect(() => {
    fetchRecording()   
  }, [])

  if (redirect) {
      return <Navigate to='/login'/>
  } else {
      return (
        <div style={{padding:"0 5px"}}>
        <h6>Recording <span id="add_recording" onClick={() => OpenModal(true)}> <PlusCircle color="green" size={15} style={{cursor:"pointer"}}/></span></h6>
         <Tooltip placement="right" target="add_recording" toggle={Toggle} isOpen={isTooltipOpen}>Add Recording</Tooltip>
         <DisplayRecording from="teacher" recording={recordingfetch} status={fetchstatus}/>
         <AddRecordingModal toggleOpen={OpenModal} show={show} fetchRecording={fetchRecording} subject={props.subjectdata.id}/>
         </div> 
      )
  }
}

export default Recording