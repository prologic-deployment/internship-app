import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/service/auth.service';
import { LabServiceService } from 'src/app/core/service/lab-service.service';

@Component({
  selector: 'app-vm-request',
  templateUrl: './vm-request.component.html',
  styleUrls: ['./vm-request.component.scss'],
  providers: [ToastrService]
})
export class VmRequestComponent {
  // applicant!:FormGroup
  ressource!:FormGroup
  bookingDate!:FormGroup
  goals!:FormGroup
  offerId!:string
  labEnv!:any
  user! : any
  isLinear = true;
  constructor(
    private labService:LabServiceService,
    private authService:AuthService,
    private toastr: ToastrService,
    private router:Router,
    private route:ActivatedRoute,
    ) {}

  ngOnInit() {
    this.offerId = this.route.snapshot.paramMap.get('id')!;
    this.getCurrentUser()
    // this.applicant = new FormGroup({
    //   first: new FormControl('',[Validators.required]),
    //   last: new FormControl('',[Validators.required]),
    //   email: new FormControl('',[Validators.required, Validators.email]),
    //   departement: new FormControl('',[Validators.required]),
    // });
    this.ressource = new FormGroup({
      type: new FormControl('',[Validators.required]),
      backup: new FormControl('',[Validators.required]),
      ram: new FormControl(0,[Validators.required]),
      disk: new FormControl(0,[Validators.required]),
      processor: new FormControl(0,[Validators.required]),
      dhcp: new FormControl("",[Validators.required]),
    });
    this.bookingDate = new FormGroup({
      start: new FormControl('',[Validators.required]),
      end: new FormControl('',[Validators.required]),
    });
    this.goals = new FormGroup({
      goals: new FormControl('',[Validators.required]),
    });
  }
  getCurrentUser(){
    this.authService.getUser().subscribe(res=>{
      this.user = res
        })
  }
  

  onSubmit(){
    this.labEnv={
      "firstName":this.user.firstName,
      "lastName":this.user.lastName,
      "email":this.user.email,
      "departement":this.user.departement,
      "type":this.ressource.value.type,
      "backup":this.ressource.value.backup,
      "ram":this.ressource.value.ram,
      "disk":this.ressource.value.disk,
      "processor":this.ressource.value.processor,
      "dhcp":this.ressource.value.dhcp,
      "start":this.bookingDate.value.start,
      "end":this.bookingDate.value.end,
      "goals":this.goals.value.goals,
      "applicant":localStorage.getItem('userId'),
      "offer":this.offerId,
    }

    if (this.labEnv && (this.bookingDate.value.start <= this.bookingDate.value.end)){
    this.labService.addLabRequest(this.labEnv).subscribe(resultat => {
      this.toastr.success('Request sent successfully, now you have to wait until the manager accepts your request \n thanks for you patience.' , "Success")
      setTimeout(() => {
        this.router.navigate(["/dashboard/myRequest"])
      }, 600);
      
    })
  }else{
    this.toastr.error('Lab Request did not succeed, something went wrong!' , "Error")
    setTimeout(() => {
      this.router.navigate(["/dashboard/virt-env"])
    }, 600);
  }
  }

}
