import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { AppService } from '../../service/app.service'


@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  constructor(private http: HttpClient,private _app: AppService) { }
  private _userRegister = this._app.backHost+"/user/userRegister"

  userRegister(user,couriel) {
    let header = new HttpHeaders({
      'pass': user["password"],
      'mail': user["mail"],
      'key' : user["keyconf"],
      'message': couriel["mail.subscribeMail.message"],
      'title': couriel["mail.subscribeMail.title"],
      'subject':couriel["mail.subscribeMail.subject"]
    })
  
    return this.http.post(this._userRegister,user, { headers: header })
  }

}
