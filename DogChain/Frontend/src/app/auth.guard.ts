import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(): boolean{
    if(this._auth.isLoggedIn()) {
      console.log(true);
      return true;
    } else {
      console.log(false);
      this._router.navigate(['/login-menu']);
    }
  }

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) {}
  
}
