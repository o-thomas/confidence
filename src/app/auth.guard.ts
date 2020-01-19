import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login/service/login.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: LoginService) { }
  response: any
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.auth.isAuth(localStorage.getItem("token"))
      .subscribe(
        res => {
          this.response = res
          if (this.response == false) {
            localStorage.removeItem("token");
            this.router.navigate(['/login']);
          } else {
            return true;
          }
        },
        err => {
          console.log(err)
          localStorage.removeItem("token");
          this.router.navigate(['/login']);
        }
      )
    if (this.response == false) {
      localStorage.removeItem("token");
      this.router.navigate(['/login']);
      return false
    } else {
      return true;
    }
  }
}
