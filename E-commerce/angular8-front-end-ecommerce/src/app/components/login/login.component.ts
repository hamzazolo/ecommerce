import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService : AuthService, private tokenStorage : TokenStorageService, private router:Router) { }

  ngOnInit() {
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }


  onSubmit(){
    this.authService.login(this.form).subscribe(
      data =>{
       
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.isLoggedIn = true;
        this.isLoginFailed=false;
        this.roles= this.tokenStorage.getUser().roles;
        this.reloadPage();
    
      },
      err=>{
        this.errorMessage = err.error.message;
        this.isLoginFailed=true;
      }
    )
  }
  reloadPage() {
    window.location.reload();
    
  }

}
