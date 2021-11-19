export default function ErrorHandling(response){
    this.details = response.error.details || ""
    this.password = response.error.password || ""
    this.email = response.error.email || ""
    this.mobile = response.error.mobile || ""
    this.role = response.error.role || ""
    this.first_name = response.error.first_name || ""
    this.last_name = response.error.last_name || ""
}