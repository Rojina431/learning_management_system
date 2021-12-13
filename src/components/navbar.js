
import { Nav, NavItem } from "reactstrap"
import './navbar.css'

const NavbarComponent = () => {

    return (
        <>
        <Nav>
            <NavItem className="ms-auto">
                <div className="userName">
                <span>{localStorage.getItem("user_name")}</span>
                <small>{localStorage.getItem("role")}</small>  
                </div>
            </NavItem>
        </Nav>

        </>
    )
}

export default NavbarComponent