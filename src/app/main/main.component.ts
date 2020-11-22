import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  urlForm: FormGroup;
  btnText: string = 'Generate';
  shortUrl: string;
  hide: boolean;

  snackbar:boolean;
  text:string='';

  constructor(private fb: FormBuilder, public us: UserService) {
    this.urlForm = this.fb.group({
      fullUrl: ['', Validators.required],
      userName: [localStorage.getItem('userName')]
    })
  }

  ngOnInit(): void {
  }

  open(){
    this.snackbar=!this.snackbar;
    this.text="link copied"
    setTimeout(() => {
      // this.text='';
      this.snackbar=false;
    }, 3000);
  }

  shorten() {
    if (this.urlForm.valid) {
      this.btnText = "Loading..."
      this.us.shortener(this.urlForm.value).subscribe(resp => {
        if (resp['shortenedUrl']) {
          this.hide = !this.hide
          this.shortUrl = resp['shortenedUrl']
          this.btnText = "Generate"
          this.urlForm.reset();
        }
        else {
          alert('!oops...something went wrong')
        }
      })
    }
    else {
      alert('enter any url')
    }
  }

}
