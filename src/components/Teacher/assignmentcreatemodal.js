import { Modal, ModalBody, ModalHeader,Button,ModalFooter, Form, Input, FormGroup, Label } from 'reactstrap'
import { useEffect, useRef, useState } from 'react'
import { AssignmentCreate} from '../../redux/action/assignmentaction';
import Refresh from '../refresh';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import MoreErrorHandling from '../moreerrorhandling';

const AssignmentCreateModal = (props) => {
    const fileRef = useRef()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const assignmentcreatedata = useSelector(state => state.assignmentcreate.createlogs)
    const assignmentcreatestatus = useSelector(state => state.assignmentcreate.createstatus)
    const [createError, setCreateError] = useState({"message":"","titleerr":"","pdferr":"","deadlineerr":"","detailerr":""})
    const [assignmentpost, setAssignmentpost] = useState({"teacher_create":parseInt(localStorage.getItem("user_id")),"subject_create":props.subject,"title":"","deadline":"","assignment_pdf_create":[]})
    const dispatch = useDispatch()

    useEffect(() => {
     setOpen(props.show)
    }, [props.show])

    useEffect(() => {
       if (assignmentcreatestatus === 400){
        setLoading(false)   
        setAssignmentpost(prevState => ({...prevState, "title":"","deadline":"","assignment_pdf_create":[]}))
        fileRef.current.value = ''
        const err = new MoreErrorHandling(assignmentcreatedata)
        if (err.title !== ""){
            setCreateError(prevState => ({...prevState, "titleerr":err.title[0]}))
        }
        if (err.assignment_pdf_create !== ""){
            setCreateError(prevState => ({...prevState, "pdferr":err.assignment_pdf_create[0]}))
        } 
        if (err.deadline !== ""){
            setCreateError(prevState => ({...prevState, "deadlineerr":err.deadline[0]}))
        }
        if(err.detail !== ""){
            setCreateError(prevState => ({...prevState, "detailerr":err.detail}))
        
        }
       } else if (assignmentcreatestatus === 200){
           props.toggleOpen(false)
           Remove()
           setAssignmentpost(prevState => ({...prevState, "title":"","deadline":"","assignment_pdf_create":[]}))
           fileRef.current.value = ''
           props.fetchCreateAssignment()
       }
    }, [assignmentcreatedata, assignmentcreatestatus])


    const toggleOpen = (value) => {
        Remove()
        setAssignmentpost(prevState => ({...prevState, "title":"","deadline":"","assignment_pdf_create":[]}))
        fileRef.current.value = ''
        props.toggleOpen(value)
    }

    const handleChange = (e) => {
        Remove()
        if (e.target.value){
            setAssignmentpost(prevState => ({...prevState, [e.target.name]:e.target.value}))
        }
    }


    const Remove = () => {
        setLoading(false)
        setCreateError({"message":"","titleerr":"","pdferr":"","deadlineerr":"","detailerr":""})
    }

    const handleFileChange = (e) => {
        Remove()
        const file = e.target.files
        if (file[0] !== undefined){
           const ext = file[0].name.split('.').pop()
           if (ext === 'jpg' || ext === 'png' || ext === 'pdf'){
            setAssignmentpost(prevState => ({...prevState, [e.target.name]:file[0]}))
           } else {
            setCreateError(prevState => ({...prevState, "message":"Invalid file format, only pdf,jpg and png are supported"}))
           }
        }
    }

    const CreateAssignment = async() => {
        setLoading(true)
        const access = await Refresh()
        if (access !== null &&  access !== undefined){
          const filedata = new FormData()
          filedata.append("teacher_create",assignmentpost.teacher_create)
          filedata.append("subject_create",assignmentpost.subject_create)
          filedata.append("title",assignmentpost.title)
          filedata.append("deadline",assignmentpost.deadline)
          filedata.append("assignment_pdf_create",assignmentpost.assignment_pdf_create)
          dispatch(AssignmentCreate(filedata,access))
        }else{
        //   Remove()
          setRedirect(true)
          
        }
    }

    if (redirect){
        return <Navigate to='/login'/>
    }else{
        return (
            <div>
            <Modal
              fade={false}
              toggle={() => toggleOpen(!open)}
              isOpen={open}
            >
              <ModalHeader toggle={() => toggleOpen(false)}>
                Create Assignment
              </ModalHeader>
              {createError.message !== "" && <p className="error">{createError.message}</p>}
              {createError.detailerr !== "" && <p className="error">{createError.detailerr}</p>}
              <div style={{backgroundColor:"#EBEEE9"}}>
                  <Form encType="multipart/form-data">
                      <FormGroup>
                      <Label for="title">Assignment Title</Label>    
                      <Input type="text" onChange={handleChange} name="title" value={assignmentpost.title}/>
                      {createError.titleerr !== "" && <p className="error">{createError.titleerr}</p>}
                      </FormGroup>
                      <FormGroup>
                      <Label for="assignment_pdf_create">Assignment File</Label>
                      <Input type="file" onChange={handleFileChange} name="assignment_pdf_create" ref={fileRef}/> 
                      {createError.pdferr !== "" && <p className="error">{createError.pdferr}</p>}
                      </FormGroup>
                      <FormGroup>
                     <Label for="deadline">Deadline</Label>
                      <input type="datetime-local" onChange={handleChange} name="deadline" value={assignmentpost.deadline}/> 
                      {createError.deadlineerr !== "" && <p className="error">{createError.deadlineerr}</p>}
                      </FormGroup>
    
                  </Form>
                  </div>
              <ModalFooter>
                {loading?<Button
                  color="primary"
                  disabled
                >
                  Create
                </Button>:<Button
                  color="primary"
                  onClick={() => CreateAssignment()}
                >
                  Create
                </Button>}
                {' '}
                <Button onClick={() => toggleOpen(false)}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        );
    }
}

export default AssignmentCreateModal