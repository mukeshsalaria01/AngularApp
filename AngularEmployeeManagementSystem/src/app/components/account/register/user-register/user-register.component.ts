import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../../../shared/notification.service';
import { ActivatedRoute,Router } from '@angular/router';
import {FormBuilder, Validators, FormGroup } from '@angular/forms';
import {AccountService} from "../../../../shared/account.service" 
import { Register } from 'src/app/models/register';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerForm : any;
  submitted = false;
  modelError : any;

  constructor (private formBuilder : FormBuilder, private accountService : AccountService, private toastService : NotificationService,private route : ActivatedRoute ,private router : Router)  {} 


  ngOnInit(): void 
  {
      this.registerForm = this.formBuilder.group({          
      UserName : ['',Validators.required],
      Email : ['', [Validators.required, Validators.email]],
      Password: ['',Validators.required],
     
      ConfirmPassword  : ['', [Validators.required]]
    }, { 
      validator: this.ConfirmedValidator('Password', 'ConfirmPassword')         
  });

}


ConfirmedValidator(controlName: string, matchingControlName: string){

  return (formGroup: FormGroup) => {

      const control = formGroup.controls[controlName];

      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {

          return;

      }

      if (control.value !== matchingControl.value) {

          matchingControl.setErrors({ confirmedValidator: true });

      } else {

          matchingControl.setErrors(null);

      }

  }

}



get f() 
{     
  return this.registerForm.controls;
}


onSubmit()
{ 
  this.submitted = true;
  if(this.registerForm.invalid)
  {  
         return;
  }
  this.registerUser(this.registerForm.value);

  this.submitted=false;
}



 registerUser(register : Register)
  {
    debugger;
   this.accountService.registerUser(register).subscribe(data=>{         
                if(data.success)
                {
                  this.toastService.showSuccess(data.message,"Success");
                  this.submitted =false;
                  this.registerForm.reset();
                  this.router.navigate(['/account/login']);
                }
                else
                {
                 // this.modelError = data.message;
                  this.toastService.showError(data.message,"Error");
                }                                
        });      
  }
   
 

}
