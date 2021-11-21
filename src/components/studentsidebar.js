import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent,SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {BookOpen, LogOut} from 'react-feather'
import { Navigate } from 'react-router';
import './sidebar.css'
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import useWindowsDimensions from './windowsdimensions';
import { FetchSubject } from '../redux/action/subjectaction';
import { LogoutUser } from '../redux/action/signupaction';
import Refresh from './refresh';

const SidebarComponent = () => {

    const [isCollapse, setIsCollapse] = useState(false)
    const [redirect , setRedirect] = useState(false)
    const subjectdata = useSelector(state=>state.subject.logs)
    const subjectstatus = useSelector(state =>state.subject.status)
    const [access,setAccess] = useState(localStorage.getItem('access') !== null || localStorage.getItem('access') !== undefined ? "True" : "False")
    const {height, width}  = useWindowsDimensions()
    console.log(width)
    const dispatch = useDispatch()
    useEffect(() => {
       if(width < 800){
         setIsCollapse(true)
       }else{
           setIsCollapse(false)
       }
    },[width])

    useEffect(() => {
     fetchSubject()
    }, [])

    const fetchSubject = async() => {
      const access = await Refresh()
      if (access !== null){
        dispatch(FetchSubject(access,localStorage.getItem('class'),""))
      } else {
        setRedirect(true)
      }  
    }

    const Logoutuser = async() => {
      await dispatch(LogoutUser)
      setAccess("False")
    }


    const toggleCollapse = () => {
        setIsCollapse(!isCollapse)
    }
if (redirect || access === "False") {
  return <Navigate to='/login'/>
}else{
  return (
    <ProSidebar collapsed={isCollapse}>
    <Menu>
    <SidebarHeader>    
    <MenuItem onClick={toggleCollapse}><BookOpen/><span style={{fontWeight:"bolder",fontSize:"Larger"}}> E-Learning</span></MenuItem>
    <MenuItem>Dashboard<Link to='/'/></MenuItem>
    <MenuItem onClick={Logoutuser}><span icon={LogOut}>Logout</span></MenuItem>
    </SidebarHeader>
     <SidebarContent> 
      <SubMenu title="Subject" icon={<BookOpen/>}>
        {subjectdata.data !== undefined ? subjectdata.data.length > 0 ? subjectdata.data.map((sub, index) => {
          return (
            <MenuItem key={index}>{sub.subject_name.toUpperCase()}</MenuItem>
          )
        }): subjectstatus === 400 ?
        <MenuItem className="error">{subjectdata.detail}</MenuItem>:<MenuItem>No related subject!</MenuItem>:<MenuItem className="error">{subjectdata.detail}</MenuItem>}
       
      </SubMenu>
      </SidebarContent>
    </Menu>
  </ProSidebar>
)
}
}
export default SidebarComponent