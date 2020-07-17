import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpHeaders} from  '@angular/common/http';  
import {AccountConstants} from '../constants/constants';
import { Observable } from 'rxjs';
import {Register} from '../models/register';
import {Login} from '../models/login';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  employeeData : any;
  httpOptions : any = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
   
  constructor(private http : HttpClient) { }


  registerUser(register : Register) : Observable<any>
  {    
 
  return this.http.post<any>(AccountConstants.apiUrl + 'register',register,this.httpOptions);
  }

  loginUser (login : Login) : Observable<any>
  {
    return this.http.post<any>(AccountConstants.apiUrl + 'login',login,this.httpOptions);
  }

  getLoginInfo():Observable<any[]>
  {   
     return this.http.get<any[]>(AccountConstants.apiUrl+ 'userProfile');
  }


}
