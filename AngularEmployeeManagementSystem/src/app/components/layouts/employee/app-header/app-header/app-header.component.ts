import { Component, OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';
import {AccountService} from '../../../../../shared/account.service'

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  loginData : any;
  constructor(private router : Router, private accountService : AccountService ) { }

  ngOnInit(): void {

    this.loginInfo();
  }


  logOut()
  {
    localStorage.removeItem("token");
    this.router.navigate(['/account/login']);
  }
  
  loginInfo()
  {
  
  this.accountService.getLoginInfo().subscribe(
    res => {
      
      this.loginData = res;
    },
    err => {
      console.log(err);
    },
  );

  
}



}
