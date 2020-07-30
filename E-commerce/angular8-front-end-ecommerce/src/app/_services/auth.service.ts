import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
   headers: new HttpHeaders({'Content-type' : 'application/json'})
};

const AUTH_API = "http://localhost:6061/api/auth/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   
  constructor(private http : HttpClient) { }
  
  login(credentials):Observable<any>{

    return this.http.post(AUTH_API + 'signin' , {
      username : credentials.username,
      password : credentials.password
    }, httpOptions);
  }

  register(user) : Observable<any>{
    return this.http.post(AUTH_API + 'signup',{
      username : user.username,
      password : user.password,
      email : user.email,
    },httpOptions);
  }

  

}
