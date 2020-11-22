import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

  authenticationToken: any;

  constructor(
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    private ds: DataService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.authenticationToken = params['id']
      console.log(this.authenticationToken);
    })
  }

  public accept():void {
    this.ds.activateUserAcc(this.authenticationToken).subscribe(resp => {
      console.log(resp['message']);
      alert(resp['message'])
    })
  }

}
