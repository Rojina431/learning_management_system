import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router"
import { FetchMeetingSchedule } from "../../redux/action/schedulemeetingaction"
import DisplayMeeting from "../Common/displaymeeting"
import NavbarComponent from "../navbar"
import Refresh from "../refresh"
import TeacherSidebarComponent from "../teachersidebar"

const TeacherMeeting = () => {

    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)
    const meetingdata = useSelector(state => state.meeting.fetchlogs)
    const meetingstatus = useSelector(state => state.meeting.fetchstatus)

    useEffect(() => {
      const fetchScheduledMeeting = async() => {
          const token = await Refresh()
          if (token !== undefined && token) {
            dispatch(FetchMeetingSchedule(token, localStorage.getItem('user_id')))
          } else {
             setRedirect(true)
          }
      }
      fetchScheduledMeeting()
    }, [])

    console.log(meetingdata)

    if (redirect) {
        return <Navigate to='/login'/>
    } else {
    return (
        <div className="main">
            <div className="sidebar">
                <TeacherSidebarComponent/>
            </div>
            <div className="body">
              <NavbarComponent/>
              {meetingdata.data !== undefined && <DisplayMeeting meeting={meetingdata} meeting_status={meetingstatus} from='teacher'/>}
            </div>
        </div>
    )
    }
}

export default TeacherMeeting