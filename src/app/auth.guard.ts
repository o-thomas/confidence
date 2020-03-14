import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login/service/login.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: LoginService) { }
  isConnected: any
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.auth.isAuth(localStorage.getItem("token"))
      .subscribe(
        res => {
          this.isConnected = res
          if (this.isConnected == false) {
            this.auth.Auth = false
            localStorage.removeItem("token");
            this.router.navigate(['/login']);
          } else {
            this.auth.Auth = true
            return true;
          }
        },
        err => {
          this.auth.Auth = false
          localStorage.removeItem("token");
          this.router.navigate(['/login']);
        }
      )
    if (this.isConnected == false) {
      this.auth.Auth = false
      localStorage.removeItem("token");
      this.router.navigate(['/login']);
      return false
    } else {
      this.auth.Auth = true;
      return true;
    }
  }
}
