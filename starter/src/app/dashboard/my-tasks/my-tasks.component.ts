import { Component, HostListener, ViewChild } from '@angular/core';
import { DatatableComponent, SortType } from '@swimlane/ngx-datatable';
import { InternsService } from 'src/app/core/service/interns.service';
import { TaskService } from 'src/app/core/service/task.service';
import { UserServiceService } from 'src/app/core/service/user-service.service';
import { environment } from 'src/environments/environment';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EditTaskComponent } from './edit-task/edit-task.component';
@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss'],
  providers: [ToastrService],
})
export class MyTasksComponent {
  readonly picsUrl = environment.INTERN_IMAGE_URL;
  offerID!: string
  tasks: any[] = []
  selectedTask:any
  showTaskDetails:boolean = false
  constructor(  
    private modalService:NgbModal,
    private taskService:TaskService,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }
  ngOnInit():void {
    this.getUserTasks()
  }
  
  selectTask(task:any){
    this.showTaskDetails = true
    this.taskService.getTaskById(task._id).subscribe(res=>{
      this.selectedTask=res.data
    })
  }
  getUserTasks(){
    this.taskService.getUserTasks(localStorage.getItem('userId')!).subscribe((res:any) => {
      this.tasks = res.data;
    })
  }
  updateStatus(selectedTask:any){
      const modalRef: NgbModalRef = this.modalService.open(EditTaskComponent, {
            ariaLabelledBy:'modal-basic-title',
            size: 'lg',
            keyboard: false ,
            backdropClass:'light-blue-backdrop'
          });
          modalRef.componentInstance.payload=selectedTask
          
          
          modalRef.result.then((res)=>{
            this.getUserTasks()
          })
    }
  
}
