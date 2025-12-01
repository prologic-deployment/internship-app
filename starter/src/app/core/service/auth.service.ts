import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly baseUrl = environment.INTERN_URL;
  token!: string;
  isAuthenticated = false;
  userID!: string
  userRole!: string
  user!: User;
  image!: string
  private apiLogin = `${this.baseUrl}/login`
  private api = `${this.baseUrl}/users/`;


  constructor(private http: HttpClient, private router: Router) {
    
  }



  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string, expiresIn: number, id: string, role: string, image: string }>(this.apiLogin, { email: email, password: password })
  }
  signup(data: FormData) {
    let success;
    this.http.post(this.api+"signup", data).subscribe(response => {
      let data: any;
      data = response
      console.log(data.message)
      if (!response) {
        success = false;
        return null;
      }
      success = true
      this.router.navigate(["/authentication/signin"])
      return response
    })
    return success;
  }
  checkAuth() {
    if (!(this.isAuthenticated)) {
      this.router.navigate(['login'])
    }
    return false;
  }
  getToken() { return this.token; }
  getUserId() { return this.userID }
  getRole() {
    this.http.get(this.api + localStorage.getItem("userId")).subscribe(response => {
      this.user = response as User;
      this.userRole != this.user.role
    })
  }
  setAuthTimer(expiresIn: number) {
    setTimeout(() => {
      this.logout();

    }, expiresIn * 1000);
  }

   saveAuthData(token: string, expirationDate: Date, role: string, image: string,userID:string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toLocaleString());
    localStorage.setItem("userId", userID);
    localStorage.setItem("role", role);
    localStorage.setItem("image", image);
  }

   clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("image");
  }

   getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration")
    this.userID != localStorage.getItem("userId")
    if (!token || !expirationDate) return null;
    return { token: token, expirationDate: new Date(expirationDate) 
    }
  }
  getUser() {
    return this.http.get<User>(this.api +"getUserByID/"+ localStorage.getItem("userId"))
  }
  logout() {
    // remove user from local storage to log user out
    this.clearAuthData()
    this.router.navigate(['/authentication/signin'])
  }
  sendCode(email: string) {
    let success;
   
      this.http.post(this.api+"forgotPassword", { email }).subscribe(response => {
      const idFP=response as string
      if (!response) {
        success = false;
        this.router.navigate(["/authentication/forgot"])
        return null;
      }
      success = true
      this.router.navigate(["/authentication/code"])
      localStorage.setItem("email", email);
      localStorage.setItem("idFP", idFP);
      return response
    }) 
  
    return success;
  }


  validateCode(code: string) {
    let success;
    var data = {
      code: code,
      email: localStorage.getItem("email")
    }
    this.http.post(this.api+"validateCode", data).subscribe(response => {
      if (!response) {
        success = false;
        return null;
      }
      success = true

      this.router.navigate(["/authentication/reset"])
      return response
    })
    return success;
  }

  changePassword(pass: string) {
    let success;
    pass
    let id= localStorage.getItem("idFP")
    let mail= localStorage.getItem("email")
      this.http.patch(this.api+"change-psw/"+id, {password:pass,email:mail}).subscribe(response => {
      if (!response) {
        success = false;
        return null;
      }
      success = true
      this.router.navigate(["/authentication/signin"])
      localStorage.removeItem("email")
      localStorage.removeItem("idFP")
      
      return response
    })
    return success;
  }
}
