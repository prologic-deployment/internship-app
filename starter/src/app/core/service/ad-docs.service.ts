import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdDocsService {
readonly baseUrl = environment.INTERN_URL;
  private api = `${this.baseUrl}/docs/`;
  
  constructor(private http: HttpClient) { }
  addCv(data:any): Observable<any> {
    return this.http.patch(this.api+'add_cv' ,data).pipe(
      catchError(throwError)
    );
  }
  addRequest(data:any): Observable<any> {
    return this.http.patch(this.api+'add_demande_stage' ,data).pipe(
      catchError(throwError)
    );
  }
  addConvention(data:any): Observable<any> {
    return this.http.patch(this.api+'add_convention' ,data).pipe(
      catchError(throwError)
    );
  }
  addCin(data:any): Observable<any> {
    return this.http.patch(this.api+'add_cin' ,data).pipe(
      catchError(throwError)
    );
  }
  addLetter(data:any): Observable<any> {
    return this.http.patch(this.api+'add_lettre_affectation' ,data).pipe(
      catchError(throwError)
    );
  }
  addPresence(data:any): Observable<any> {
    return this.http.patch(this.api+'add_fiche_presence' ,data).pipe(
      catchError(throwError)
    );
  }
  addReport(data:any): Observable<any> {
    return this.http.patch(this.api+'add_rapport' ,data).pipe(
      catchError(throwError)
    );
  }
  deleteCv(data:any): Observable<any> {
    return this.http.patch(this.api+'delete_cv/'+data,{}).pipe(
      catchError(throwError)
    );
  }
  deleteRequest(data:any): Observable<any> {
    return this.http.patch(this.api+'delete_demande_stage/'+data,{}).pipe(
      catchError(throwError)
    );
  }
  deleteConvention(data:any): Observable<any> {
    return this.http.patch(this.api+'delete_convention/'+data,{}).pipe(
      catchError(throwError)
    );
  }
  deleteCin(data:any): Observable<any> {
    return this.http.patch(this.api+'delete_cin/'+data,{}).pipe(
      catchError(throwError)
    );
  }
  deleteLetter(data:any): Observable<any> {
    return this.http.patch(this.api+'delete_lettre_affectation/'+data,{}).pipe(
      catchError(throwError)
    );
  }
  deletePresence(data:any): Observable<any> {
    return this.http.patch(this.api+'delete_fiche_presence/'+data,{}).pipe(
      catchError(throwError)
    );
  }
  deleteReport(data:any): Observable<any> {
    return this.http.patch(this.api+'delete_rapport/'+data,{}).pipe(
      catchError(throwError)
    );
  }




  getUserDocs(userId:any): Observable<any> {
    return this.http.get(this.api+'getUserDocs/'+userId).pipe(
      catchError(throwError)
    );
  }
}
