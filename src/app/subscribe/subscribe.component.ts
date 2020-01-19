import { Component, OnInit } from '@angular/core';
import { SubscribeService } from './service/subscribe.service'
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';



@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  form: FormGroup
  response:object;
  userRegister:object;
  error:String;
  


  constructor(private _registerService: SubscribeService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(
      '',
      [Validators.required]
      ),
      userName: new FormControl(
      '',
      [Validators.required]
      ),
      firstname: new FormControl(
        '',
        [Validators.required]
      ),
      mail: new FormControl(
        '',
        [Validators.required]
      ),
      pass: new FormControl(
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
      if (this.form.value['pass'] != this.form.value['confPass']) {
        window.scrollTo(0, 0)
        this.error = "Les deux mots de passe doivent être identique"
      } else {
        this.userRegister = this.form.value
        this.userRegister["conf"] = 0
        let longueurkey = 15;
        let key = "";
        for (let i = 1; i < longueurkey; i++) {
          key += Math.floor(Math.random() * 9);
        }
        this.userRegister["keyconf"] = key
        this._registerService.userRegister(this.userRegister)
          .subscribe(
            res => {
              console.log(this.form.value)
              this.response = res
              window.scrollTo(0, 0)

              this.error = this.response['text']
              if (this.error == "undefined") {
                window.scrollTo(0, 0)
                this.error = "Un Email de Validation vient de vous être envoyé"
              } else {
              }

            },
            err => {
            }
          )
      }
    } else {
      window.scrollTo(0, 0)
      this.error = "Veuillez remplir tout les champs du formulaire"
    }
  }
  
  }

