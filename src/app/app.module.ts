import { AuthGuard } from './core/services/auth.guard';
import { AuthService } from './core/services/auth.service';
import { ResetPasswordComponent } from './common/reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatStepperModule} from '@angular/material/stepper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomepageComponent } from './common/homepage/homepage.component';
import { LoginComponent } from './common/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { ResearcherSignupComponent } from './user/researcher/researcher-signup/researcher-signup.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { RespondentSignupComponent } from './user/respondent/respondent-signup/respondent-signup.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRippleModule} from '@angular/material/core';
import { ResearcherDashboardComponent } from './user/researcher/researcher-dashboard/researcher-dashboard.component';
import { RespondentDashboardComponent } from './user/respondent/respondent-dashboard/respondent-dashboard.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { RequirmentsComponent } from './surveys/requirments/requirments.component';
import { CreateSurveyComponent } from './surveys/create-survey/create-survey.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return player;
}



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    LoginComponent,
    ResearcherSignupComponent,
    ResetPasswordComponent,
    PageNotFoundComponent,
    RespondentSignupComponent,
    ResearcherDashboardComponent,
    RespondentDashboardComponent,
    RequirmentsComponent,
    CreateSurveyComponent,

  

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDividerModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatDatepickerModule,
    // MatDatepicker,
    MatNativeDateModule,
    MatRippleModule,
  MatStepperModule,
  MatSlideToggleModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [
    AuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
