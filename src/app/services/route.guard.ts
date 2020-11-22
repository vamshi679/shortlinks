import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(private us:UserService, private _router: Router){}

  canActivate():boolean{
    if(this.us.loggedInUser()){
      return true;
    }
    else{
      this._router.navigate(['/login'])
      return false;
    }
  }
  
}
