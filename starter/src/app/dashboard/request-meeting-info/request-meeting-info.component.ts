import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MeetingRequestService } from 'src/app/core/service/meeting-request.service';
import { UserServiceService } from 'src/app/core/service/user-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-request-meeting-info',
  templateUrl: './request-meeting-info.component.html',
  styleUrls: ['./request-meeting-info.component.scss'],
  providers : [ToastrService]
})
export class RequestMeetingInfoComponent {
@Input('payload') payload!:string
  event!:any
  currentUserId!:string
  mentor!:any
  imagesURL = environment.PTE_IMAGES
  internImagesURL = environment.INTERN_IMAGE_URL

  constructor(
    public activeModal: NgbActiveModal,
    public userService:UserServiceService,
    public requestService:MeetingRequestService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    ) {}
  ngOnInit(): void {
    this.currentUserId=localStorage.getItem('userId')!
    this.getEvent()
  }
  getEvent(){
   return this.requestService.getRequestById(this.payload).subscribe(resultat => {
      this.event = resultat.data as any
      this.userService.getUserByIdPTE(this.event.mentor).subscribe((res:any)=>{
        this.mentor = res as any
      })
    })

}

}
