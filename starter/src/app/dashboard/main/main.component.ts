<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InternsService } from 'src/app/core/service/interns.service';
import { LabServiceService } from 'src/app/core/service/lab-service.service';
import { NetworkRequestService } from 'src/app/core/service/network-request.service';
import { ResultsService } from 'src/app/core/service/results.service';
import { TaskService } from 'src/app/core/service/task.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [ToastrService]  
})
export class MainComponent implements OnInit {
  userId!: string ;
  tasks: any[] = [];
  pending_tasks: any[] = [];
  in_progress_tasks: any[] = [];
  completed_tasks: any[] = [];
  totalLabs: number = 0;
  totalProjects: number = 0;
  totalTasks: number = 0;
  totalCompletedTasks: number = 0;
  totalPendingTasks: number = 0;
  totalInProgressTasks: number = 0;
  networkRequest!:any
  constructor(
    private taskService: TaskService,
    private toastr: ToastrService,  // assuming ToastrService is your service for showing notifications.
    private networkService: NetworkRequestService,
    private labService: LabServiceService,
    private resultService : ResultsService,
    private internsService: InternsService,  // assuming InternsService is your service for getting interns data.
  ) { }
  ngOnInit() {  
    this.userId = localStorage.getItem('userId')!;
    this.getUserTasks();  
    this.getUserLabs()
    this.getUserProjects()
    this. getUserNetworkRequest()
  }
  getUserLabs(){
    this.labService.userLabRequests(this.userId).subscribe((res) => {
      this.totalLabs = res.data.length;
    })
  }
  getUserProjects(){
    let evals = [];
    this.resultService.getResultsByIntern(this.userId).subscribe((res:any) => {
      evals = res.data
      for(let i=0;i<evals.length;i++){
        if(evals[i].isSelected){
          this.internsService.getOfferById(evals[i].quizId.offer).subscribe((resultat:any) => {
            this.totalProjects++
          })
        }
      }
    })
  }
  getUserTasks() {
    this.taskService.getUserTasks(this.userId).subscribe((res) => {
      this.tasks = res.data;
    this.totalTasks = this.tasks.length;
    this.totalCompletedTasks = this.tasks.filter((task) => task.status === 'COMPLETED').length
    this.completed_tasks = this.tasks.filter((task) => task.status === 'COMPLETED')
    this.totalPendingTasks = this.tasks.filter((task) => task.status === 'PENDING').length
    this.pending_tasks = this.tasks.filter((task) => task.status === 'PENDING')
    this.totalInProgressTasks = this.tasks.filter((task) => task.status === 'IN_PROGRESS').length
    this.in_progress_tasks = this.tasks.filter((task) => task.status === 'IN_PROGRESS')
    })
  }

  sendNetworkRequest(){
    let payload = {
      user : localStorage.getItem('userId'),
    }
    this.networkService.addRequest(payload).subscribe(res=>{
      this.toastr.success(res.message,"Success")
      this.getUserNetworkRequest()
    })
  }
  getUserNetworkRequest(){
    this.networkService.getUserNetworkRequest(localStorage.getItem('userId')).subscribe(res =>{
      this.networkRequest = res.data
    })
  }
}
=======
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InternsService } from 'src/app/core/service/interns.service';
import { LabServiceService } from 'src/app/core/service/lab-service.service';
import { NetworkRequestService } from 'src/app/core/service/network-request.service';
import { ResultsService } from 'src/app/core/service/results.service';
import { TaskService } from 'src/app/core/service/task.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [ToastrService]  
})
export class MainComponent implements OnInit {
  userId!: string ;
  tasks: any[] = [];
  pending_tasks: any[] = [];
  in_progress_tasks: any[] = [];
  completed_tasks: any[] = [];
  totalLabs: number = 0;
  totalProjects: number = 0;
  totalTasks: number = 0;
  totalCompletedTasks: number = 0;
  totalPendingTasks: number = 0;
  totalInProgressTasks: number = 0;
  networkRequest!:any
  constructor(
    private taskService: TaskService,
    private toastr: ToastrService,  // assuming ToastrService is your service for showing notifications.
    private networkService: NetworkRequestService,
    private labService: LabServiceService,
    private resultService : ResultsService,
    private internsService: InternsService,  // assuming InternsService is your service for getting interns data.
  ) { }
  ngOnInit() {  
    this.userId = localStorage.getItem('userId')!;
    this.getUserTasks();  
    this.getUserLabs()
    this.getUserProjects()
    this. getUserNetworkRequest()
  }
  getUserLabs(){
    this.labService.userLabRequests(this.userId).subscribe((res) => {
      this.totalLabs = res.data.length;
    })
  }
  getUserProjects(){
    let evals = [];
    this.resultService.getResultsByIntern(this.userId).subscribe((res:any) => {
      evals = res.data
      for(let i=0;i<evals.length;i++){
        if(evals[i].isSelected){
          this.internsService.getOfferById(evals[i].quizId.offer).subscribe((resultat:any) => {
            this.totalProjects++
          })
        }
      }
    })
  }
  getUserTasks() {
    this.taskService.getUserTasks(this.userId).subscribe((res) => {
      this.tasks = res.data;
    this.totalTasks = this.tasks.length;
    this.totalCompletedTasks = this.tasks.filter((task) => task.status === 'COMPLETED').length
    this.completed_tasks = this.tasks.filter((task) => task.status === 'COMPLETED')
    this.totalPendingTasks = this.tasks.filter((task) => task.status === 'PENDING').length
    this.pending_tasks = this.tasks.filter((task) => task.status === 'PENDING')
    this.totalInProgressTasks = this.tasks.filter((task) => task.status === 'IN_PROGRESS').length
    this.in_progress_tasks = this.tasks.filter((task) => task.status === 'IN_PROGRESS')
    })
  }

  sendNetworkRequest(){
    let payload = {
      user : localStorage.getItem('userId'),
    }
    this.networkService.addRequest(payload).subscribe(res=>{
      this.toastr.success(res.message,"Success")
      this.getUserNetworkRequest()
    })
  }
  getUserNetworkRequest(){
    this.networkService.getUserNetworkRequest(localStorage.getItem('userId')).subscribe(res =>{
      this.networkRequest = res.data
    })
  }
}
>>>>>>> origin/main
