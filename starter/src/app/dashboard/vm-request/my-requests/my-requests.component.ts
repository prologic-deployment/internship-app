<<<<<<< HEAD
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LabServiceService } from 'src/app/core/service/lab-service.service';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss'],
  providers: [ToastrService],

})
export class MyRequestsComponent {

  isCollapsed: boolean[] = [];
  labs: any[] = [];
  temp: any[] = [];
  role:string=""

  constructor(
    private labService: LabServiceService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router) {  }
  ngOnInit() {
    this.role=localStorage.getItem('role')!
    this.getUserLabRequest()    
  }
 getUserLabRequest(){
  this.labService.userLabRequests(localStorage.getItem('userId')!).subscribe(resultat => {
    this.labs = resultat.data;
    this.temp = resultat.data;
 })
}
toggleCollapse(index: number): void {
  // Toggle the collapse state for the clicked lab item
  this.isCollapsed[index] = !this.isCollapsed[index];
}
  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d: any) {
      return d.firstName.toLowerCase().indexOf(val) !== -1 ||
            d.lastName.toLowerCase().indexOf(val) !== -1 ||
            d.email.toLowerCase().indexOf(val) !== -1 ||
            //d.code.toLowerCase().indexOf(val) !== -1 ||
            d.departement.toLowerCase().indexOf(val) !== -1 ||
            !val;
    });
  }
  
  handleLabSearch(event : any){
    const search:string = event.target.value;
    if(search.length > 0){
      this.labs = this.labs.filter(lab => lab.firstName.toLowerCase().includes(search.toLowerCase()) || lab.lastName.toLowerCase().includes(search.toLowerCase()) || lab.code.toLowerCase().includes(search.toLowerCase()) || lab.status.toLowerCase().includes(search.toLowerCase()) )
    }else{
      if (this.role !== "LAB-MANAGER"){
        this.getUserLabRequest()
    }
    }
  }
  
  
}
=======
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LabServiceService } from 'src/app/core/service/lab-service.service';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss'],
  providers: [ToastrService],

})
export class MyRequestsComponent {

  isCollapsed: boolean[] = [];
  labs: any[] = [];
  temp: any[] = [];
  role:string=""

  constructor(
    private labService: LabServiceService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router) {  }
  ngOnInit() {
    this.role=localStorage.getItem('role')!
    this.getUserLabRequest()    
  }
 getUserLabRequest(){
  this.labService.userLabRequests(localStorage.getItem('userId')!).subscribe(resultat => {
    this.labs = resultat.data;
    this.temp = resultat.data;
 })
}
toggleCollapse(index: number): void {
  // Toggle the collapse state for the clicked lab item
  this.isCollapsed[index] = !this.isCollapsed[index];
}
  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d: any) {
      return d.firstName.toLowerCase().indexOf(val) !== -1 ||
            d.lastName.toLowerCase().indexOf(val) !== -1 ||
            d.email.toLowerCase().indexOf(val) !== -1 ||
            //d.code.toLowerCase().indexOf(val) !== -1 ||
            d.departement.toLowerCase().indexOf(val) !== -1 ||
            !val;
    });
  }
  
  handleLabSearch(event : any){
    const search:string = event.target.value;
    if(search.length > 0){
      this.labs = this.labs.filter(lab => lab.firstName.toLowerCase().includes(search.toLowerCase()) || lab.lastName.toLowerCase().includes(search.toLowerCase()) || lab.code.toLowerCase().includes(search.toLowerCase()) || lab.status.toLowerCase().includes(search.toLowerCase()) )
    }else{
      if (this.role !== "LAB-MANAGER"){
        this.getUserLabRequest()
    }
    }
  }
  
  
}
>>>>>>> origin/main
