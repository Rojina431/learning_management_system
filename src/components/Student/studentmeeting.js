import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router"
import { FetchMeetingSchedule } from "../../redux/action/schedulemeetingaction"
import { FetchSubject } from "../../redux/action/subjectaction"
import NavbarComponent from "../navbar"
import Refresh from "../refresh"
import SidebarComponent from "../studentsidebar"
import DisplayMeeting from "../Common/displaymeeting"

const StudentMeeting = () => {

    const [redirect, setRedirect] = useState()
    const dispatch = useDispatch()
    const subject = useSelector(state => state.subject.fetchlogs)
    const subjectstatus = useSelector(state => state.subject.status)
    const meeting = useSelector(state => state.meeting.fetchlogs)
    const meetingstatus = useSelector(state => state.meeting.fetchstatus)


    useEffect(() => {
      const fetchSubject =  async() => {
      const token = await Refresh()
      if (token !== undefined && token !== null) {
      dispatch(FetchSubject(token, localStorage.getItem('class')))
      } else {
        setRedirect(true)
      }
      }
      const fetchMeeting = async() => {
          const token = await Refresh()
          if (token !== undefined && token !== null) {
              dispatch(FetchMeetingSchedule(token))
          } else {
              setRedirect(true)
          }
      }
      fetchSubject()
      fetchMeeting()
    }, [])

    const meetingdata = useMemo(() => {
       let meetingdatas = meeting
       if (meetingstatus === 200 && subjectstatus === 200) {
          if (subject !== undefined && subject.data !== undefined && subject.data.length > 0 && meetingdatas !== undefined && meetingdatas.data !== undefined && meetingdatas.data.data !== undefined && meetingdatas.data.data.length > 0) {
              meetingdatas = meeting.data.data.filter((meet) => {
                  console.log(meet.meeting_subject)
                //   for (let i = 0; i < subject.data; i++) {
                //       console.log(subject.data.id)
                //       return meet.meeting_subject === subject.data.id
                //   }
                return subject.data.find(sub => {
                    console.log(sub.id)
                  return  sub.id === meet.meeting_subject
                })
              })
              console.log(subject, meetingdatas)
              return meetingdatas
          } else {
            meetingdatas = []
            return meetingdatas   
          }
       } else {
           meetingdatas = []
           return meetingdatas
       }
    }, [meeting, meetingstatus, subject, subjectstatus])

    console.log(meetingdata)

    if (redirect) {
     return <Navigate to='/login'/>
    } else {
    return (
        <div className="main">
        <div className="sidebar">
            <SidebarComponent/>
        </div>
        <div className="body">
          <NavbarComponent/>
          {meetingdata !== undefined && <DisplayMeeting meeting={meetingdata} meeting_status={meetingstatus} from='student'/>}
        </div>
    </div>
    )
    }
}

export default StudentMeeting