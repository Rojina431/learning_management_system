import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router"
import { Alert, Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import ErrorHandling from "../../errorhandling"
import { SubmitMeetingSchedule } from "../../redux/action/schedulemeetingaction"
import { FetchSubject } from "../../redux/action/subjectaction"
import Refresh from "../refresh"
import SubjectSelect from "../subject_select"

const ScheduleMeetingForm = (props) => {

    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)
    const [loading, setLoading] = useState(false)
    const [meetingdetails, setmeetingdetails] = useState({"meeting_title":"", "meeting_url":"", "teacher_created":localStorage.getItem('user_id'), "meeting_subject":null})
    const subjectdata = useSelector(state => state.subject.fetchlogs)
    const submitmeetingdata = useSelector(state => state.meeting.submitlogs)
    const submitmeetingstatus = useSelector(state => state.meeting.submitstatus)
    const [status, setstatus] = useState(false)
    const [submitmeetingerror, setsubmitmeetingerror] = useState({"subjecterr":"", "titleerr":"", "urlerr":""})

    useEffect(() => {
      if (submitmeetingstatus === 400) {
          setstatus(false)
          setLoading(false)
          const err = new ErrorHandling(submitmeetingdata.data)
          if (err.meeting_subject !== "") {
            setsubmitmeetingerror(prevState => ({...prevState, "subjecterr":err.meeting_subject[0]}))
          }
          if (err.meeting_url !== "") {
              setsubmitmeetingerror(prevState => ({...prevState, "urlerr": err.meeting_url[0]}))
          }
          if (err.meeting_title !== "") {
              setsubmitmeetingerror(prevState => ({...prevState, "titleerr":err.meeting_title[0]}))
          }
      } else {
          setstatus(true)
          console.log(submitmeetingdata, submitmeetingstatus)
          toggleModal(false)
         const timeout = setTimeout(() => {
             setstatus(false)  
          }, 1000);
          return () => clearTimeout(timeout)
      }
    }, [submitmeetingstatus, submitmeetingdata])

    const toggleModal = (value) => {
      props.OpenModal(value)
      setmeetingdetails({"meeting_title":"", "meeting_url":"", "teacher_created":localStorage.getItem('user_id'), "meeting_subject":null})
      setLoading(false)
      setsubmitmeetingerror({"subjecterr":"", "titleerr":"", "urlerr":""})
    }

    const handleSubjectChange = (value) => {
        setsubmitmeetingerror({"subjecterr":"", "titleerr":"", "urlerr":""})
        if (value !== undefined && value !== null) {
           setmeetingdetails(prevState => ({...prevState, "meeting_subject":value.value}))  
        }
    }

    const handleChange = (e) => {
        setsubmitmeetingerror({"subjecterr":"", "titleerr":"", "urlerr":""})
        setmeetingdetails(prevState => ({...prevState, [e.target.name]:e.target.value}))
    }

    useEffect(() => {
    setstatus(false)
     const fetchSubject = async() => {
         const token = await Refresh()
         if (token !== null && token !== undefined) {
              dispatch(FetchSubject(token, 0, "", localStorage.getItem('user_id')))
         } else {
            setRedirect(true)
         }
     }
     fetchSubject()
    }, [])

    const ScheduleMeeting = async() => {
      setLoading(true)
      const token = await Refresh() 
      if (token !== null && token !== undefined) {
         dispatch(SubmitMeetingSchedule(token, meetingdetails))
      } else {
          setRedirect(true)
          setLoading(false)
      }
    }


    if (redirect) {
        return <Navigate to='/login'/>
    } else {
    return (
        <>
        <Modal isOpen={props.open} toggle={() => toggleModal(!props.open)}>
            <ModalHeader toggle={() => toggleModal(!props.open)}>Schedule a Meeting</ModalHeader>
        
            <ModalBody>
                  <Label>Meeting Title</Label>
                  <Input type="text" placeholder="title" onChange={handleChange} name="meeting_title"/>
                  {submitmeetingerror.titleerr !== "" && <p className="error">{submitmeetingerror.titleerr}</p>}
                  <Label>Meeting URL</Label>
                  <Input type="url" placeholder="meeting url" onChange={handleChange} name="meeting_url"/>
                  {submitmeetingerror.urlerr !== "" && <p className="error">{submitmeetingerror.urlerr}</p>}
                  <Label>Subject</Label>
                  {subjectdata !== undefined && <SubjectSelect handleSubjectChange={handleSubjectChange} value={meetingdetails.meeting_subject} subject={subjectdata.data}/>}
                  {submitmeetingerror.subjecterr !== "" && <p className="error">{submitmeetingerror.subjecterr}</p>}
            </ModalBody>
            <ModalFooter>
                {loading ? <Button color="primary" disabled>Schedule</Button> : <Button color="primary" onClick={ScheduleMeeting}>Schedule</Button>}
                <Button onClick={() => toggleModal(false)}>Cancel</Button>
            </ModalFooter>
        </Modal>
        {status === true &&<Alert color="success">
        Meeting Scheduled!
      </Alert>}
        </>
    )
    }
}

export default ScheduleMeetingForm