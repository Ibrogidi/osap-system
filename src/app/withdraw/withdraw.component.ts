import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../core/services/auth.service';
import { NavbarService } from '../core/services/mockservices/navbar.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  token: any;
  researcherToken: any;
  username: any;
  balance: number;
  x: boolean=false;
  y: boolean=false;
  invalidLogin: boolean = false;
  errorMessage: String;
  closeResult = '';
  respondentToken: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  linkValue: any;
  showLink: boolean = false;
  linkArray: string[];
  researcherData: string;
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router,
    private navebarService: NavbarService,
    ) {
   
   }
  
  
    ngOnInit(): void {
      this.token = localStorage.getItem('Researcher');
      this.researcherToken = "Token "+this.token;
      this.token = localStorage.getItem('Respondent');
      this.respondentToken = "Token "+this.token;
      this.authService.getUser(this.researcherToken).subscribe((researcher:any)=>{
        this.balance= researcher.balance;
        this.researcherData = researcher
        console.log("researcher:", researcher)
      });
      this.firstFormGroup = this.fb.group({
        phone_number: ['', Validators.required],
        
  
      });
      this.secondFormGroup = this.fb.group({
        amount: ['', Validators.required],
        
  
      });
    }
    logout(){
      this.navebarService.changeResearcherStatus(false);
      this.authService.logOut(this.token);
      this.router.navigate(['/login'])
      
        }
  
  withDraw(){
  // console.log(this.firstFormGroup.value.phone_number)
  console.log(this.researcherToken)
  this.authService.withdrawMoney(this.firstFormGroup.value,this.researcherToken).subscribe((result)=>{
    console.log(result);
  },(error) =>{
    console.log("error 1: ",error)
    // console.log("error 2: ", this.errorHandler.myError)
  if(error.status===401){
    this.errorMessage = "Incorrect username or password";
    this.invalidLogin = true;
  }
  else{
    this.errorMessage = error.error
    this.invalidLogin = true;
  }
  })
  }
  get phone_number() {
    return this.firstFormGroup.get('phone_number')
  }
  deposite(){
    this.authService.depositeMoney(this.secondFormGroup.value, this.researcherToken).subscribe((redirectUrl:any)=>{
      console.log(redirectUrl.redirect_url)
  this.linkValue = redirectUrl.redirect_url
  // this.linkValue = redirectUrl;
  // this.showLink = true;
  window.location.href = this.linkValue;
  
    })
  }
  subSurviceFee(value:any){
    return value = value - (value*0.05)
  }
  
  


}
