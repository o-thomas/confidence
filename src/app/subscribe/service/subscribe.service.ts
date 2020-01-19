import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { AppService } from '../../service/app.service'


@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  constructor(private http: HttpClient,private _app: AppService) { }
  private _userRegister = this._app.backHost+"/user/userRegister"

  userRegister(user){
    let header = new HttpHeaders({
      'pass': user.pass,
      'mail': user.mail,
      'key' : user.key,
    })
    return this.http.post(this._userRegister, { headers: header })
  }

}
