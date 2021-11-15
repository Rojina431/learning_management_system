export default function ErrorHandling(response){
    this.password = response.error.password || ""
    this.email = response.error.email || ""
    this.mobile = response.error.mobile || ""
}