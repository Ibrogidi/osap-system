






import { Component, ViewChild, ElementRef } from '@angular/core';

import { FormGroup, FormControl,FormArray, FormBuilder } from '@angular/forms'


@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})


export class ExampleComponent  {
 
  // title = 'FormArray Example in Angular Reactive forms';
 
  // skillsForm: FormGroup;

  sectionsForm: FormGroup;
 sectionOrder: number=-1;
  constructor(private fb:FormBuilder) {
 
    // this.skillsForm = this.fb.group({
    //   name: '',
    //   skills: this.fb.array([]) ,
    // });

    this.sectionsForm = this.fb.group({
      sections : this.fb.array([])
    })
  
  }
 
setOrder(){
console.log("hi")
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
  // get skills() : FormArray {
  //   return this.skillsForm.get("skills") as FormArray
  // }

  get sections(): FormArray{
    return this.sectionsForm.get('sections') as FormArray
  }
 
  // newSkill(): FormGroup {
  //   return this.fb.group({
  //     skill: '',
  //     exp: '',
  //   })
  // }
  newSection(): FormGroup{
    return this.fb.group({
      title : '',
      description: '',
      questionaires: this.fb.array([]),
      order: '',
      // order: '',
      // questionnaires: this.fb.array([]),
    })
  }
 
  // addSkills() {
  //   this.skills.push(this.newSkill());
  // }

  addSection(){
    // this.sectionOrder+= 1;
    this.sections.push(this.newSection())
   
  }
  // removeSkill(i:number) {
  //   this.skills.removeAt(i);
  // }
 
  removeSection(i:number) {
    // this.sectionOrder-= 1;
    this.sections.removeAt(i);

  }


  onSubmit() {
    // console.log(this.skillsForm.value);
    console.log(this.sectionsForm.value);
  }
 
}


 
export class country {
  id: string;
  name: string;
 
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}