export default function MoreErrorHandling(response){
    console.log(response)
    this.detail = response.detail || ""
    this.deadline = response.deadline || ""
    this.title = response.title || ""
    this.assignment_pdf_create = response.assignment_pdf_create || ""
    this.assignment_pdf_submit = response.assignment_pdf_submit || ""
    this.assignment = response.assignment || ""
    this.grade = response.assignment_grade || ""
    this.recording = response.recording || ""
}