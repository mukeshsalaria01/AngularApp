import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpHeaders} from  '@angular/common/http';  
import { Observable } from 'rxjs';
import {Employee} from  '../Models/employee';
import {EmployeeConstants} from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  
  employeeData : any;
  httpOptions : any = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
  
  constructor(private http : HttpClient) { }
  
  getAllEmployee():Observable<any[]>
  {     
     return this.http.get<any[]>(EmployeeConstants.apiUrl+ 'getAllEmployee');
  }

 

  getAllEmployeesWithPaging(dtParams: any): Observable<any> {
    
    return this.http.post<any>(EmployeeConstants.apiUrl + 'getAllEmployee',  dtParams, {});        
}


  getEmployeeById(id : any):Observable<any>
  {
    return this.http.get<any>(EmployeeConstants.apiUrl + 'getEmployeeById/'+id);
  }


  deleteEmployee(id : any) : Observable<any>
  {      
      return this.http.delete(EmployeeConstants.apiUrl + 'delete/'+id);
  }
  
  createEmployee(employee : Employee) : Observable<any>
  {    
  return this.http.post<Employee>(EmployeeConstants.apiUrl + 'add',employee,this.httpOptions);
  }
  
  
}
