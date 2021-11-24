import axios from 'axios'
import {isExpired} from 'react-jwt'

const Remove = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    localStorage.removeItem('role')
    localStorage.removeItem('class') 
    localStorage.removeItem('status')
    localStorage.removeItem('user_id')
    localStorage.removeItem('roll_no')
}

const Refresh = async() => {

    const access = localStorage.getItem('access')
    const refresh = localStorage.getItem('refresh')
    if (refresh !== null && refresh !== undefined && access !== null && access !== undefined){
        const refresh_expire = isExpired(refresh)
        console.log(refresh_expire)
        const access_expire = isExpired(access)
        if (refresh_expire === true){
            Remove()
            return null
        } else {
            if (access_expire !== true){
            console.log("hi")
              return access
            } else {
                console.log("hello")
              await axios.post('http://localhost:8000/api/refresh/', {'refresh':refresh}).then((response) => {
                  localStorage.setItem('access',response.data.access)
                  localStorage.setItem('refresh',response.data.refresh)
                  return response.data.access
              }).catch((err) => {
                  console.log(err)
              })
            }
        }
    }else{
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('role')
        localStorage.removeItem('class')
        return null
    }
}

export default Refresh