import { Component} from '@angular/core';

import { FormGroup,FormArray, FormBuilder } from '@angular/forms'


@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})


export class ExampleComponent  {
 
  // title = 'FormArray Example in Angular Reactive forms';
 
  // skillsForm: FormGroup;

  sectionsForm: FormGroup;
 sectionOrder: number= 0;
  constructor(private fb:FormBuilder) {
 
   

    this.sectionsForm = this.fb.group({
      sections : this.fb.array([])
    })
  
  }
 

  get titles() {
    return this.sectionsForm.get('title');
  }
  get description() {
    return this.sectionsForm.get('description');
  }
get order(){
  return this.sectionsForm.get('order');

}
 

  get sections(): FormArray{
    return this.sectionsForm.get('sections') as FormArray
  }
 
 
  newSection(): FormGroup{
    return this.fb.group({
      title : '',
      description: '',
      questionnaires: this.fb.array([]),
      order: '',
     
    })
  }
  newQuestion(): FormGroup{
    return this.fb.group({
      title : '',
      description: '',
      questionaires: this.fb.array([]),
      order: '',
     
    })
  }
 

  addSection(){
    
    this.sections.push(this.newSection())
   
  }
  
  removeSection(i:number) {
    
    this.sections.removeAt(i);

  }


  onSubmit() {
    console.log(this.sectionsForm.value);
  }
 
}


 
