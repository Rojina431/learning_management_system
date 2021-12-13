import { useNavigate } from 'react-router'
import {Row, Col, Button, Card, Spinner} from 'reactstrap'

const DisplaySubject = (props) => {
   
    const navigate = useNavigate()

    const cardStyle = {
        marginTop:"0.5rem",
        border:"none",
        backgroundColor:"#A1D5F0",
        padding:"1rem"
      }

    const centerStyle = {
        positon:"fixed",
        top:"50%",
        left:"50%"
    }  

      const navigateToDetails = (subject) => {
         navigate('/student/class', {state:{url:"/", subject_id:subject.id, subject_name:subject.subject_name}})
      }

    return (
    <div>
        <p style={{textAlign:"center"}}>All Subjects</p>
        <Row>
            {props.subject.length > 0 ? props.subject.map((subject, index) => {
           return (  

           <Col md='4' sm='6' lg='3' key={index}>
               
               <Card style={cardStyle}>
                <p style={{textAlign:"center"}}>{subject.subject_name}</p>
              
                <Button className="button-color" onClick={() => navigateToDetails(subject)}>See details</Button>
                </Card>
            </Col>
            )
        }) : (props.status === 200 && props.subject.length === 0) ? <div style={centerStyle}>No subject to show</div> : <div style={centerStyle}><Spinner/></div>
        }
        </Row>
        </div>
    )
    
}

export default DisplaySubject