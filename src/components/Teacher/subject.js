import { ArrowRightCircle } from "react-feather"
import AssignmentCreateComponent from "./assignmentcreate"
import Recording from "./recording"
const SubjectComponent = (props) => {

    const ClassLabel = {
        1:'one',
        2:'two',
        3:'three',
        4:'four',
        5:'five',
        6:'six',
        7:'seven',
        8:'eight',
        9:'nine',
        10:'ten'
    }

    const pStyle = {
      fontSize:"500",
    }

    const smallStyle = {
      fontSize:"small",
      paddingLeft:"20px"
    }
    
  return(
    <div className="body">
    <h2 style={{textAlign:"center" , color:"#3895d3"}}>Class {ClassLabel[props.grade]}</h2>
    <div className="subject">
        { props.subjectdata.data.map((sub,index) => {
          return (
              <div key={index}>
              <ArrowRightCircle size={20} color="blue"/> <span style={pStyle} className="breakLine">{sub.subject_name} </span><small style={smallStyle}>Subject Code : {sub.subject_code}</small>
              
              <div style={{paddingLeft:"20px"}}>
              <br/>
              <Recording subjectdata={sub}/>
              <br/>
              <AssignmentCreateComponent subjectdata={sub}/>
              </div>
              </div>
          )
      }) }
    </div>
    </div>
  )
} 

export default SubjectComponent