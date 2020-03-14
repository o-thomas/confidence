import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  backHost: string = "http://localhost:3000"

  constructor(private http: HttpClient) { }
  private _verifConnect = this.backHost+"/api/verifConnect"
  private _crypt = this.backHost+"/api/crypt"
  verif(login,key){
    let params = new HttpParams().set('login', login).set("key", key)
    return this.http.get(this._verifConnect, {params})
  }

}
