import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MeetingRequestService } from 'src/app/core/service/meeting-request.service';
import { UserServiceService } from 'src/app/core/service/user-service.service';

@Component({
  selector: 'app-meeting-schedule-form',
  templateUrl: './meeting-schedule-form.component.html',
  styleUrls: ['./meeting-schedule-form.component.scss'],
  providers: [ToastrService],
})
export class MeetingScheduleFormComponent implements OnInit {
  @Input('payload') payload!: string;

  meetingForm!: FormGroup;
  mentorInfo!: any;
  loading: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private meetingService: MeetingRequestService,
    private userService: UserServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.meetingForm = new FormGroup({
    
      note: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(meetingForm: FormGroup) {
    if (meetingForm.invalid) {
      meetingForm.markAllAsTouched(); // show validation messages
      return;
    }

    this.loading = true;

    // Fetch mentor info
    this.userService.getUserByIdPTE(this.payload).subscribe(
      (res: any) => {
        this.mentorInfo = res;

        const request = {
          intern: localStorage.getItem('userId'),
          mentor: this.payload,
          mentorEmail: this.mentorInfo.email,
          mentorName: `${this.mentorInfo.firstName} ${this.mentorInfo.lastName}`,
          start: meetingForm.value.start,
          end: meetingForm.value.end,
          note: meetingForm.value.note,
          title: meetingForm.value.title,
        };

        // Send meeting request
        this.meetingService.addRequest(request).subscribe(
          (res: any) => {
            this.loading = false;
            if (res.data) {
              this.toastr.success(res.message, 'Success');
              this.activeModal.close('Meeting request sent successfully');
            } else {
              this.toastr.error(res.message, 'Error');
            }
          },
          (error) => {
            this.loading = false;
            this.toastr.error('Error while sending request', 'Error');
          }
        );
      },
      (error) => {
        this.loading = false;
        this.toastr.error('Error fetching mentor info', 'Error');
      }
    );
  }
}
