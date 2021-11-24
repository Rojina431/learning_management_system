import { Loader } from "react-feather"

const Loading = () => {
    return(
        <div style={{position:"fixed",left:"50%",top:"50%"}}>
            <Loader/>
        </div>
    )
}

export default Loading