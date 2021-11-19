import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SignupUser } from '../../redux/action/signupaction'
import {Form, Label, Input, FormGroup, Button} from 'reactstrap'
import './signup.css'
import ErrorHandling from '../../errorhandling'
import { RoleSelect } from '../select'

const SignupComponent = () => {

    const dispatch = useDispatch()
    const signupdata = useSelector(state => state.signup.logs)
    const signupstatus = useSelector(state => state.signup.status)
    const [loading, setLoading] = useState(false)
    const [postdata, setPostdata] = useState({"first_name":"","last_name":"","email":"","password":"","mobile":"","role":""})
    const [signuperr, setSignuperr] = useState({'passworderr':"","emailerr":"", "mobileerr":"","roleerr":""})
    const [signupsuccess, setSignupsuccess] = useState("")

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
        if (err.role !== "") {
          setSignuperr(prevState => ({...prevState, 'roleerr':err.role[0]}))
      }if (err.first_name !== "") {
        setSignuperr(prevState => ({...prevState, 'firsterr':err.first_name[0]}))
    }if (err.last_name !== "") {
      setSignuperr(prevState => ({...prevState, 'lasterr':err.last_name[0]}))
    }
      }else if(signupstatus===200){
        setSignupsuccess("User registered successfully")
      }
    }, [signupstatus,signupdata])

    const Signup = async() => {
        setLoading(true)
        Remove()
        await dispatch(SignupUser(postdata))
        setLoading(false)
        setPostdata({"first_name":"","last_name":"","email":"","password":"","mobile":"","role":""})
    }

    const handleChange = (e) => {
        Remove()
        setLoading(false)
        setPostdata(prevState => ({...prevState, [e.target.name]:e.target.value}))
    }
    

    const handleChangeRole = (data) => {
      Remove()
      if (data !== undefined){
          setPostdata(prevState=>({...prevState,'role':data.value}))
      }
  }

  const Remove = () => {
    setSignupsuccess("")
    setSignuperr({'passworderr':"","emailerr":"", "mobileerr":"","roleerr":"","firsterr":"","lasterr":""})
  }


    return (
<div className="signup"> 
<div className="img"></div>
<div className="form-wrapper">  

<Form className="form"> 
<h2>E-Learning</h2> 
<div className="form-inner-wrapper">
{signuperr.detailserr !== ""?<p className="error">{signuperr.detailserr}</p>:""}
{signupsuccess !== ""?<p className="success">{signupsuccess}</p>:""}
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
  {signuperr.firsterr !== ""?<p className="error">{signuperr.firsterr}</p>:""} 
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
  {signuperr.lasterr !== ""?<p className="error">{signuperr.lasterr}</p>:""}  
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
  <FormGroup>
    <Label for="role">
      Role
    </Label>
    <RoleSelect name="role" handleChangeValue={handleChangeRole} value={postdata.role}/>
    {signuperr.roleerr !== ""?<p className="error">{signuperr.roleerr}</p>:""}
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