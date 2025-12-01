import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, of } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
  providers: [ToastrService],

})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  files: File[] = [];
  cv_file!:any
  file_selected = false;
  error = '';
  constructor(private formBuilder: FormBuilder , 
                private authService : AuthService,
                private router :Router,
                private toastr: ToastrService) {}
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fname: ['',Validators.required],
      lname: ['',Validators.required],
      email: ['',[Validators.required, Validators.email, Validators.minLength(5)]],
      gender:['',Validators.required],
      password: ['',[Validators.required, Validators.minLength(8)]],
      Cpassword: ['',[Validators.required, Validators.minLength(8)],this.matchValues('password')],
      birthdate: ['',Validators.required],
      departement: ['',Validators.required],
      fs:['',Validators.required],
      address: ['',Validators.required],
      phone : ['',[Validators.required,Validators.maxLength(8), Validators.minLength(8)]],
      termcondition: [false],
      


    
    });
  }
  onSelect(event:any) {
    //console.log(event);
    this.files.push(...event.addedFiles);
    this.cv_file=this.files[0]
    this.file_selected = true;
    // console.log(this.image)
  }
  
  onRemove(event:any) {
    //console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  matchValues(matchTo: string): AsyncValidatorFn  {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      const input = control.value;
      const isValid = control.root.value[matchTo] === input;
      return of(isValid ? null : { 'matchValues': true }).pipe(
        map((result) => {
          // Simulate some asynchronous processing
          // You can replace the setTimeout with your actual asynchronous operation
          return result;
        })
      );
    };
  }
  get f() {
    return this.registerForm.controls;
  }
  showForm(){
    console.log(this.registerForm)
  }
  onSubmit() {
    const payload = new FormData();
    payload.append("firstName",this.registerForm.value.fname)
    payload.append("lastName",this.registerForm.value.lname)
    payload.append("email", this.registerForm.value.email)
    payload.append("gender", this.registerForm.value.gender)
    payload.append("password",this.registerForm.value.password)
    payload.append("birthDate",this.registerForm.value.birthdate)
    payload.append("departement",this.registerForm.value.departement)
    payload.append("FS",this.registerForm.value.fs)
    payload.append("address",this.registerForm.value.address)
    payload.append("phone",this.registerForm.value.phone)
    payload.append("cv_file",this.cv_file)


    this.submitted = true;
    this.error = '';
    if (this.registerForm.invalid) {
      this.error = 'Invalid data !';
      this.submitted= false;
      this.toastr.error(this.error, 'Error');
      return;
    } else if(!this.file_selected){
      this.error = 'CV file is required!';
    }else{
      this.authService.signup(payload);
      this.toastr.success('Signup request sent succefully , waiting for admin confirmation!', 'Success');
    }
  }

  
  genders=["Male","Female"]
  fs=["Single","Maried","Divorced",]
  departements=["System","Networking","Development","Cyber Security"]
    
}



