import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import {AppSettings} from '../../../constants/constants';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  myFormGroup:FormGroup;

  formTemplate:any = AppSettings.form_template; 
  constructor(private bsModalRef: BsModalRef) {}    

  ngOnInit() {
    let group={}    
    AppSettings.form_template.forEach(input_template=>{
      group[input_template.label]=new FormControl('');  
    })
    this.myFormGroup = new FormGroup(group);
  }
  onSubmit(){
    console.log(this.myFormGroup.value);
  }
  
  onClose(){
    this.bsModalRef.hide();
  }




}
