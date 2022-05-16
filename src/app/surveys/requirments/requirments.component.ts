import { Component,
   OnInit, } from '@angular/core';

   import {FormBuilder, FormGroup, Validators} from '@angular/forms';
  
  
   interface Survey {
    name: string;
    value: boolean;
  }
@Component({
  selector: 'app-requirments',
  templateUrl: './requirments.component.html',
  styleUrls: ['./requirments.component.css']
})


export class RequirmentsComponent implements OnInit {
  isPaid: boolean= false;
x:string = "test 1";
respondentNumber:number;
minDate: Date;
budget: number;
firstFormGroup: FormGroup;
secondFormGroup: FormGroup;
thirdFormGroup: FormGroup;
surveys: Survey[] = [
  { name: 'payment free', value: false },
  { name: 'with payment', value: true },
];
isEditable = false;

constructor(private _formBuilder: FormBuilder) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDay();


  this.minDate = new Date(currentYear, currentMonth, currentDay+8);

}

ngOnInit() {
  
  this.firstFormGroup = this._formBuilder.group({
    survey_title: ['', Validators.required],
    description: ['',[]],
    datePicker:['', Validators.required],
    survey_type:['',Validators.required],
    survey_budget:['', [Validators.min]],
    respondent_number:['',Validators.required],
  });
  this.secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  this.thirdFormGroup = this._formBuilder.group({
    thirdCtrl:['', Validators.required],
  });

}


}
