import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent,SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {BookOpen} from 'react-feather'
import './sidebar.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useWindowsDimensions from './windowsdimensions';

const SidebarComponent = () => {

    const [isCollapse, setIsCollapse] = useState(false)
    const {height, width}  = useWindowsDimensions()
    console.log(width)

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

    return (
        <ProSidebar collapsed={isCollapse}>
        <Menu>
        <SidebarHeader>    
        <MenuItem onClick={toggleCollapse}><BookOpen/><span style={{fontWeight:"bolder",fontSize:"Larger"}}> E-Learning</span></MenuItem>
        <MenuItem>Dashboard<Link to='/'/></MenuItem>
        </SidebarHeader>
         <SidebarContent> 
          <SubMenu title="Subject" icon={<BookOpen/>}>
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
          </SidebarContent>
        </Menu>
      </ProSidebar>
    )
}
export default SidebarComponent