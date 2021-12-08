import { Button, Form, Label, Modal, ModalFooter, ModalHeader, FormGroup } from "reactstrap"
import { useEffect, useState } from 'react'
import Select from 'react-select'
import Refresh from "../refresh"
import { useDispatch, useSelector } from "react-redux"
import { SubmitAssignmentGrade } from "../../redux/action/assignmentaction"
import { Navigate } from "react-router"
import MoreErrorHandling from "../moreerrorhandling"

const SubmitGrade = (props) => {

    const [currentgrade, setCurrentgrade] = useState({ "value": "", "label": "" })
    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [err, setErr] = useState({'gradeerr':"", "assignmenterr":""})
    const gradesubmit = useSelector(state => state.grade.submitgrade)
    const gradesubmitstatus = useSelector(state => state.grade.submitgradestatus)
    const dispatch = useDispatch()

    useEffect(() => {
       if (gradesubmitstatus === 400) {
           
           setCurrentgrade({ "value": "", "label": "" })
           const err = new MoreErrorHandling(gradesubmit.data)
           if (err.grade !== "") {
            setErr(prevState => ({...prevState, "gradeerr":err.grade[0]}))
           }
           if (err.assignment !== "") {
            setErr(prevState => ({...prevState, "assignmenterr":err.assignment[0]}))
           }
       } else {
           isToggle(false)
           props.fetchAssignmentGrade()
       }
    }, [gradesubmitstatus, gradesubmit])

    const gradeoptions = [
        { 'value': 'A+', 'label': 'A+' },
        { 'value': 'A', 'label': 'A' },
        { 'value': 'B+', 'label': 'B+' },
        { 'value': 'B', 'label': 'B' },
        { 'value': 'C', 'label': 'C' },
        { 'value': 'C+', 'label': 'C+' },
        { 'value': 'D+', 'lDbel': 'D+' },
        { 'value': 'D', 'label': 'D' },
        { 'value': 'F', 'label': 'Fail' }
    ]

    const isToggle = (value) => {
        props.openModal(value)
        setLoading(false)
        setErr({'gradeerr':"", "assignmenterr":""})
        setCurrentgrade({ "value": "", "label": "" })
    }

    const submitAssignmentGrade = async() => {
        const access = await Refresh()
        if (access !== undefined && access !== null) {
            const gradedata = {'assignment':props.assignment.id, 'assignment_grade':currentgrade.value}
            dispatch(SubmitAssignmentGrade(access, gradedata))  
        }else{
            setRedirect(true)
        }
    } 

    if(redirect){
        return <Navigate to='/login'/>
    } else {
    return (
        <Modal isOpen={props.open} toggle={() => isToggle(!(props.open))}>
            <ModalHeader>Assignment Grade Submit</ModalHeader>
            
            <Form>
            {err.assignmenterr !== "" ? <p className="error">Assignment {err.assignmenterr}</p> : <p></p>}
                <FormGroup>
                    <Label>Assignment Grade</Label>
                    <Select
                        options={gradeoptions}
                        placeholder="Select grade"
                        value={currentgrade}
                        onChange={(data) => {
                            setCurrentgrade(data)
                            setErr({'gradeerr':"", "assignmenterr":""})
                        }}
                    />
                </FormGroup>

                {err.gradeerr !== "" ? <p className="error">{err.gradeerr}</p> : <p></p>}
                <ModalFooter>
                {loading ?  <Button disabled >Submit</Button>: <Button color="primary" onClick = {submitAssignmentGrade}>Submit</Button>}
                <Button color="secondary" onClick={() => isToggle(false)}>Cancel</Button>
                </ModalFooter>
            </Form>
        </Modal>

    )
                    }
}

export default SubmitGrade