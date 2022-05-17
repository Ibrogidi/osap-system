import { CreateSurveyComponent } from './surveys/create-survey/create-survey.component';

import { Auth2Guard } from './core/services/auth2.guard';
import { RespondentDashboardComponent } from './user/respondent/respondent-dashboard/respondent-dashboard.component';
import { AuthGuard } from './core/services/auth.guard';
import { RespondentSignupComponent } from './user/respondent/respondent-signup/respondent-signup.component';
import { ResetPasswordComponent } from './common/reset-password/reset-password.component';
import { LoginComponent } from './common/login/login.component';
import { HomepageComponent } from './common/homepage/homepage.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResearcherSignupComponent } from './user/researcher/researcher-signup/researcher-signup.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { ResearcherDashboardComponent } from './user/researcher/researcher-dashboard/researcher-dashboard.component';
const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path:'register', component: ResearcherSignupComponent},
  {path:'register/respondent', component: RespondentSignupComponent},
  {path: 'researcher/dashboard', component: ResearcherDashboardComponent, canActivate: [AuthGuard]},
  {path: 'respondent/dashboard', component: RespondentDashboardComponent, canActivate: [Auth2Guard]},
  {path: 'surveys/new', component: CreateSurveyComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
