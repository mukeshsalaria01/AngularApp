import { Component, OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';
import {AccountService} from '../../../../../shared/account.service'

@Component({
  selector: 'app-app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.css']
})
export class AppSidebarComponent implements OnInit {

  loginData : any;
  constructor(private router : Router, private accountService : AccountService ) { }

  ngOnInit(): void {

    this.loginInfo();
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
