import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingRequestService {

  readonly baseUrl = environment.INTERN_URL;
  private api_meeting = `${this.baseUrl}/meeting`;

  constructor(private http: HttpClient) { }


  addRequest(meeting: any): Observable<any> {
    return this.http.post(`${this.api_meeting}/addMeetingRequest`, meeting);
  }
  getUserMeetingRequest(userId: any): Observable<any> {
    return this.http.get(`${this.api_meeting}/getUserMeetingRequest/` + userId).pipe(
      catchError(throwError)
    );
  }
  getRequestById(id: string): Observable<any> {
    return this.http.get(this.api_meeting + "/getRequestById/" + id).pipe(
      catchError(throwError)
    );
  }

}
