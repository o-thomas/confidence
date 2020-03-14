import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/service/login.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private serviceLogin: LoginService, private _router: Router) { }
  test:any = this.serviceLogin.Auth

  ngOnInit() {
  }
  deconexion(){
    this.serviceLogin.Auth = false;
    localStorage.removeItem('token');
    this._router.navigate(['login'])
  

  }
}
