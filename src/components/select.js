import { useState } from 'react'
import Select  from 'react-select'

export const RoleSelect = (props) => {

    const [currentrole, setCurrentrole] = useState({"value":"","label":""})

   const roleoptions = [
        {'value':'student','label':'Student'},
        {'value':'teacher','label':'Teacher'},
        {'value':'admin','label':'Admin'}
    ]
    return(
        <Select 
        options={roleoptions}
        placeholder="Select your role"
        value={props.value === "" ? props.value : currentrole}
        onChange={(data) => {
          setCurrentrole(data)
          props.handleChangeValue(data)
        }}
        />
    )
}