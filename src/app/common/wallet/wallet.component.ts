import { modeValue } from './../../core/constants/constant';
import { NavbarService } from './../../core/services/mockservices/navbar.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
token: any;
researcherToken: any;
balance: number;
x: boolean=false;
y: boolean=false;

closeResult = '';
respondentToken: any;
firstFormGroup: FormGroup;
secondFormGroup: FormGroup;
linkValue: any;
showLink: boolean = false;
linkArray: string[];
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
      console.log("researcher:", researcher)
    });
    this.firstFormGroup = this.fb.group({
      phone_number: ['', Validators.required],
      

    });
    this.secondFormGroup = this.fb.group({
      amount: ['', Validators.required],
      

    });
  }


withDraw(){
// console.log(this.firstFormGroup.value.phone_number)
console.log(this.researcherToken)
this.authService.withdrawMoney(this.firstFormGroup.value,this.researcherToken).subscribe((result)=>{
  console.log(result);
})
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



}
