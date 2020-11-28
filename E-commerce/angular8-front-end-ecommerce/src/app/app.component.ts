import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

 
  constructor() {

    window.addEventListener('offline', (e) => {
      //Do task when no internet connection
      console.log("no connection")
      alert('Ooops no connection')
      });

      if(!navigator.onLine ){
        alert('Ooops no connection 2')
      }
   }

  ngOnInit() {
   
  }

  

}
