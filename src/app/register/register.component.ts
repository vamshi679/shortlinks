import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { CustonValidatorService } from '../services/custon-validator.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;
  payload: any;
  loading:boolean=false;
  btnText:string='Sign Up';
  hide:boolean;
  hidec:boolean;

  constructor(
    private fb: FormBuilder,
    private customValidator: CustonValidatorService,
    private ds: DataService,
    private router:Router) {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(5)]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPwd: ['', [Validators.required, Validators.minLength(8)]],
      confirmPwd: ['', Validators.required]
    },
      {
        validator: this.customValidator.passwordMatchValidator(
          "userPwd",
          "confirmPwd"
        )
      }) 
  }


  ngOnInit(): void {
    this.btnText='Sign Up';
  }

  showhide(){
    this.hide=!this.hide;
  }

  showhidec(){
    this.hidec=!this.hidec;
  }


  private clearForm() {
    this.signupForm.reset();
  }

  public signup() {
    this.payload = this.signupForm.value;
    if (this.signupForm.valid) {
      this.loading=!this.loading;
      this.btnText='';
      this.ds.register(this.payload).subscribe(resp => {
        if (resp['message']) {
          localStorage.setItem('token', resp['userToken'])
          alert('Registered success, Account activation link sent tou your acocunt')
          this.router.navigate(['/user'])
          this.loading=this.loading;
        }
        else {
          alert(resp['message'])
        }
      })
    }
    else{
      alert('please fill all the fields')
    }
  }


}
