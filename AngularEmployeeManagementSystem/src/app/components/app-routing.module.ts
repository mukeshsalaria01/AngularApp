import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from '../components/employee/employee-add/employee-add.component';
import { EmployeelistComponent } from '../components/employee/employee-list/employee-list.component';
import {AppLayoutComponent} from '../components/layouts/employee/app-layout/app-layout/app-layout.component'
import {AccountLayoutComponent} from '../components/layouts/account/account-layout/account-layout/account-layout.component'
import {UserRegisterComponent} from '../components/account/register/user-register/user-register.component'
import {AccountLoginComponent} from '../components/account/login/account-login/account-login.component';
import {AuthGuard} from '../auth/auth.guard';
import {CustomerListComponent} from '../components/customer/customer-list/customer-list/customer-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  { path: 'employee', component: AppLayoutComponent , canActivate : [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'create', component: EmployeeComponent },
      { path: 'list', component: EmployeelistComponent },
      { path: 'customerlist', component: CustomerListComponent }
    ]
  },
  

  { path: 'account', component: AccountLayoutComponent ,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'register', component: UserRegisterComponent },
      { path: 'login', component: AccountLoginComponent }
    ]
  }
    


  

 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
