<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  readonly baseUrl = environment.INTERN_URL;
  private api_task = `${this.baseUrl}/tasks`;
  constructor(private http: HttpClient) { }

   getUserTasks(userId:string): Observable<any> {
      return this.http.get(this.api_task + "/myTasks/"+userId).pipe(
        catchError(throwError)
      );
    }
    getTaskById(taskId:string): Observable<any> {
      return this.http.get(this.api_task + "/"+taskId).pipe(
        catchError(throwError)
      );
    }
    updateTask(task:any): Observable<any> {
      return this.http.put(this.api_task + "/"+task._id,task).pipe(
        catchError(throwError)
      );
    }  
    editTask(taskId: string,task:any): Observable<any> {
      return this.http.put(this.api_task +"/"+taskId+"/progress",task).pipe(
        catchError(throwError)
      );
    }
}
=======
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  readonly baseUrl = environment.INTERN_URL;
  private api_task = `${this.baseUrl}/tasks`;
  constructor(private http: HttpClient) { }

   getUserTasks(userId:string): Observable<any> {
      return this.http.get(this.api_task + "/myTasks/"+userId).pipe(
        catchError(throwError)
      );
    }
    getTaskById(taskId:string): Observable<any> {
      return this.http.get(this.api_task + "/"+taskId).pipe(
        catchError(throwError)
      );
    }
    updateTask(task:any): Observable<any> {
      return this.http.put(this.api_task + "/"+task._id,task).pipe(
        catchError(throwError)
      );
    }  
    editTask(taskId: string,task:any): Observable<any> {
      return this.http.put(this.api_task +"/"+taskId+"/progress",task).pipe(
        catchError(throwError)
      );
    }
}
>>>>>>> origin/main
