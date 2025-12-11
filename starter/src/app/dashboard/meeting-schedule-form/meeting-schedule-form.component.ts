import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { start } from '@popperjs/core';
import { ToastrService } from 'ngx-toastr';
import { MeetingRequestService } from 'src/app/core/service/meeting-request.service';

@Component({
  selector: 'app-meeting-schedule-form',
  templateUrl: './meeting-schedule-form.component.html',
  styleUrls: ['./meeting-schedule-form.component.scss'],
    providers: [ToastrService],

})
export class MeetingScheduleFormComponent {
 @Input('payload') payload! : string
  meetingForm! : FormGroup

  constructor(    
    public activeModal: NgbActiveModal,
    private meetingService : MeetingRequestService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    console.log(this.payload)
    this.initForm()
  }
  initForm() {
     this.meetingForm = new FormGroup({
        start: new FormControl('', [Validators.required]),
        end: new FormControl('', [Validators.required]),
        note: new FormControl('', [Validators.required]),
        title: new FormControl('', [Validators.required]),
    })
}
onSubmit(meetingForm:FormGroup){
    let request = {
      intern : localStorage.getItem('userId'),
      mentor : this.payload,
      start : meetingForm.value.start,
      end : meetingForm.value.end,
      note : meetingForm.value.note,
      title : meetingForm.value.title
    }
    this.meetingService.addRequest(request).subscribe((res:any)=>{
         if(res.data){
        this.toastr.success(res.message, 'Success');
        this.activeModal.close('Meeting request sent successfully');
      }else{
        this.toastr.error(res.message, 'Error');
        this.activeModal.close('Error while sending your meeting request');
      }
    })
}
}