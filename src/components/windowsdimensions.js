import { useEffect, useState } from "react"

const getWindowsDimensions = () => {
    const {innerHeight:height,innerWidth:width} = window
    return {
        height,
        width
    }
}

const useWindowsDimensions = () => {
    const [windowsDimensions,setWindowsDimensions] = useState(getWindowsDimensions())
    useEffect(() => {
        function handleResize(){
         setWindowsDimensions(getWindowsDimensions())
        }
        window.addEventListener('resize',handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return windowsDimensions
}

export default useWindowsDimensions