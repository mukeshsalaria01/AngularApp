import { Component, OnInit,ViewChild } from '@angular/core';
import {NotificationService} from '../../../../shared/notification.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router'; 
declare var $: any;
import 'datatables.net';
import 'datatables.net-dt';
import {DataTablesResponse} from '../../../../Models/data-tables-response';
import { DataTableDirective } from "angular-datatables"; 
import { HttpClient } from '@angular/common/http';
import {SearchCriteria}  from '../../../../Models/search-criteria';
import { Subject, Observable, Subscription } from 'rxjs';
import {Customer} from '../../../../models/customer';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {CustomerService} from '../.././../../shared/customer.service';
import { CustomerAddComponent } from '../../customer-add/customer-add/customer-add.component';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

 allCustomers : any;

 bsModalRef: BsModalRef;
 users: Customer[];    
  userName: string; 
  Message : any = "Parent to Child"
 searchCriteria: SearchCriteria = { isPageLoad: true, filter: "" };   
 dtOptions: DataTables.Settings = {};    
 dtTrigger: Subject<any> = new Subject();    
 @ViewChild(DataTableDirective)    
 dtElement: DataTableDirective;    
 timerSubscription: Subscription; ;  

 

 constructor(private httpclient : HttpClient ,private bsModalService: BsModalService, private customerService : CustomerService , private toast : NotificationService,private route : ActivatedRoute ,private router : Router ){    }


 ngOnInit(): void {
    
 

  const that = this;

  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
    serverSide: true,
    processing: true,
    
    ajax: (dataTablesParameters: any, callback) => {
      dataTablesParameters.searchCriteria = this.searchCriteria; 
      this.customerService.getAllCustomerWithPaging(dataTablesParameters).subscribe(resp => {
       
        that.allCustomers = resp.data;

        callback({
          recordsTotal: resp.recordsTotal,
          recordsFiltered: resp.recordsFiltered,
          data: []
        });
      });
  },
    
    columns: [
      { data: "CustomerId" , orderable:false },
      { data: "FirstName" },
      { data: "LastName" },
      { data : "MobileNumber" },   
     { data :  "Email" }, 
     { data :  "Address" }   
   ], 
  };
//  this.subscribeToData();    
}




getAllCustomer()
{    
  this.customerService.getAllCustomer().subscribe(data => {this.allCustomers = data;});  
}

getCustomerById(employeeId : any)
{    
  this.customerService.getCustomerById(employeeId).subscribe(data => {         
  this.router.navigate(['/employee/create'], { queryParams: { id: data[0].customerId } });     
  });
}


deleteCustomer(customerid : any)
{    
  if(confirm("Are you sure you want to delete this record!!"))
  {
  this.customerService.deleteCustomer(customerid).subscribe(data=>{
    if(data.success)
    {
      this.toast.showSuccess(data.message,"Success");    
      this.rerender();      
      this.getAllCustomer();
    }
    else
    {
      this.toast.showError(data.message,"Error");
    }     
  });
}
}


rerender(): void {    
this.searchCriteria.isPageLoad = false;    
this.searchCriteria.filter = this.userName;    
this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {    
  dtInstance.destroy();    
  this.dtTrigger.next();    
});    
}    

ngAfterViewInit(): void {    
this.dtTrigger.next();        
}    

search() {    
this.rerender();    
}    

ngOnDestroy(): void {    
this.dtTrigger.unsubscribe();    
   
if (this.timerSubscription) {    
  this.timerSubscription.unsubscribe();    
}    
}    

private subscribeToData(): void {    
this.refreshData();    
}

private refreshData(): void {    
this.rerender();    
this.subscribeToData();        
}    

addNewCustomer(id : any) {

  debugger;
 this.customerService.id = id;

  this.bsModalRef = this.bsModalService.show(CustomerAddComponent);

 
  this.bsModalRef.content.event.subscribe(result => {
     debugger;
    if (result == 'OK') {    
      setTimeout(() => {
         this.rerender();      
        this.getAllCustomer();
      }, 1000);
    }
    
  });
}

}
