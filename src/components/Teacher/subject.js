import { ArrowRightCircle } from "react-feather"
import AssignmentCreateComponent from "./assignmentcreate"
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
    
  return(
    <div className="body">
    <h2 style={{textAlign:"center" , color:"#3895d3"}}>Class {ClassLabel[props.grade]}</h2>
    <div className="subject">
        { props.subjectdata.data.map((sub,index) => {
          return (
              <div key={index}>
              <h4><ArrowRightCircle size={20} color="blue"/> {sub.subject_name}</h4>
              <div style={{paddingLeft:"20px"}}>
              <small>Subject Code : {sub.subject_code}</small>
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