import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  readonly baseUrl = environment.INTERN_URL;
  private api_res = `${this.baseUrl}/results`;

  constructor(private http: HttpClient) { }

  saveResults(result:any){
    return this.http.post(this.api_res + "/",result).pipe(
      catchError(throwError)
    );
  }
  getResultsByIntern(internId: string){
    return this.http.get(this.api_res + "/result/"+internId).pipe(
      catchError(throwError)
    );
  }
}
