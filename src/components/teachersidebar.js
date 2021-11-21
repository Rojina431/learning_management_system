import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent,SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {BookOpen, LogOut} from 'react-feather'
import './sidebar.css'
import { useEffect, useState } from 'react';
import { Link,Navigate } from 'react-router-dom';
import useWindowsDimensions from './windowsdimensions';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutUser } from '../redux/action/signupaction';
import { FetchSubject } from '../redux/action/subjectaction';
import Refresh from './refresh';

const TeacherSidebarComponent = () => {

    const [isCollapse, setIsCollapse] = useState(false)
    const subjectdata = useSelector(state=>state.subject.logs)
    const subjectstatus = useSelector(state =>state.subject.status)
    const classe = localStorage.getItem('class')
    let classes
    if (classe !== null && classe !== undefined){
      classes = classe.split(',')
    }
    const [Access,setAccess] = useState(localStorage.getItem('access') !== null || localStorage.getItem('access') !== undefined ? "True" : "False")
    const {height, width}  = useWindowsDimensions()
    const dispatch = useDispatch()
    useEffect(() => {
       if(width < 800){
         setIsCollapse(true)
       }else{
           setIsCollapse(false)
       }
    },[width])

    const toggleCollapse = () => {
        setIsCollapse(!isCollapse)
    }
    

    const ClassLabel = {
        1:'One',
        2:'Two',
        3:'Three',
        4:'Four',
        5:'Five',
        6:'Six',
        7:'Seven',
        8:'Eight',
        9:'Nine',
        10:'Ten'
    }

const Logoutuser = async() => {
    await dispatch(LogoutUser)
    setAccess("False")
}

const fetchClassSubject = async(grade) => {
  const access = await Refresh()
  if (access !== null && access !== undefined){
    dispatch(FetchSubject(access,grade,"",localStorage.getItem('id')))
  }else{
   setAccess("False")
  }
  
}

console.log(subjectdata,subjectstatus)

if (Access === "True"){
  return (
    <ProSidebar collapsed={isCollapse}>
    <Menu>
    <SidebarHeader>    
    <MenuItem onClick={toggleCollapse}><BookOpen/><span style={{fontWeight:"bolder",fontSize:"Larger"}}> E-Learning</span></MenuItem>
    <MenuItem>Dashboard<Link to='/'/></MenuItem>
    <MenuItem  onClick={Logoutuser}><span icon={LogOut}>Logout</span></MenuItem>
    </SidebarHeader>
     <SidebarContent> 
      <SubMenu title="Class" icon={<BookOpen/>}>
        {classes[0] ? classes.map((grade, index) => (
         <MenuItem key={index} onClick={() => fetchClassSubject(grade)}>{ClassLabel[grade]}</MenuItem>))
         :<MenuItem>No related subject!</MenuItem>}
       
      </SubMenu>
      </SidebarContent>
    </Menu>
  </ProSidebar>
)
        }else{
            return <Navigate to='/login'/>
        }
}

export default TeacherSidebarComponent