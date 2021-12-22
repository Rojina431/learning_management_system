export default function ErrorHandling(response){
    this.details = response.error.details || ""
    this.password = response.error.password || ""
    this.email = response.error.email || ""
    this.mobile = response.error.mobile || ""
    this.role = response.error.role || ""
    this.first_name = response.error.first_name || ""
    this.last_name = response.error.last_name || ""
    this.deadline = response.error.deadline || ""
    this.title = response.error.title || ""
    this.assignment_pdf_create = response.error.assignment_pdf_create || ""
    this.meeting_title = response.error.meeting_title || ""
    this.meeting_subject = response.error.meeting_subject || ""
    this.meeting_start = response.error.meeting_start || ""
    this.meeting_duration = response.error.meeting_duration || ""
}