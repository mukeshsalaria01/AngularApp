import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';  
import { Observable } from 'rxjs';
import {Customer} from  '../Models/customer';
import {CustomerConstants} from '../constants/constants';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  customerData : any;
  httpOptions : any = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
  id : any;

  constructor(private http : HttpClient) { }
  
  getAllCustomer():Observable<any[]>
  {     
     return this.http.get<any[]>(CustomerConstants.apiUrl+ 'getAllEmployee');
  }

 

  getAllCustomerWithPaging(dtParams: any): Observable<any> {
    
    debugger;
    return this.http.post<any>(CustomerConstants.apiUrl + 'getAllCustomer',  dtParams, {});        
}


  getCustomerById(id : any):Observable<any>
  {
 
    return this.http.get<any>(CustomerConstants.apiUrl + 'getCustomerById/'+id);
  }


  deleteCustomer(id : any) : Observable<any>
  {      
      return this.http.delete(CustomerConstants.apiUrl + 'delete/'+id);
  }
  
  createCustomer(customer : Customer) : Observable<any>
  {    
  return this.http.post<Customer>(CustomerConstants.apiUrl + 'add',customer,this.httpOptions);
  }
  

}
