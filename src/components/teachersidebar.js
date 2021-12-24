import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent,SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {BookOpen, LogOut} from 'react-feather'
import './sidebar.css'
import { useEffect, useState } from 'react';
import { Link,Navigate } from 'react-router-dom';
import useWindowsDimensions from './windowsdimensions';
import { useDispatch } from 'react-redux';
import { LogoutUser } from '../redux/action/signupaction';
import { SiGotomeeting } from 'react-icons/si';

const TeacherSidebarComponent = () => {

    const [isCollapse, setIsCollapse] = useState(false)
    const classe = localStorage.getItem('class')
    let classes
    if (classe !== null && classe !== undefined){
      classes = classe.split(',')
    }
    const [Access,setAccess] = useState(localStorage.getItem('access') !== null || localStorage.getItem('access') !== undefined ? "True" : "False")
    const {height, width}  = useWindowsDimensions()
    const dispatch = useDispatch()
    useEffect(() => {
       if(width < 960){
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
         <MenuItem key={index}>{ClassLabel[grade]}<Link to="/teacher/subject" state={{ fromDashboard: "hello",grade:grade }}/></MenuItem>))
         :<MenuItem>No related subject!</MenuItem>}
       
      </SubMenu>
      <SubMenu title="Meeting" icon={<SiGotomeeting/> }>
      <MenuItem>Show Meetings <Link to='/teacher/meeting'/></MenuItem>
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