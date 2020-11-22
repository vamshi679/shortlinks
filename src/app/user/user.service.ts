import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private Http: HttpClient, private router: Router) { }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.router.navigate(['/main'])
  }

  public loggedInUser(): boolean {
    return !!localStorage.getItem('token');
  }

  public shortener(url): Observable<any> {
    return this.Http.post('/shortener', url)
  }

  public getUrlByUn(id):Observable<any>{
    return this.Http.get(`/getUrlsById/${id}`)
  }

  public getUserById(id):Observable<any>{
    return this.Http.get(`/getUser/${id}`)
  }

}
