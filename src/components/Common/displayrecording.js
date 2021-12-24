import { Fragment } from "react"
import { Link } from "react-router-dom"
import { Card, Col, Row } from "reactstrap"
import Loading from "../loading"

const DisplayRecording = (props) => {
    console.log(props)
    return (
        <Fragment>
            {props.recording !== undefined && props.recording.data !== undefined &&<div>
                { props.recording.data.length > 0 ? 
                <Row>{props.recording.data.map((record , index) => {
                    return (
                    <Col key={index} md="4" lg="3" sm='2' xs='1'>   
                    <Card style={{height:"4rem", textAlign:"center", backgroundImage: "linear-gradient(to right, #7393B3, #89CFF0)", border:"none"}}>
                            <a style={{textDecoration:"none", marginTop:"0.8rem"}} href={`${record.recording}`} target="_blank">Recording {index + 1}</a>    
                    </Card>
                    </Col>
                    )
                })}
                </Row> : props.recording.data.length === 0 && props.status === 200 ? <p style={{position:'fixed', left:"60%"}}>No meeting scheduled!</p> : <Loading/> }
                </div>}
        </Fragment>
    )
}

export default DisplayRecording