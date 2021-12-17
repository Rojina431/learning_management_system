import { Spinner } from "reactstrap"

const Loading = () => {
    return(
        <div style={{position:"fixed",left:"60%",top:"50%", color:"blue"}}>
            <Spinner/>
        </div>
    )
}

export default Loading