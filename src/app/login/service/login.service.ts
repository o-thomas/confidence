import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { AppService } from '../../service/app.service'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  Auth: boolean = false
  private _verifConnect = this._app.backHost + "/user/userVerif";
  private _userLogin = this._app.backHost + "/user/userLogin";
  constructor(private http: HttpClient, private _app: AppService) { }
  login(user) {
    console.log(user)
    let header = new HttpHeaders({
      'pass': user.password,
      'mail': user.mail
    })
    return this.http.get(this._userLogin, { headers: header })
  }

  isAuth(id) {
    let header = new HttpHeaders({
      'Authorization': 'Bearer ' + id
    })
    return this.http.get(this._verifConnect, { headers: header })
  }

}
