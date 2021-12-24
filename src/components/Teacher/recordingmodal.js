import { Modal, ModalHeader,Button,ModalFooter, Form, Input, FormGroup, Label } from 'reactstrap'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import Refresh from '../refresh';
import MoreErrorHandling from '../moreerrorhandling';
import { RecordingPost } from '../../redux/action/recordingaction';

const AddRecordingModal = (props) => {
    const fileRef = useRef()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const recordingdata = useSelector(state => state.recording.postlogs)
    const recordingstatus = useSelector(state => state.recording.poststatus)
    const [createError, setCreateError] = useState({"message":"","titleerr":"","recordingerr":"","detailerr":""})
    const [recordingpost, setRecordingpost] = useState({"teacher":parseInt(localStorage.getItem("user_id")),"subject":props.subject,"recording":""})
    const dispatch = useDispatch()

    useEffect(() => {
     setOpen(props.show)
    }, [props.show])

    useEffect(() => {
       if (recordingstatus === 400){
        setLoading(false)   
        setRecordingpost(prevState => ({...prevState, "recording":""}))
        fileRef.current.value = ''
        const err = new MoreErrorHandling(recordingdata)
        if (err.recording !== ""){
            setCreateError(prevState => ({...prevState, "recordingerr":err.recording[0]}))
        } 
       } else if (recordingstatus === 200){
           props.toggleOpen(false)
           Remove()
           setRecordingpost(prevState => ({...prevState, "recording":[]}))
           fileRef.current.value = ''
           props.fetchRecording()
       }
    }, [recordingdata, recordingstatus])


    const toggleOpen = (value) => {
        Remove()
        setRecordingpost(prevState => ({...prevState, "recording":""}))
        fileRef.current.value = ''
        props.toggleOpen(value)
    }

    const Remove = () => {
        setLoading(false)
        setCreateError({"message":"","titleerr":"","recordingerr":"","detailerr":""})
    }

    const handleFileChange = (e) => {
        Remove()
        const file = e.target.files
        setRecordingpost(prevState => ({...prevState, [e.target.name]:file[0]}))
        // if (file[0] !== undefined){
        //    const ext = file[0].name.split('.').pop()
        //    if (ext === 'jpg' || ext === 'png' || ext === 'pdf'){
            
        //    } else {
        //     setCreateError(prevState => ({...prevState, "message":"Invalid file format, only recording,jpg and png are supported"}))
        //    }
        // }
    }

    const AddRecording = async() => {
        setLoading(true)
        const access = await Refresh()
        if (access !== null &&  access !== undefined){
          const filedata = new FormData()
          filedata.append("teacher",recordingpost.teacher)
          filedata.append("subject",recordingpost.subject)
          filedata.append("recording",recordingpost.recording)
          dispatch(RecordingPost(access, filedata))
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
                Add Recording
              </ModalHeader>
              {createError.message !== "" && <p className="error">{createError.message}</p>}
              {createError.detailerr !== "" && <p className="error">{createError.detailerr}</p>}
              <div style={{backgroundColor:"#EBEEE9"}}>
                  <Form encType="multipart/form-data">
                      <FormGroup>
                      <Label for="recording">Recording Video</Label>
                      <Input type="file" onChange={handleFileChange} name="recording" ref={fileRef}/> 
                      {createError.recordingerr !== "" && <p className="error">{createError.recordingerr}</p>}
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
                  onClick={() => AddRecording()}
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

export default AddRecordingModal