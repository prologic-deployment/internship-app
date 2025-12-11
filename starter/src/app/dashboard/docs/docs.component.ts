import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdDocsService } from 'src/app/core/service/ad-docs.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
  providers: [ToastrService]
})
export class DocsComponent {
    readonly requestUrl = environment.REQUEST_FILES_URL;
    readonly conventionUrl = environment.CONVENTION_FILES_URL;
    readonly cinUrl = environment.CIN_FILES_URL;
    readonly letterUrl = environment.LETTER_FILES_URL;
    readonly presenceUrl = environment.PRESENCE_FILES_URL;
    readonly reportUrl = environment.REPORT_FILES_URL;
    readonly attestationtUrl = environment.INTERN_CERTFICATE_FILES_URL;
    readonly cvtUrl = environment.INTERN_CERTFICATE_FILES_URL;

  requestFiles:File[] = [];
  conventionFiles:File[] = [];
  cinfiles:File[] = [];
  letterFiles:File[] = [];
  presenceFiles:File[] = [];
  reportFiles:File[] = [];
  cvFiles:File[] = [];

  userId!:string
  userDocs:any
  constructor(
    private docService: AdDocsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId")!
    this.getUserDocs()
  }

  getUserDocs(){
    this.docService.getUserDocs(this.userId).subscribe(res=>{
      this.userDocs = res.data
      console.log(this.userDocs)
    })
  }

onSelectCvfiles(event:any) {
    this.cvFiles.push(...event.addedFiles);
  }
  onRemoveCvfiles(event:any) {
    this.cvFiles.splice(this.cvFiles.indexOf(event), 1);
  }
  uploadCv(){
    const data = new FormData()
    data.append("cv_file", this.cvFiles[0])
    data.append("user", this.userId);
    this.docService.addCv(data).subscribe(res=>{
      this.cvFiles = []
      this.toastr.success('Document uploaded successfully',"Success")
      this.getUserDocs()
    })
  }



  onSelectRequestfiles(event:any) {
    this.requestFiles.push(...event.addedFiles);
  }
  onRemoveRequestfiles(event:any) {
    this.requestFiles.splice(this.requestFiles.indexOf(event), 1);
  }
  uploadRequest(){
    const data = new FormData()
    data.append("demande_stage", this.requestFiles[0])
    data.append("user", this.userId);
    console.log("formData",data)
    this.docService.addRequest(data).subscribe(res=>{
      this.reportFiles = []
      this.toastr.success('Document uploaded successfully',"Success")
      this.getUserDocs()
    })
  }
  onSelectConventionfiles(event:any) {
    this.conventionFiles.push(...event.addedFiles);
  }
  onRemoveConventionfiles(event:any) {
    this.conventionFiles.splice(this.conventionFiles.indexOf(event), 1);
  }
  uploadConvention(){
    const data = new FormData()
    data.append("convention", this.conventionFiles[0])
    data.append("user", this.userId);
    this.docService.addConvention(data).subscribe(res=>{
      this.reportFiles = []
      this.toastr.success('Document uploaded successfully',"Success")
      this.getUserDocs()
    })
  }


  onSelectCinfiles(event:any) {
    this.cinfiles.push(...event.addedFiles);
  }
  
  onRemoveCinfiles(event:any) {
    this.cinfiles.splice(this.cinfiles.indexOf(event), 1);
  }
  uploadCin(){
    const data = new FormData()
    data.append("cin", this.cinfiles[0])
    data.append("user", this.userId);
    this.docService.addCin(data).subscribe(res=>{
      this.cinfiles = []
      this.toastr.success('Document uploaded successfully',"Success")
      this.getUserDocs()
      })
  }



  onSelectLetterFiles(event:any) {
    this.letterFiles.push(...event.addedFiles);
  }
  onRemoveLetterFiles(event:any) {
    this.letterFiles.splice(this.letterFiles.indexOf(event), 1);
  }
  uploadLetter(){
    const data = new FormData()
    data.append("lettre_affectation", this.letterFiles[0])
    data.append("user", this.userId);
    this.docService.addLetter(data).subscribe(res=>{
      this.letterFiles = []
      this.toastr.success('Document uploaded successfully',"Success")
      this.getUserDocs()
        })
  }

  onSelectPresenceFiles(event:any) {
    this.presenceFiles.push(...event.addedFiles);
  }
  onRemovePresenceFiles(event:any) {
    this.presenceFiles.splice(this.presenceFiles.indexOf(event), 1);
  }

  uploadPresence(){
    const data = new FormData()
    data.append("fiche_presence", this.presenceFiles[0])
    data.append("user", this.userId);
    this.docService.addPresence(data).subscribe(res=>{
      this.presenceFiles = []
      this.toastr.success('Document uploaded successfully',"Success")
      this.getUserDocs()
        })
  }
  onSelectReportFiles(event:any) {
    this.reportFiles.push(...event.addedFiles);
  }
  onRemoveReportFiles(event:any) {
    this.reportFiles.splice(this.reportFiles.indexOf(event), 1);
  }
  uploadReport(){
    const data = new FormData()
    data.append("rapport", this.reportFiles[0])
    data.append("user", this.userId);
    this.docService.addReport(data).subscribe(res=>{
      this.reportFiles = []
      this.toastr.success('Document uploaded successfully',"Success")
      this.getUserDocs()
        })
  }

deleteCv(id:string){

    this.docService.deleteCv(id).subscribe(res=>{
      this.toastr.success('Document deleted successfully',"Success")
      this.getUserDocs()
        })
  }
  deleteReport(id:string){

    this.docService.deleteReport(id).subscribe(res=>{
      this.toastr.success('Document deleted successfully',"Success")
      this.getUserDocs()
        })
  }
  deletePresenceFile(id:string){
    this.docService.deletePresence(id).subscribe(res=>{
      this.toastr.success('Document deleted successfully',"Success")
      this.getUserDocs()
        })
  }
  deleteLetter(id:string){
    this.docService.deleteLetter(id).subscribe(res=>{
      this.toastr.success('Document deleted successfully',"Success")
      this.getUserDocs()
        })
  }
  deleteCin(id:string){
    this.docService.deleteCin(id).subscribe(res=>{
      this.toastr.success('Document deleted successfully',"Success")
      this.getUserDocs()
        })
  }
  deleteRequest(id:string){
    this.docService.deleteRequest(id).subscribe(res=>{
      this.toastr.success('Document deleted successfully',"Success")
      this.getUserDocs()
        })
  }
  deleteConvention(id:string){
    this.docService.deleteConvention(id).subscribe(res=>{
      this.toastr.success('Document deleted successfully',"Success")
      this.getUserDocs()
        })
  }




}
