import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustonValidatorService } from '../services/custon-validator.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pwdreset',
  templateUrl: './pwdreset.component.html',
  styleUrls: ['./pwdreset.component.css']
})
export class PwdresetComponent implements OnInit {

  resetForm: FormGroup;
  resetToken: string;
  hide: boolean;
  hidec: boolean;
  loading: boolean;
  btnText: string = 'Reset password'

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private ds: DataService,
    private customValidator: CustonValidatorService) {
    this.resetForm = this.fb.group({
      userName: [localStorage.getItem('userName')],
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
    this.activatedRoute.params.subscribe(params => {
      this.resetToken = params['email']
      // console.log(this.resetToken);
    })

    this.btnText = 'Reset Password';
  }

  showhide() {
    this.hide = !this.hide;
  }

  showhidec() {
    this.hidec = !this.hidec;
  }

  public reset(): void {
    if (this.resetForm.valid) {
      this.loading = !this.loading;
      this.btnText = '';
      this.ds.resetPwd(this.resetToken, this.resetForm.value).subscribe(resp1 => {
        this.loading = false;
        if (resp1['message'] == 'success') {
          alert('password reset success');
          window.close();
        }
        else {
          alert(resp1['message']);
        }
      })
    }
    else {
      alert("please enter valid email address")
    }
  }



}





// initial forgot password component / page when user clicks from login page
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpass.html',
  styleUrls: ['./pwdreset.component.css']
})
export class ResetPassword implements OnInit {


  constructor(
    private router: Router,
    private ds: DataService) { }

  ngOnInit(): void {
  }

  public goToMain(): void {
    this.router.navigate(['/login']);
  }

  public sendMail(z): void {
    if (z !== null || undefined) {
      this.ds.getResetLink(z).subscribe(resp => {
        if (resp['message'] == 'success') {
          alert('reset link sent')
          this.router.navigate(['/main'])
        }
        else {
          alert(resp['message']);
        }
      })
    }
    else {
      alert('please fill form');
    }
  }

}
