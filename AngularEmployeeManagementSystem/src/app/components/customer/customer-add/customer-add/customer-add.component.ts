import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Customer } from 'src/app/models/customer';
import {CustomerService} from '../../../../shared/customer.service';
import {NotificationService} from '../../../../shared/notification.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  submitted = false;
  addNewCustomerForm: FormGroup;
  categories: any[] = [];
  show: boolean = false;
  event: EventEmitter<any>=new EventEmitter();


  constructor(private formBuilder: FormBuilder, private bsModalRef: BsModalRef, private customerService : CustomerService,private toastService : NotificationService) {}

  ngOnInit(): void {
    if(this.customerService.id=="null"|| this.customerService.id=='')
    { 
    this.addNewCustomerForm = this.formBuilder.group({          
      FirstName : ['',Validators.required],
      LastName : ['',Validators.required],
      MobileNumber: ['',[Validators.required,Validators.minLength(10),Validators.pattern("^[0-9]*$")]],
      Email  : ['',[Validators.required,Validators.email]],
      Address  : [],
  });
}
 else
 {
  this.show = true;
  this.addNewCustomerForm = this.formBuilder.group({   
    CustomerId : [],       
    FirstName : ['',Validators.required],
    LastName : ['',Validators.required],
    MobileNumber: ['',[Validators.required,Validators.minLength(10),Validators.pattern("^[0-9]*$")]],
    Email  : ['',[Validators.required,Validators.email]],
    Address  : [],
});

this.getCustomer(this.customerService.id);
 }

}



getCustomer(customerId : any)
{    
 this.customerService.getCustomerById(customerId).subscribe(data => {          
          if(data[0]!=null)
          {
             this.addNewCustomerForm.patchValue({
              CustomerId : data[0].customerId,
             FirstName : data[0].firstName,
             LastName : data[0].lastName,
             Email : data[0].email,
             MobileNumber  : data[0].mobileNumber,
             Address : data[0].address,
             
            });
          }
   });  
}


get f() 
  {     
    return this.addNewCustomerForm.controls;
  }


  onClose(){
    this.bsModalRef.hide();
  }

  onSubmit()
  { 
    this.submitted = true;
    if(this.addNewCustomerForm.invalid)
    {  
           return;
    }
   this.createCustomer(this.addNewCustomerForm.value);
    this.submitted=false;
  }

  createCustomer(customer : Customer)
  {
   this.customerService.createCustomer(customer).subscribe(data=>{         
                if(data.success)
                {
                  this.toastService.showSuccess(data.message,"Success");
                  this.submitted =false;
                  this.addNewCustomerForm.reset();
                  debugger;
                    this.event.emit('OK');
                    this.bsModalRef.hide();
                  

                }
                else
                {
                  this.toastService.showError(data.message,"Error");
                }                                
        });      
  }



}
