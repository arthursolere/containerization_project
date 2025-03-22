import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getCurrentUser } from './helpers/current-user';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(): boolean {
        if (getCurrentUser()) {
            return true;
        } else {
            this.router.navigate(['/sign-in']);
            return false;
        }
    }
}