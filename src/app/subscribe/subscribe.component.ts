import { Component, OnInit } from '@angular/core';
import { SubscribeService } from './service/subscribe.service'
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  form: FormGroup
  userRegister: object;
  error: String;
  couriel: object;



  constructor(private _registerService: SubscribeService, private _translate: TranslateService) { }

  ngOnInit() {
    if(localStorage.getItem('token')){
      localStorage.removeItem('token')
    }
    this.form = new FormGroup({
      name: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z][A-Za-z\é\è\ê\-]+$"),
        ]
      ),
      username: new FormControl(
        '',
        [Validators.required]
      ),
      firstname: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z][A-Za-z\é\è\ê\-]+$"),
        ]
      ),
      mail: new FormControl(
        '',
        [
          Validators.required,
          Validators.email
        ]
      ),
      password: new FormControl(
        '',
        [Validators.required]
      ),
      confPass: new FormControl(
        '',
        [Validators.required]
      ),
    })
  }

  register() {
    if (this.form.status == "VALID") {
      if (this.form.value['password'] != this.form.value['confPass']) {
        window.scrollTo(0, 0)
        this.error = "subscribe.samePass"
      } else {
        this.userRegister = this.form.value
        this.userRegister["conf"] = 0
        let longueurkey = 15;
        let key = "";
        for (let i = 1; i < longueurkey; i++) {
          key += Math.floor(Math.random() * 9);
        }
        this.userRegister["keyconf"] = key
        this._translate.get(
          ['mail.subscribeMail.message', 'mail.subscribeMail.title', 'mail.subscribeMail.subject'])
          .subscribe(val => {
            this.couriel = val;
          });
        this._registerService.userRegister(this.userRegister, this.couriel)
          .subscribe(
            res => {
              var response = res
              window.scrollTo(0, 0)
              this.error = response['text']
              if (this.error == "undefined") {
                window.scrollTo(0, 0)
                this.error = "subscribe.registerSuccess"
              } else {
                if (response['errorStatus']) {
                  switch (response['errorStatus']) {
                    case 1:
                      window.scrollTo(0, 0)
                      this.error = "subscribe.errorStatus1"
                      break;
                    case 2:
                      window.scrollTo(0, 0)
                      this.error = "subscribe.errorStatus2"
                      break;
                    default:
                      break;
                  }
                }
              }

            },
            err => {
            }
          )
      }
    } else {
      window.scrollTo(0, 0)
      this.error = "form.fillForm"
      }
    }
  }



