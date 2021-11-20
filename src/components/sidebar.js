import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent,SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {BookOpen} from 'react-feather'
import './sidebar.css'
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import useWindowsDimensions from './windowsdimensions';
import { FetchSubject } from '../redux/action/subjectaction';

const SidebarComponent = () => {

    const [isCollapse, setIsCollapse] = useState(false)
    const subjectdata = useSelector(state=>state.subject.logs)
    const subjectstatus = useSelector(state =>state.subject.status)
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

    const fetchSubject = () => {
      dispatch(FetchSubject(1,localStorage.getItem('class'),""))
    }

    console.log(subjectdata)

    const toggleCollapse = () => {
        setIsCollapse(!isCollapse)
    }

    return (
        <ProSidebar collapsed={isCollapse}>
        <Menu>
        <SidebarHeader>    
        <MenuItem onClick={toggleCollapse}><BookOpen/><span style={{fontWeight:"bolder",fontSize:"Larger"}}> E-Learning</span></MenuItem>
        <MenuItem>Dashboard<Link to='/'/></MenuItem>
        </SidebarHeader>
         <SidebarContent> 
          <SubMenu title="Subject" icon={<BookOpen/>}>
            {subjectdata.data[0]? subjectdata.data.map((sub, index) => {
              return (
                <MenuItem key={index}>{sub.subject_name.toUpperCase()}</MenuItem>
              )
            }):<MenuItem>No related subject!</MenuItem>}
           
          </SubMenu>
          </SidebarContent>
        </Menu>
      </ProSidebar>
    )
}
export default SidebarComponent