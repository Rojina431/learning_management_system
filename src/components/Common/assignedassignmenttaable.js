import { useEffect, useMemo, useState } from "react"
import { Check, X } from "react-feather"
import { useDispatch, useSelector } from "react-redux"
import { Badge, Table } from "reactstrap"
import { SubmitAssignmentFetch } from "../../redux/action/assignmentaction"
import { StudentFetch, UserFetch } from "../../redux/action/useraction"
import Loading from "../loading"
import Refresh from "../refresh"
import SubmitAssignmentModal from "../Student/submitassignment"

const AssignedAssignmentTable = (props) => {

    const [assignId, setAssignId] = useState([0])
    const [show, setShow] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [assignment, setAssignment] = useState([])
    const submitassignmentdata = useSelector(state => state.assignmentsubmit.fetchlogs)
    const submitassignmentstatus = useSelector(state => state.assignmentsubmit.fetchstatus)
    const student = useSelector(state => state.student.student)
    const user = useSelector(state => state.user.user)

    const dispatch = useDispatch()

    useEffect(() => {
        fetchSubmitAssignment()
        fetchUser()
        fetchStudent()
    }, [])

    const fetchSubmitAssignment = async (click = false, assignment_id = null) => {
        const access = await Refresh()
        if (access !== null && access !== undefined) {
            if (props.from === 'student') {
                dispatch(SubmitAssignmentFetch(access, localStorage.getItem('user_id'), null))
            } else if (props.from === 'teacher' && click) {
                console.log(click, assignment_id)
                dispatch(SubmitAssignmentFetch(access, null, assignment_id))
            }

        } else {
            setRedirect(true)
        }
    }

    const fetchUser = async () => {
        const access = await Refresh()
        if (access !== null && access !== undefined) {
            dispatch(UserFetch(access))
        } else {
            setRedirect(true)
        }
    }

    const fetchStudent = async () => {
        const access = await Refresh()
        if (access !== null && access !== undefined) {
            dispatch(StudentFetch(access))
        } else {
            setRedirect(true)
        }
    }


    const DateConverison = (time) => {
        const date = new Date(time).toString()
        return date
    }

    const OpenModal = (value, assignment = "") => {
        console.log("hello")
        setShow(value)
        setAssignment(assignment)
    }



    const IsSubmitted = (val) => {
        console.log(typeof (val))
        if (val == true) {
            return <span ><Check size={15} style={{ border: "1px solid green", borderRadius: "50%", backgroundColor: "light-green", color: "white" }} /></span>
        } else {
            return <span><X size={15} style={{ border: "1px solid red", borderRadius: "50%", backgroundColor: "red", color: "white" }} /></span>
        }
    }

    const assignmentcreate = useMemo(() => {
        let assignmentcreatevalue = props.createassignmentdata.data
        console.log(assignmentcreatevalue)
        if (props.from === 'student') {
            if (assignmentcreatevalue !== undefined && submitassignmentdata.data !== undefined) {

                if (assignmentcreatevalue.length > 0 && submitassignmentdata.data.length > 0) {

                    assignmentcreatevalue = assignmentcreatevalue.filter(assign => {
                        console.log("hell")
                        console.log(assign.id)

                        return !submitassignmentdata.data.find(submit => {
                            return submit.assignment === assign.id
                        })
                    })
                    return assignmentcreatevalue

                } else {
                    return assignmentcreatevalue
                }
            } else {
                return assignmentcreatevalue
            }
        } else {
            return assignmentcreatevalue
        }


    }, [submitassignmentdata, props.createassignmentdata])

    const showMore = (id) => {
        let index = []
        index = assignId.slice()
        console.log(index)
        if (index[0] === id) {
            index.pop()
            index.push(0)
            setAssignId(index)
        } else {
            index.pop()
            index.push(id)
            setAssignId(index)
            fetchSubmitAssignment(true, id)
        }
    }

    console.log(submitassignmentdata, student, user)
    const filterStudent = (submit_student) => {
        console.log("submit")
        console.log(submit_student)
        if (student.data !== undefined && user.data !== undefined) {

            if (student.data.data.length > 0 && user.data.data.length > 0) {
                console.log("j")
                const stds = student.data.data.filter(std => std.id === submit_student)
                console.log(stds)
                if (stds[0] && stds.length === 1) {
                    const std_detail = user.data.data.filter(usr => usr.id === stds[0].student)
                    return [std_detail, stds]
                }
            }
        }
    }
    // const student = []
    return (
        <div >
            {assignmentcreate !== undefined && <Table responsive style={{border:"1px solid grey"}} bordered>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Assignment</th>
                        <th>Deadline</th>
                        {props.from === 'teacher' && <th></th>}
                    </tr>
                </thead>
                <tbody>
                {assignmentcreate.length > 0 ? assignmentcreate.map((assign, index) => {

                    return (
                            <>
                                <tr>
                                    <td>{assign.title}</td>
                                    <td><a href={assign.assignment_pdf_create} target="_blank" style={{ color: "black" }}>Show Assignment</a></td>
                                    <td>{DateConverison(assign.deadline)}</td>
                                    {props.from === 'teacher' && <td><Badge style={{ cursor: "pointer" }} color="success" onClick={() => showMore(assign.id)}>Show Submitted</Badge></td>}
                                </tr>
                                {props.from === 'teacher' && <tr>
                                    {(submitassignmentdata !== undefined && submitassignmentdata.data !== undefined && submitassignmentdata.data !== null && assignId[0] === assign.id) ?
                                        <td colSpan="4">
                                            <Table responsive bordered>
                                                <thead style={{ backgroundColor: "rgb(255,255,204)" }}>
                                                    <tr>
                                                        <th>Student name</th>
                                                        <th>Roll No</th>
                                                        <th>Assignment</th>
                                                        <th>Submitted Date</th>
                                                    </tr>
                                                </thead>
                                                {(submitassignmentdata.data).length > 0 ? <tbody>
                                                    {submitassignmentdata.data.map((assign, index) => {
                                                        console.log(assign)
                                                        const [user, student] = filterStudent(assign.student_submit)
                                                        console.log(student, user)
                                                        DateConverison(assign.deadline)
                                                        return (
                                                            <tr key={index}>
                                                                <td>{user[0].first_name} {user[0].last_name}</td>
                                                                <td>{(student[0].roll_no)}</td>
                                                                <td><a href={assign.assignment_pdf_submit} target="_blank" style={{ color: "black" }}>Show Assignment</a></td>
                                                                <td>{DateConverison(assign.submited_date)}</td>
                                                            </tr>
                                                        )
                                                    })
                                                    }</tbody> : submitassignmentdata.data.length === 0 && submitassignmentstatus === 200 ? <tbody><tr><td colSpan="4">No assignment submitted </td></tr></tbody>
                                                    : submitassignmentstatus === 400 ? <tr><td colSpan="4">Error!</td></tr> : <Loading />}
                                            </Table>
                                        </td>
                                        : <tr><td></td></tr>}
                                </tr>}
                            </>
                    )

                })
                    : props.createassignmentdata.data.length === 0 && props.createassignmentstatus === 200 ? <p>No assignment for this subject, {props.subjectdata.subject_name}</p>
                        : props.createassignmentstatus === 400 ? <p>Error!</p> : <Loading />}
            </tbody>
            </Table>}
            {props.from === 'student' && <div>
                <h6>Submitted Assignment</h6>
                {submitassignmentdata.data !== undefined && <Table responsive bordered>
                    <thead>
                        <tr>
                            <th>Assignment</th>
                            <th>Submitted Date</th>
                        </tr>
                    </thead>
                    {submitassignmentdata.data.length > 0 ? <tbody>
                        {submitassignmentdata.data.map((assign, index) => {
                            DateConverison(assign.deadline)
                            return (
                                <tr key={index}>
                                    <td><a href={assign.assignment_pdf_submit} target="_blank" style={{ color: "black" }}>Show Assignment</a></td>
                                    <td>{DateConverison(assign.submited_date)}</td>
                                </tr>
                            )
                        })
                        }</tbody> : submitassignmentdata.data.length === 0 && submitassignmentstatus === 200 ? <p>No assignment submitted for this subject, {props.subjectdata.subject_name}</p>
                        : submitassignmentstatus === 400 ? <p>Error!</p> : <Loading />}
                </Table>}
            </div>}
            <SubmitAssignmentModal openModal={OpenModal} show={show} assignment={assignment} />
        </div>
    )
}

export default AssignedAssignmentTable

