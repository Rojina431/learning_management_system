import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {LoginUser } from '../../redux/action/signupaction'
import {Form, Label, Input, FormGroup, Button} from 'reactstrap'
import './signup.css'
import ErrorHandling from '../../errorhandling'
import { RoleSelect } from '../select'

const LoginComponent = () => {

    const dispatch = useDispatch()
    const logindata = useSelector(state => state.login.logs)
    const loginstatus = useSelector(state => state.login.status)
    const [loading, setLoading] = useState(false)
    const [postdata, setPostdata] = useState({"email":"","password":"","mobile":"","role":""})
    const [loginerr, setLoginerr] = useState({'passworderr':"","emailerr":"", "roleerr":"","detailserr":""})
   console.log(logindata,loginstatus)
    useEffect(() => {
      if(loginstatus === 400){
        const err = new ErrorHandling(logindata)
        if (err.details !== "") {
            setLoginerr(prevState => ({...prevState, 'detailserr':err.details}))
        }
        if (err.password !== ""){
          setLoginerr(prevState => ({...prevState, 'passworderr':err.password[0]}))
        }
        if (err.email !== "") {
            setLoginerr(prevState => ({...prevState, 'emailerr':err.email[0]}))
        }
        if (err.role !== "") {
            setLoginerr(prevState => ({...prevState, 'roleerr':err.role[0]}))
        }
      }
    }, [loginstatus,logindata])

    const Login = async() => {
        setLoading(true)
        setLoginerr({'passworderr':"","emailerr":"", "roleerr":"","detailserr":""})

        dispatch(LoginUser(postdata))
        setLoading(false)
        setPostdata({"email":"","password":"","role":""})
    }

    const handleChange = (e) => {
        console.log(e.target.value)
        setLoginerr({'passworderr':"","emailerr":"", "roleerr":"","detailserr":""})
        setPostdata(prevState => ({...prevState, [e.target.name]:e.target.value}))
    }

    const handleChangeRole = (data) => {
        setLoginerr({'passworderr':"","emailerr":"", "roleerr":"","detailserr":""})
        if (data !== undefined){
            setPostdata(prevState=>({...prevState,'role':data.value}))
        }
    }
    
return (
<div className="signup"> 
<div className="img"></div>
<div className="form-wrapper">  

<Form className="form"> 
<h2>E-Learning</h2> 
<div className="form-inner-wrapper">
{loginerr.detailserr !== ""?<p className="error">{loginerr.detailserr}</p>:""}
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
     {loginerr.emailerr !== ""?<p className="error">{loginerr.emailerr}</p>:""}
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
    {loginerr.passworderr !== ""?<p className="error">{loginerr.passworderr}</p>:""}
  </FormGroup>
  <FormGroup>
    <Label for="role">
      Role
    </Label>
    <RoleSelect name="role" handleChangeValue={handleChangeRole} value={postdata.role}/>
    {loginerr.roleerr !== ""?<p className="error">{loginerr.roleerr}</p>:""}
  </FormGroup>
  {loading ? <Button disabled className="button-color">
  Login
  </Button> : <Button onClick={Login} className="button-color">
  Login
  </Button> }
  </div>
</Form>
</div>
</div>

    )
}

export default LoginComponent