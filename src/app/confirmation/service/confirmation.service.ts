import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppService } from '../../service/app.service'


@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(private http: HttpClient, private _app: AppService) { }
  private _Url = this._app.backHost+"/user/confirmation";

  accountConfirm(id,key){
    let params = new HttpParams().set('id', id).set("key", key)
    return this.http.get(this._Url, {params}) 
  }
}
