export default function MoreErrorHandling(response){
    console.log(response)
    // this.details = response.error.details || ""
    // this.password = response.error.password || ""
    // this.email = response.error.email || ""
    // this.mobile = response.error.mobile || ""
    // this.role = response.error.role || ""
    // this.first_name = response.error.first_name || ""
    // this.last_name = response.error.last_name || ""
    this.detail = response.detail || ""
    this.deadline = response.deadline || ""
    this.title = response.title || ""
    this.assignment_pdf_create = response.assignment_pdf_create || ""
    this.assignment_pdf_submit = response.assignment_pdf_submit || ""
    this.assignment = response.assignment || ""
    this.grade = response.assignment_grade || ""
}