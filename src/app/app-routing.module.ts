







import { RespondentSignupComponent } from './user/respondent/respondent-signup/respondent-signup.component';
import { ResetPasswordComponent } from './common/reset-password/reset-password.component';
import { LoginComponent } from './common/login/login.component';
import { HomepageComponent } from './common/homepage/homepage.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResearcherSignupComponent } from './user/researcher/researcher-signup/researcher-signup.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path:'register', component: ResearcherSignupComponent},
  {path:'register/respondent', component: RespondentSignupComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
