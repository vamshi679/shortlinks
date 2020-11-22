import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private Http:HttpClient,private router:Router) { }

  login(lpayload):Observable<any> {
    return this.Http.post('/signin-user',lpayload);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.router.navigate(['/main'])
  } 

  register(Rpayload):Observable<any>{
    return this.Http.post('/register-user',Rpayload);
  }

  activateUserAcc(tkn):Observable<any>{
    return this.Http.post(`/activate/${tkn}`,null);
  }

  getResetLink(email):Observable<any>{
    return this.Http.post(`/resetlink/${email}`,null);
  }

  resetPwd(tkn,obj):Observable<any>{
    return this.Http.post(`/forgotpwd/${tkn}`,obj);
  }



}
