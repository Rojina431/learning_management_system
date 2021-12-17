
import { useState } from "react"
import { Nav, NavItem } from "reactstrap"
import './navbar.css'
import ScheduleMeetingForm from "./Teacher/schedulemeeting"

const NavbarComponent = () => {

    const [open, setOpen] = useState(false)

    const OpenModal = (value) => {
      setOpen(value)
    }

    return (
        <>
        <Nav>
        <NavItem className="ml-auto">
                <div>
                {localStorage.getItem("role") === 'teacher' && <p style={{textTransform:"uppercase"}} onClick={() => OpenModal(true)}>Schedule a Meeting</p>}
                </div>
            </NavItem>
            <NavItem className="ms-auto">
                <div className="userName">
                <span>{localStorage.getItem("user_name")}</span>
                <small>{localStorage.getItem("role")}</small>  
                </div>
            </NavItem>
        </Nav>
        <ScheduleMeetingForm open={open} OpenModal={OpenModal} />
        </>
    )
}

export default NavbarComponent