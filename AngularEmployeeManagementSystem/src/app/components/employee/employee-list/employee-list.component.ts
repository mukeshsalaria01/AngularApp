import { Component, OnInit, ViewChild } from '@angular/core';
import {EmployeeService} from '../../../shared/employee.service';
import {Employee} from '../../../Models/employee';
import {NotificationService} from '../../../shared/notification.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router'; 
declare var $: any;
import 'datatables.net';
import 'datatables.net-dt';
import {DataTablesResponse} from '../../../Models/data-tables-response';
import { DataTableDirective } from "angular-datatables"; 
import { HttpClient } from '@angular/common/http';
import {SearchCriteria}  from '../../../Models/search-criteria';
import { Subject, Observable, Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {DynamicFormComponent} from '../dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeelistComponent implements OnInit {
  
  allEmployees : any;
  employees: Employee[] = [];
  public modelList: Employee[];
  bsModalRef: BsModalRef;

  users: Employee[];    
  userName: string;    
  searchCriteria: SearchCriteria = { isPageLoad: true, filter: "" };   
  dtOptions: DataTables.Settings = {};    
  dtTrigger: Subject<any> = new Subject();    
  @ViewChild(DataTableDirective)    
  dtElement: DataTableDirective;    
  timerSubscription: Subscription;  
  

  constructor(private httpclient : HttpClient ,private bsModalService: BsModalService,private employeeService : EmployeeService, private toast : NotificationService,private route : ActivatedRoute ,private router : Router ){    }

  ngOnInit(): void {
    
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,

      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters.searchCriteria = this.searchCriteria; 
        this.employeeService.getAllEmployeesWithPaging(dataTablesParameters).subscribe(resp => {
         
          that.allEmployees = resp.data;

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
    },
      
      columns: [
        { data: "EmployeeId" , orderable:false },
        { data: "EmployeeName" },
        { data: "Position" },
        { data : "Office" },   
       { data :  "Age" }, 
       { data :  "Salary" }   
     ], 
    };
  //  this.subscribeToData();    
  }




  getAllEmployee()
  {    
    this.employeeService.getAllEmployee().subscribe(data => {this.allEmployees = data;});  
  }

  getEmployeeById(employeeId : any)
  {    
    this.employeeService.getEmployeeById(employeeId).subscribe(data => {         
    this.router.navigate(['/employee/create'], { queryParams: { id: data[0].employeeId } });     
    });
  }


  deleteEmployee(employeeid : any)
  {    
    if(confirm("Are you sure you want to delete this record!!"))
    {
    this.employeeService.deleteEmployee(employeeid).subscribe(data=>{
      if(data.success)
      {
        this.toast.showSuccess(data.message,"Success");    
        this.rerender();      
        this.getAllEmployee();
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



addNewCustomer() {

  debugger;
  this.bsModalRef = this.bsModalService.show(DynamicFormComponent);

}

   
}
