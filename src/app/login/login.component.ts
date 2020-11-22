import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  payload: any;
  loginform: FormGroup;
  loading:boolean=false;
  btnText:string='Sign In';
  hide:boolean;


  constructor(private fb: FormBuilder,
    private ds: DataService,
    private router: Router) {
    this.loginform = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPwd: ['', [Validators.required]]
    })
  }
 
  showhide(){
    this.hide=!this.hide
  }

  clear() {
    this.loginform.reset();
  }

  ngOnInit(): void {
    this.btnText='Sign In';
  }

  public login() {
    this.payload = this.loginform.value;
    const encryptedPwd = btoa(this.payload.userPwd);
    this.payload.userPwd = encryptedPwd;
    if (this.loginform.valid) {
      this.loading=!this.loading;
      this.btnText='';
      this.ds.login(this.payload).subscribe(resp => {
        if (resp['userToken']) {
          localStorage.setItem('token', resp['userToken']);
          localStorage.setItem('userName',resp['userName']);
          this.router.navigate(['/user'])
          this.loading=this.loading;
        }
        else { 
          alert(resp['message'])
        }
      })
    }
    else {
      alert('please fill all the fields')
    }



  }

}
