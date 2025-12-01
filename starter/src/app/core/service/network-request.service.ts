import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NetworkRequestService {

  readonly baseUrl = environment.INTERN_URL;
  private api_network= `${this.baseUrl}/network`;
 
  constructor(private http: HttpClient) { }

  addRequest(network : any):Observable<any> {
    return this.http.post(`${this.api_network}/addNetworkRequest`, network);
  }
  getUserNetworkRequest(userId : any):Observable<any> {
    return this.http.get(`${this.api_network}/getUserNetworkRequest/`+userId);
  }
}
