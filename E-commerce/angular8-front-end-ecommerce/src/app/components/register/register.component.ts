import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isSucces = false;
  message = '';
  registerForm: FormGroup;
  errorStatus: number;
  isLoading = false;
  isLoginFailed =false;

  constructor(private authService: AuthService, private router: Router, private spinner: NgxSpinnerService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.spinner.show();
    this.registerForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.minLength(2), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword : ['', [Validators.required, Validators.minLength(6)]]
    });
    this.spinner.hide();
  }

  onSubmit() {
    this.isLoading =true;
    const nom =this.registerForm.get('nom').value;
    const prenom =this.registerForm.get('prenom').value;
    const email = this.registerForm.get('email').value;
    const username = this.registerForm.get('username').value;
    const password = this.registerForm.get('password').value;
    const confirmPassword = this.registerForm.get('confirmPassword').value;
    if(password !== confirmPassword){
      this.isLoginFailed=true;
      this.isSucces=false;
      this.message ="Password should be ...";
      this.isLoading =false;
      return;
    }
    this.authService.register(nom,prenom,email,username,password).subscribe(
      data => {
        console.log(data);
        this.message ="Your registration success";
        this.isLoading =false;
        this.isSucces=true;
        this.isLoginFailed=false;
      },
      err => {
        this.isSucces=false;
        this.errorStatus = err.error.status;
        switch (this.errorStatus) {
          case 401:
            this.message = "Incorrect";
            break;
          case 500:
            this.message = err.error.message;
            break;
          default:
            this.message = err.error.message;
            break;
        }
        this.isLoading =false;
        this.isLoginFailed=true;
      }
    );
  }
}
