import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private route: Router, private auth: TokenStorageService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        // this will be passed from the route config
        // on the data property
        const expectedRole = route.data.expectedRole;
        const token = this.auth.getToken();

        // decode the token to get its payload
        const tokenPayload = decode(token); 
        if (!this.auth.isUserLogedIn() || tokenPayload.roles !== expectedRole) {
            this.route.navigate(['login']);
            return false;
        }
        return true;


    }

}