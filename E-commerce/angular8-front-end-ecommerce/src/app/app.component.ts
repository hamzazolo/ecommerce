import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService , private router : Router) { }

  ngOnInit() {
  
  this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
 //   window.location.reload();
 this.router.navigateByUrl("/login");
  }
  
}
