import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../../../shared/notification.service';
import { ActivatedRoute,Router } from '@angular/router';
import {FormBuilder, Validators, FormGroup } from '@angular/forms';
import {AccountService} from "../../../../shared/account.service";
import {Login} from '../../../../models/login'

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css']
})
export class AccountLoginComponent implements OnInit {
  loginForm : any;
  submitted = false;
  modelError : any;
  
  constructor (private formBuilder : FormBuilder, private accountService : AccountService, private toastService : NotificationService,private route : ActivatedRoute ,private router : Router)  {} 


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({              
      Email : ['', [Validators.required, Validators.email]],
      Password: ['',Validators.required],
      RememberMe : []         
  });
  }



  get f() 
  {     
  return this.loginForm.controls;
  }


 onSubmit()
 { 
  this.submitted = true;
  if(this.loginForm.invalid)
  {  
         return;
  }
  this.loginUser(this.loginForm.value);
  this.submitted=false;
 }

 loginUser(login : Login)
 {
   
  this.accountService.loginUser(login).subscribe(data=>{         
               if(data.success)
               {
                
                this.toastService.showSuccess(data.message,"Success");
                 this.submitted =false;
                 this.loginForm.reset();
                 
                 localStorage.setItem('token', data.token);
                 this.router.navigate(['/employee/list']);
               }
               else
               {
               
                 this.toastService.showError(data.message,"Error");
               }                                
       });      
 }
  




}
