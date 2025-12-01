<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LabServiceService {
  readonly baseUrl = environment.INTERN_URL;
  private api = `${this.baseUrl}/labs/`;
  
  constructor(private http: HttpClient, private router: Router) { }


  addLabRequest(labReq:any): Observable<any> {
    return this.http.post(this.api + "addaddVirtEnv",labReq).pipe(
      catchError(throwError)
    );
  }
  getLabRequest(labID:string): Observable<any> {
    return this.http.get(this.api + "getVirtEnv/"+labID).pipe(
      catchError(throwError)
    );
  }
  deleteLabRequest(labID:string): Observable<any> {
    return this.http.delete(this.api + "deleteVirtEnv/"+labID).pipe(
      catchError(throwError)
    );
  }

  userLabRequests(userID:string): Observable<any> {
    return this.http.get(this.api + "getUserLabEnv/"+userID).pipe(
      catchError(throwError)
    );
  }
  getActiveLabs(): Observable<any> {
    return this.http.get(this.api + "allActiveLabs/").pipe(
      catchError(throwError)
    );
  }
}
=======
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LabServiceService {
  readonly baseUrl = environment.INTERN_URL;
  private api = `${this.baseUrl}/labs/`;
  
  constructor(private http: HttpClient, private router: Router) { }


  addLabRequest(labReq:any): Observable<any> {
    return this.http.post(this.api + "addaddVirtEnv",labReq).pipe(
      catchError(throwError)
    );
  }
  getLabRequest(labID:string): Observable<any> {
    return this.http.get(this.api + "getVirtEnv/"+labID).pipe(
      catchError(throwError)
    );
  }
  deleteLabRequest(labID:string): Observable<any> {
    return this.http.delete(this.api + "deleteVirtEnv/"+labID).pipe(
      catchError(throwError)
    );
  }

  userLabRequests(userID:string): Observable<any> {
    return this.http.get(this.api + "getUserLabEnv/"+userID).pipe(
      catchError(throwError)
    );
  }
  getActiveLabs(): Observable<any> {
    return this.http.get(this.api + "allActiveLabs/").pipe(
      catchError(throwError)
    );
  }
}
>>>>>>> origin/main
