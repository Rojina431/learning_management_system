import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SignupUser } from '../../redux/action/signupaction'
import {Form, Label, Input, FormGroup, Button} from 'reactstrap'
import './signup.css'
import ErrorHandling from '../../errorhandling'

const SignupComponent = () => {

    const dispatch = useDispatch()
    const signupdata = useSelector(state => state.signup.logs)
    const signupstatus = useSelector(state => state.signup.status)
    const [loading, setLoading] = useState(false)
    const [postdata, setPostdata] = useState({"first_name":"","last_name":"","email":"","password":"","mobile":""})
    const [signuperr, setSignuperr] = useState({'passworderr':"","emailerr":"", "mobileerr":""})
  
    useEffect(() => {
      if(signupstatus === 400){
        const err = new ErrorHandling(signupdata)
        if (err.password !== ""){
          setSignuperr(prevState => ({...prevState, 'passworderr':err.password[0]}))
        }
        if (err.email !== "") {
            setSignuperr(prevState => ({...prevState, 'emailerr':err.email[0]}))
        }
        if (err.mobile !== "") {
            setSignuperr(prevState => ({...prevState, 'mobileerr':err.mobile[0]}))
        }
      }
    }, [signupstatus,signupdata])

    const Signup = async() => {
        console.log(postdata)
        setLoading(true)
        setSignuperr({'passworderr':"","emailerr":"", "mobileerr":""})

        await dispatch(SignupUser(postdata))
        setLoading(false)
        setPostdata({"first_name":"","last_name":"","email":"","password":"","mobile":""})
    }

    const handleChange = (e) => {
        console.log(e.target.value)
        setSignuperr({'passworderr':"","emailerr":"", "mobileerr":""})
        setPostdata(prevState => ({...prevState, [e.target.name]:e.target.value}))
    }
    
    return (
<div className="signup"> 
<div className="form-wrapper">  
<h2>E-Learning</h2> 
<Form className="form"> 
<div className="form-inner-wrapper">
 
    <FormGroup>
    <Label for="first_name">
      First Name
    </Label>
    <Input
      id="first_name"
      name="first_name"
      placeholder="Enter your first name"
      type="text"
      onChange={handleChange} 
      value={postdata.first_name}
    />
   
  </FormGroup>
  <FormGroup>
    <Label for="last_name">
     Last Name
    </Label>
    <Input
      id="last_name"
      name="last_name"
      placeholder="Enter your last name"
      type="text"
      onChange={handleChange} 
      value={postdata.last_name}
    />
  </FormGroup>
  <FormGroup>
    <Label for="email">
      Email
    </Label>
    <Input
      id="email"
      name="email"
      placeholder="Enter your email"
      type="email"
      onChange={handleChange} 
      value={postdata.email}
    />
     {signuperr.emailerr !== ""?<p className="error">{signuperr.emailerr}</p>:""}
  </FormGroup>
  <FormGroup>
    <Label for="password">
      Password
    </Label>
    <Input
      id="password"
      name="password"
      placeholder="Enter your password"
      type="password"
      onChange={handleChange} 
      value={postdata.password}
    />
    {signuperr.passworderr !== ""?<p className="error">{signuperr.passworderr}</p>:""}
  </FormGroup>
  <FormGroup>
    <Label for="phone">
      Phone No
    </Label>
    <Input
      id="phone"
      name="mobile"
      placeholder="Enter your phone no"
      onChange={handleChange}
      value={postdata.mobile}
    />
    {signuperr.mobileerr !== ""?<p className="error">{signuperr.mobileerr}</p>:""}
  </FormGroup>
  {loading ? <Button disabled className="button-color">
    Submit
  </Button> : <Button onClick={Signup} className="button-color">
    SignUp
  </Button> }
  </div>
</Form>
</div>
</div>

    )
}

export default SignupComponent