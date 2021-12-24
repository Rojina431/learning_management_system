import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router"
import { RecordingFetch } from "../../redux/action/recordingaction"
import DisplayRecording from "../Common/displayrecording"
import Refresh from "../refresh"

const Recording = (props) => {

    const [redirect, setRedirect] = useState(false)
    const recordingdata = useSelector(state => state.recording.fetchlogs)
    const recordingstatus = useSelector(state => state.recording.fetchstatus)
    const dispatch = useDispatch()

    useEffect(() => {
     const fetchRecording = async() => {
         const token = await Refresh()
         if (token !== undefined && token !== null) {
             dispatch(RecordingFetch(token))
         } else {
             setRedirect(true)
         }
     }
     fetchRecording()
    }, [])

    if (redirect) {
        return <Navigate to='/login'/>
    } else {
        return  (
            <div style={{padding:"0 5px"}}>
            <h6>Recording</h6>
             <DisplayRecording from="student" recording={recordingdata} status={recordingstatus}/>
             </div>
        )
    }
}

export default Recording