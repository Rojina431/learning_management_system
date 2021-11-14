import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Button, FormControl, InputLabel, Input} from '@mui/material'
import { SignupUser } from '../../redux/action/signupaction'


const SignupComponent = () => {

    const dispatch = useDispatch()
    // const signupdata = useSelector(state => state.signup.logs)
    // const signupstatus = useSelector(state => state.signup.status)
    const [loading, setLoading] = useState(false)
    const [postdata, setPostdata] = useState({"first_name":"","last_name":"","email":"","password":"","mobile":""})

    const Signup = async() => {
        console.log(postdata)
        setLoading(true)
        await dispatch(SignupUser(postdata))
        setLoading(false)
        setPostdata({"first_name":"","last_name":"","email":"","password":"","mobile":""})
    }

    const handleChange = (e) => {
        console.log(e.target.value)
      setPostdata(prevState => ({...prevState, [e.target.name]:e.target.value}))
    }

    return (
         <form>
             <InputLabel htmlFor="first_name" >First Name:</InputLabel>
             <Input name="first_name" placeholder="Enter your first name" onChange={handleChange} value={postdata.first_name}/>
             <InputLabel htmlFor="last_name" >Last Name:</InputLabel>
             <Input name="last_name" placeholder="Enter your last name" onChange={handleChange} value={postdata.last_name}/>
             <InputLabel htmlFor="email">Email:</InputLabel>
             <Input name="email" placeholder="Enter your email" onChange={handleChange} value={postdata.email}/>
             <InputLabel htmlFor="password">Password:</InputLabel>
             <Input name="password" placeholder="Enter your password" onChange={handleChange} value={postdata.password}/>
             <InputLabel htmlFor="mobile">Phone No:</InputLabel>
             <Input name="mobile" placeholder="Enter your phone no" onChange={handleChange} value={postdata.mobile}/>
             {loading ? <Button disabled>Signup</Button>:<Button onClick={Signup}>Signup</Button>}
         </form>
    )
}

export default SignupComponent