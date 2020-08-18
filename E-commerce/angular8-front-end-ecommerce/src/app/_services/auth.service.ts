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
  
  login(username: any, password:any):Observable<any>{
    console.log("username c : ",username, "password c : ",password)
    return this.http.post(AUTH_API + 'signin' , {username ,password }, httpOptions);
  }

  register(nom:string,prenom:string,email:string , username : string , password : string) : Observable<any>{
    return this.http.post(AUTH_API + 'signup',{nom,prenom,username , password , email },httpOptions);
  }

  

}
