import { useState } from 'react'
import { FiChevronDown, FiChevronRight } from 'react-icons/fi'
import { Navigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { FetchSubject } from '../../redux/action/subjectaction'
import Loading from '../loading'
import Refresh from '../refresh'

const DisplayMeeting = (props) => {

    const [meetingindex, setIndex] = useState([0])
    const [redirect, setRedirect] = useState(false)
    const subject = useSelector(state => state.subject.fetchlogs)
    const dispatch = useDispatch()

    const OpenData = (id, teacher) => {
     
     let indx = []
     indx = meetingindex.slice()
      if (indx[0] === id) {
          indx.pop()
          indx.push(0)
          setIndex(indx)
      } else {
          fetchSubject(teacher)
          indx.pop()
          indx.push(id)
          setIndex(indx)
      }
    }

    const fetchSubject = async(teacher) => {
        const token = await Refresh()
        if (token !== undefined && token !== null) {
            dispatch(FetchSubject(token,  0, "", teacher))
        } else {
          setRedirect(true)
        }
    }
 
    console.log(props.meeting.data)
    console.log(props.meeting.data.data.length,props.meeting_status)
    if (redirect) {
       return <Navigate to='/login'/>
    } else {
    return (
        <>
            {props.meeting.data !== undefined && <div style={{paddingTop:"1rem"}}>{props.meeting.data.data.length > 0 ? props.meeting.data.data.map((meet, index) => {
                return (
                     <div key={index} style={{marginBottom:"0.4rem"}}>
                     <div onClick={() => OpenData(meet.id, meet.teacher_created)} style={{cursor:"pointer"}}>{meet.id === meetingindex[0] ? <FiChevronDown/> : <FiChevronRight/>} <span style={{textTransform:"capitalize"}}>{meet.meeting_title}</span></div>
                     {meet.id === meetingindex[0] && subject !== undefined & subject.data.length === 1 ? <a href={meet.meeting_url} target="_blank">Join {subject.data[0].subject_name} Class</a> : <div></div>}
                     </div>
                )
            }) : props.meeting.data.data.length === 0 && props.meeting_status === 200 ? <p style={{position:'fixed', left:"60%"}}>No meeting scheduled!</p> : <Loading/>
         }</div>
        }
        </>
    )
    }
}

export default DisplayMeeting