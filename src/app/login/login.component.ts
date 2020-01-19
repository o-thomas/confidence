import { Component, OnInit } from '@angular/core';
import { LoginService } from './service/login.service'
import { AppComponent } from '../app.component'
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  user: object;
  error: string;

  constructor(
    private _loginService: LoginService,
    private _router: Router,
    private _app: AppComponent,
    private _translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      mail: new FormControl(
        "",
        [Validators.required]
      ),
      password: new FormControl(
        '',
        [Validators.required]
      )
    })
    if (localStorage.getItem("token")) {
      this._router.navigate(['home'])
    }
  }

  login() {
    console.log(this.form.value)
    if (this.form.status == "VALID") {
      this.user = this.form.value
      this._loginService.login(this.user)
        .subscribe(
          res => {
            var response = res
            console.log(response)
            if (response['errorStatus']) {
              switch (response['errorStatus']) {
                case 1:
                  window.scrollTo(0, 0)
                  this.error = "login.errorStatus1"
                  break;
                case 2:
                  window.scrollTo(0, 0)
                  this.error = "login.errorStatus2"
                  break;
                default:
                  break;
              }
            } else {
              localStorage.setItem('token', response["token"])
              this._loginService.Auth = true
              this._router.navigate(['home'])
            }
          },
          err => console.log(err)
        )
    } else {
      window.scrollTo(0, 0)
      this.error = "login.fillForm"
    }
  }
}
