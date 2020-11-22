import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  urlArray: any;
  user:any;
  urlForm: FormGroup;
  btnText: string = 'Generate';
  shortUrl: string;
  hide: boolean;

  constructor(
    private fb: FormBuilder,
    private us: UserService) {
    this.urlForm = this.fb.group({
      fullUrl: ['', Validators.required],
      userName: [localStorage.getItem('userName')]
    })
  }

  ngOnInit(): void {
    this.us.getUrlByUn(localStorage.getItem('userName')).subscribe(resp1 => {
      if(resp1){
        this.urlArray = resp1['data'];
      }
    })

    this.us.getUserById(localStorage.getItem('userName')).subscribe(resp2=>{
      if(resp2){
        this.user=resp2['data']
      }
    })
  }

  public logoutUser(): void {
    this.us.logout();
  }

  public shorten() {
    if (this.urlForm.valid) {
      this.btnText = "Loading..."
      this.us.shortener(this.urlForm.value).subscribe(resp => {
        if (resp['shortenedUrl']) {
          this.hide = !this.hide
          this.shortUrl = resp['shortenedUrl']
          this.btnText = "Generate"
          this.urlForm.reset();
          this.ngOnInit();
        }
        else {
          alert('!oops...something went wrong')
          this.ngOnInit();
        }
      })
    }
    else {
      alert('enter any url')
    }

  }


}
