import { HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


    constructor(private token : TokenStorageService , private router : Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
      
      let authReq = req;
      const token = this.token.getToken();
      if(token != null){
          authReq = req.clone({headers : req.headers.set(TOKEN_HEADER_KEY , 'Bearer '+token)});
      }

      return next.handle(authReq).pipe(
        catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error("Error Event");
        } else {
            console.log(`error status : ${error.status} ${error.statusText}`);
            switch (error.status) {
                case 401:      //login
                    this.router.navigateByUrl("/login");
                    break;
                case 403:     //forbidden
                    this.router.navigateByUrl("/notFound");
                    break;
            }
        } 
    } else {
        console.error("some thing else happened");
    }
    return throwError(error);
  
        })
      )
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
      console.log("handle error auth $$$$$$$")
      //handle your auth error or rethrow
      if (err.status === 401 || err.status === 403) {
          //navigate /delete cookies or whatever
          this.router.navigateByUrl(`/login`);
          // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
          return of(err.message); // or EMPTY may be appropriate here
      }
      return throwError(err);
  }
}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ];
