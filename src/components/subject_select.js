import { useEffect, useState } from "react"
import Select from "react-select"

const SubjectSelect = (props) => {

    const [currentSubject, setCurrentSubject] = useState({value:null, label:""})
    const [subject, setSubject] = useState([])

    useEffect(() => {
     if (props.subject.length > 0) {
         props.subject.map((sub) => {
          setSubject(prevState => ([...prevState, {"value":sub.id, "label":sub.subject_name}]))
         })
     }
    }, [props.subject])

    return (
        <Select
         options={subject}
         placeholder="subject"
         value={props.value === null || props.value === "" ? props.value : currentSubject}
         onChange={(data) => {
         setCurrentSubject(data)
         props.handleSubjectChange(data)
         }}
        />
    )
}

export default SubjectSelect