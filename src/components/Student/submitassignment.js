import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router"
import { Modal, Form, ModalHeader, ModalFooter, Button, Label, Input } from "reactstrap"
import { AssignmentSubmit, SubmitAssignmentUpdate } from "../../redux/action/assignmentaction"
import MoreErrorHandling from "../moreerrorhandling"
import Refresh from "../refresh"

const SubmitAssignmentModal = (props) => {

    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState([])
    const [submitError, setSubmiterr] = useState({"message":"","assignment_pdferr":"","assignmenterr":""})
    const assignmentsubmitdata = useSelector(state => state.assignmentsubmit.submitlogs)
    const assignmentsubmitstatus = useSelector(state => state.assignmentsubmit.submitstatus)
    const dispatch = useDispatch()
    const fileRef = useRef()

    useEffect(() => {
        setOpen(props.show)
       }, [props.show])

    useEffect(() => {

        if(assignmentsubmitstatus === 400){
           const err = new MoreErrorHandling(assignmentsubmitdata)
           if (err.assignment_pdf_submit !== ""){
               setSubmiterr(prevState => ({...prevState, "assignment_pdferr":err.assignment_pdf_submit[0]}))
           }
           if (err.assignment !== ""){
            setSubmiterr(prevState => ({...prevState, "assignmenterr":err.assignment[0]}))
        }
        } else {
            toggleOpen()
            // fileRef.current.value = ''
        }

    }, [assignmentsubmitdata, assignmentsubmitstatus])   

    const toggleOpen = (value) => {
       props.openModal(value)
       setLoading(false)
       setFile(false)
       setSubmiterr({"message":"","assignment_pdferr":"","assignment":""})
       
    }

    const handleChange = (e) => {
     setSubmiterr({"message":"","assignment_pdferr":"","assignment":""})
      const file = e.target.files
      if (file[0] !== undefined){
          const ext = file[0].name.split('.').pop()
          if (ext === 'jpg' || ext === 'png' || ext === 'pdf'){
            setFile(file[0])
          }else{
           setSubmiterr(prevState => ({...prevState, "message":"Invalid format, only pdf,jpg and png are supported"}))
          }
      }
      
    }

    const SubmitAssignment = async() => {
     setLoading(true)   
     const access = await Refresh()
     if (access !== null && access !== undefined) {
        //  if (file.length > 0){
            const formdata = new FormData()
            formdata.append("assignment_pdf_submit", file)
            formdata.append('assignment', props.assignment.id)
            formdata.append('student_submit', localStorage.getItem("user_id"))
            formdata.append('is_submitted',true)
            dispatch(AssignmentSubmit(formdata, access))
            // dispatch(SubmitAssignmentUpdate(props.assignment.id, access, {"is_submitted":true}))
            props.fetchSubmitAssignment()
            toggleOpen(true)
            setLoading(false)
            setFile([])
         //}
     } else {
       setRedirect(true)
       setLoading(false)
     }
    }


    if (redirect) {
        return <Navigate to='/login'/>
    } else {

    return (
        <Modal  
        fade={false}
        toggle={() => toggleOpen(!open)}
        isOpen={open}>
            <ModalHeader toggle={() => toggleOpen(!open)}>Submit Assignment</ModalHeader>
        <Form encType="multipart/form-data">
        {submitError.message !== "" && <p className="error">{submitError.message}</p>}
        {submitError.assignmenterr !== "" && <p className="error">{submitError.assignmenterr}</p>}
            <Label for="assignment_pdf_submit">Upload file</Label>
            <Input type="file" name="assignment_pdf_submit" onChange={handleChange} ref={fileRef}/>
            {submitError.assignment_pdferr !== "" && <p className="error">{submitError.assignment_pdferr}</p>}
        </Form>
        <ModalFooter>
            {loading ? <Button disabled>Submit</Button> : <Button onClick={SubmitAssignment} color="primary">Submit</Button>}
            <Button onClick={() => toggleOpen(!open)}>Cancel</Button>
        </ModalFooter>
        </Modal>
    )
    }
}

export default SubmitAssignmentModal