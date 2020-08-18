import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  errorStatus: number;
  isLoading = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    private router: Router, private spinner: NgxSpinnerService, private fb: FormBuilder) { }

  ngOnInit() {
    this.spinner.show();
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.spinner.hide();
  }


  onSubmit() {
    this.isLoading = true;
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.isLoading = false;
        window.location.href = 'home'; // try to find any solution
      },
      err => {
        this.errorStatus = err.error.status;
        switch (this.errorStatus) {
          case 401:
            this.errorMessage = "Username or password incorrect";
            break;
          case 500:
            this.errorMessage = "Communication with server field";
            break;
          default:
            this.errorMessage = err.error.message;
            break;
        }
        this.isLoading = false;
        this.isLoginFailed = true;
      }
    )
  }
  

}
