import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from '../components/employee/employee-add/employee-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {EmployeeService} from '../shared/employee.service';
import {NotificationService} from '../shared/notification.service';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EmployeelistComponent } from '../components/employee/employee-list/employee-list.component';
import { DataTablesModule } from 'angular-datatables';
import { AppHeaderComponent } from '../components/layouts/employee/app-header/app-header/app-header.component';
import { AppFooterComponent } from '../components/layouts/employee/app-footer/app-footer/app-footer.component';
import { AppLayoutComponent } from '../components/layouts/employee/app-layout/app-layout/app-layout.component';
import { AppSidebarComponent } from '../components/layouts/employee/app-sidebar/app-sidebar/app-sidebar.component';

import { RouterModule } from '@angular/router';

import {UserRegisterComponent} from '../components/account/register/user-register/user-register.component'
import {AccountLayoutComponent} from '../components/layouts/account/account-layout/account-layout/account-layout.component';
import { AccountLoginComponent } from '../components/account/login/account-login/account-login.component'
import {AccountService} from '../shared/account.service'
import {AuthInterceptor} from '../auth/auth-interceptor';
import { CustomerListComponent } from './customer/customer-list/customer-list/customer-list.component';
import {CustomerService} from '../shared/customer.service';
import { CustomerAddComponent } from './customer/customer-add/customer-add/customer-add.component'
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import {DynamicFormComponent} from './employee/dynamic-form/dynamic-form.component'

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeelistComponent,
    AppHeaderComponent,
    AppLayoutComponent,
    AppFooterComponent,
     AppSidebarComponent,
     UserRegisterComponent,
     AccountLayoutComponent,
     AccountLoginComponent,
     CustomerListComponent,
     CustomerAddComponent,
     DynamicFormComponent
    
  
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DataTablesModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot()
  ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ],
  
  providers: [HttpClientModule,EmployeeService,CustomerService,NotificationService,BsModalService,AccountService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents:[CustomerAddComponent,DynamicFormComponent]
})
export class AppModule  { }
