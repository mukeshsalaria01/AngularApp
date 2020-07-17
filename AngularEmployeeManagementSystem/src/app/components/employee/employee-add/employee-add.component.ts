import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators } from '@angular/forms';
import {EmployeeService} from "../../../shared/employee.service"  
import { Employee } from '../../../models/employee';
import {NotificationService} from '../../../shared/notification.service';
import { ActivatedRoute,Router } from '@angular/router';



@Component({
  selector: 'app-employee',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeForm : any;
  data: any;
  submitted = false;
  show: boolean = false;
  constructor (private formBuilder : FormBuilder, private employeeService : EmployeeService, private toastService : NotificationService,private route : ActivatedRoute ,private router : Router)  {} 


  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => 
      {       
      if(params['id']!=null)
      {          
        this.show = true;
        this.getEmployee(params['id']);
        this.employeeForm = this.formBuilder.group({
          EmployeeId : [],
          EmployeeName : ['',Validators.required],
          Position : ['',Validators.required],
          Office: ['',Validators.required],
          Age  : ['',[Validators.required, Validators.pattern("^[0-9]*$")]],
          Salary  : ['',[Validators.required, Validators.pattern("^[0-9]*$")]],
          RoleId  : ['',Validators.required],          
      });    
      }
      else
      {        
          this.employeeForm = this.formBuilder.group({          
          EmployeeName : ['',Validators.required],
          Position : ['',Validators.required],
          Office: ['',Validators.required],
          Age  : ['',[Validators.required, Validators.pattern("^[0-9]*$")]],
          Salary  : ['',[Validators.required, Validators.pattern("^[0-9]*$")]],
          RoleId  : ['',Validators.required],
      });   
      }
    });
}
 

   getEmployee(employeeId : any)
   {    
    this.employeeService.getEmployeeById(employeeId).subscribe(data => {          
             if(data[0]!=null)
             {
                this.employeeForm.patchValue({
                EmployeeId : data[0].employeeId,
                EmployeeName : data[0].employeeName,
                Position : data[0].position,
                Office : data[0].office,
                Age  : data[0].age,
                Salary : data[0].salary,
                RoleId : data[0].roleId
               });
             }
      });  
   }
   
  get f() 
  {     
    return this.employeeForm.controls;
  }



  onSubmit()
  { 
    this.submitted = true;
    if(this.employeeForm.invalid)
    {  
           return;
    }
    this.createEmployee(this.employeeForm.value);
    this.submitted=false;
  }


  createEmployee(employee : Employee)
  {
   this.employeeService.createEmployee(employee).subscribe(data=>{         
                if(data.success)
                {
                  this.toastService.showSuccess(data.message,"Success");
                  this.submitted =false;
                  this.employeeForm.reset();
                  this.router.navigate(['/employee/list']);
                }
                else
                {
                  this.toastService.showError(data.message,"Error");
                }                                
        });      
  }
   
  formReset()
  {
   this.submitted=false;  
  }


    
}
