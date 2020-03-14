import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from './service/confirmation.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  param
  constructor(private _confirmationService: ConfirmationService, private _router: Router) { }
  ngOnInit() {
    function getParameter(sVar) {
      return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }
    let key = getParameter('key')
    let id = getParameter('id')
    this.confirmAccount(id.toString(), key.toString())
  }
  confirmAccount(varid, varkey) {
    this._confirmationService.accountConfirm(varid, varkey)
      .subscribe(
        res => {
          this._router.navigate(['login'])
        },
        err => console.log(err)
      )
  }


}
