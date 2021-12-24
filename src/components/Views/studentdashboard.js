import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import {Card, Row, Col} from 'reactstrap'
import { CreateAssignmentFetch, SubmitAssignmentFetch } from '../../redux/action/assignmentaction'
import { FetchSubject } from '../../redux/action/subjectaction'
import Refresh from '../refresh'
import DisplaySubject from './subjectdash'

const DashboardStudent = () => {
 
  const bodyStyle = {
    padding:"0.5rem 0 0.5rem 0.5rem"
  }

  const cardStyle = {
    marginTop:"0.5rem",
    border:"none",
    backgroundImage: "linear-gradient(to right, #7393B3, #89CFF0)"
  }

    const [redirect, setRedirect] = useState(false)
    const subject = useSelector(state => state.subject.fetchlogs)
    const subjectstatus = useSelector(state => state.subject.status)
    const assignmentsubmit = useSelector(state => state.assignmentsubmit.fetchlogs)
    const assignmentcreate = useSelector(state => state.assignmentcreate.fetchlogs)
    const dispatch = useDispatch()

    useEffect(() => {
       fetchSubject()
       fetchSubmittedAssignment()
       fetchCreatedAssignment()
    }, [])

    const fetchSubject = async() => {
      const access = await Refresh()
      if (access !== null && access !== undefined) {
         dispatch(FetchSubject(access, localStorage.getItem('class')))
      } else {
        setRedirect(true)
      }
    }

    const fetchSubmittedAssignment = async() => {
      const access = await Refresh()
      if (access !== undefined && access !== null) {
        dispatch(SubmitAssignmentFetch(access, localStorage.getItem('user_id')))
      } else {
        setRedirect(true)
      }
    }

    const fetchCreatedAssignment = async() => {
      const access = await Refresh()
      if (access !== undefined && access !== null) {
        dispatch(CreateAssignmentFetch(access))
      } else {
        setRedirect(true)
      }
    }

    const createassignment = useMemo(() => {
        let createdassign = assignmentcreate
        if (createdassign !== undefined && subject !== undefined && createdassign.data !== undefined && subject.data !== undefined) {
          if (createdassign.data.length > 0 && subject.data.length > 0) {
            console.log(subject)
            const totalcreatedassign = createdassign.data.filter(assign => {
         
              return subject.data.find(sub => {
           
                return sub.id === assign.subject_create
              })
            })
            if (assignmentsubmit !== undefined && assignmentsubmit.data !== undefined) {
              if (totalcreatedassign.length > 0 && assignmentsubmit.data.length > 0) {
               const createassign = totalcreatedassign.filter(create => {
                  return !assignmentsubmit.data.find(assign => {
                    return create.id === assign.assignment
                  })
                }) 
                console.log(createassign)
                if (createassign.length > 0) {
                  const currentdatetime = new Date(Date.now())
                  const remaining = createassign.filter(assign => {
                    const deadline = new Date(assign.deadline)
                    return deadline - currentdatetime > 0
                  })
                  return [remaining.length, (createassign.length - remaining.length)]
                } else {
                  return null
                }
              } else {
                return null
              }
              
            } else {
              const currentdatetime = new Date(Date.now())
                  const remaining = totalcreatedassign.filter(assign => {
                    const deadline = new Date(assign.deadline)
                    return deadline - currentdatetime > 0
                  })
                  return [remaining.length, (totalcreatedassign.length - remaining.length)]
            }
          } else {
            return null
          }
        } else {
          return null
        }
    }, [assignmentcreate])


  if (!redirect) {
    return (
        <>
          <Row>
            <Col md='6' sm='6' lg='6'>
            <Card style={cardStyle}>
               <div style={bodyStyle}>
               <Row>
                   <Col sm='6' md='4' lg='4' xs='12'>
                     Name
                   </Col>
                   <Col sm='6' md='8' lg='8' xs='12'>
                     {localStorage.getItem("user_name")}
                     </Col>
                 </Row>
                 <Row>
                   <Col sm='6' md='4' lg='4' xs='12'>
                     Grade
                   </Col>
                   <Col sm='6' md='8' lg='8' xs='12'>
                     {localStorage.getItem("class")}
                     </Col>
                 </Row>
                 <Row>
                   <Col sm='6' md='4' lg='4' xs='12'>
                     Roll No
                   </Col>
                   <Col sm='6' md='8' lg='8' xs='12'>
                     {localStorage.getItem("roll_no")}
                     </Col>
                 </Row>
                 <Row>
                   <Col sm='6' md='4' lg='4' xs='12'>
                     Email
                   </Col>
                   <Col sm='6' md='8' lg='8' xs='12'>
                     {localStorage.getItem("email")}
                     </Col>
                 </Row>
                 <Row>
                   <Col sm='6' md='4' lg='4' xs='12'>
                     Phone No
                   </Col>
                   <Col sm='6' md='8' lg='8' xs='12'>
                     {localStorage.getItem("phone")}
                     </Col>
                 </Row>
               </div>
           </Card>
            </Col>
            <Col md='6' sm='6' lg='6'>
             <Card style={cardStyle}>
             <div style={bodyStyle}>
               <Row>
                   <Col sm='8' md='8' lg='8' xs='12'>
                     Total Subject
                   </Col>
                   <Col sm='4' md='4' lg='4' xs='12'>
                     {subject !== undefined && subject.data !== undefined ? subject.data.length : ""}
                     </Col>
                 </Row>
                 <Row>
                   <Col sm='8' md='8' lg='8' xs='12'>
                     Submitted Assignment
                   </Col>
                   <Col sm='4' md='4' lg='84' xs='12'>
                     {assignmentsubmit.data !== undefined ? <span style={{color:"green"}}>{assignmentsubmit.data.length}</span> : ""}
                     </Col>
                 </Row>
                 <Row>
                   <Col sm='8' md='8' lg='8' xs='12'>
                     Remaining Assignment
                   </Col>
                   <Col sm='4' md='4' lg='84' xs='12'>
                     {(createassignment !== undefined && createassignment !== null) ? <span style={{color:"orange"}}>{createassignment[0]}</span> : 0}
                     </Col>
                 </Row>
                 <Row>
                   <Col sm='8' md='8' lg='8' xs='12'>
                     Deadline Crossed Assignment
                   </Col>
                   <Col sm='4' md='4' lg='84' xs='12'>
                   {(createassignment !== undefined && createassignment !== null) ? <span style={{color:"red"}}>{createassignment[1]}</span> : 0}
                     </Col>
                 </Row>
               </div>
             </Card>
            </Col>
          </Row>
          <br/>
          {subject !== undefined && subject.data !== undefined &&<DisplaySubject subject={subject.data} status={subjectstatus}/>}
        </>  
    )
  } else {
    return <Navigate to='/login'/>
  }
}

export default DashboardStudent