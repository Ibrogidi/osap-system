import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { NavbarService } from 'src/app/core/services/mockservices/navbar.service';

@Component({
  selector: 'app-deposite',
  templateUrl: './deposite.component.html',
  styleUrls: ['./deposite.component.css']
})
export class DepositeComponent implements OnInit {
  surveyIndex: any;
  token: any;
  researcherToken: any;
  value: any = "over";
  username: any;
  researcherData: any
secondFormGroup: FormGroup;
linkValue:any;
invalidLogin: boolean = false;
errorMessage: String;  
constructor(
    private authService: AuthService,
    private router: Router,
    private navebarService: NavbarService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('Researcher');
    this.researcherToken = "Token "+this.token;
    this.authService.getUser(this.researcherToken).subscribe((researcher:any)=>{
      this.researcherData = researcher;
      this.username = researcher.username;
       console.log("researcher:", researcher)
    });
    this.secondFormGroup = this.fb.group({
      amount: ['', Validators.required],
      

    });
    
  }

  get amount(){
    return this.secondFormGroup.get('amount')
  }
  
  logout(){
    this.navebarService.changeResearcherStatus(false);
    this.authService.logOut(this.token);
    this.router.navigate(['/login'])
    
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
