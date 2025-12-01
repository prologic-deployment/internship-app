import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ResultsService } from 'src/app/core/service/results.service';
import { TaskService } from 'src/app/core/service/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
  providers: [ToastrService]

})
export class EditTaskComponent {
  @Input('payload') payload!: any

  editTaskForm!: FormGroup

  constructor(
    public activeModal: NgbActiveModal,
    private taskService:TaskService,
    private resultService:ResultsService,
    private toastr: ToastrService) { }


    ngOnInit(): void {
      this.editTaskForm = new FormGroup({
        progress: new FormControl('', [Validators.required]),
      })
      this.patchForm()
    }
    patchForm(){
      this.editTaskForm.patchValue({
        progress: this.payload.progress,
      })
    }
    onSubmit(taskForm:FormGroup){
      const task = {
        progress : taskForm.value.progress,
      }
      if(task){
        this.taskService.editTask(this.payload._id, task).subscribe(res=>{
          if(res.data){
            this.toastr.success('Task updated successfully')
            this.activeModal.close('close')
          }else{
            this.toastr.error('Error while updating task')
          }
        })
      }
      
    }

}
