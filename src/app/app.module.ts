


import { AuthGuard } from './core/services/auth.guard';
import { AuthService } from './core/services/auth.service';
import { ResetPasswordComponent } from './common/reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomepageComponent } from './common/homepage/homepage.component';
import { LoginComponent } from './common/login/login.component';
import { ChartsModule } from 'ng2-charts';
import {MatDialogModule} from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ResearcherSignupComponent } from './user/researcher/researcher-signup/researcher-signup.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { RespondentSignupComponent } from './user/respondent/respondent-signup/respondent-signup.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRippleModule } from '@angular/material/core';
import { ResearcherDashboardComponent } from './user/researcher/researcher-dashboard/researcher-dashboard.component';
import { RespondentDashboardComponent } from './user/respondent/respondent-dashboard/respondent-dashboard.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { CreateSurveyComponent } from './surveys/create-survey/create-survey.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { RepondentHomeComponent } from './user/respondent/repondent-home/repondent-home.component';
import { FillSurveyComponent } from './surveys/fill-survey/fill-survey.component';
import { MatRadioModule } from '@angular/material/radio';
import { ExampleComponent } from './example/example.component';
import { ChartComponent } from './example/chart/chart.component';
import { AnalyzeSurveyComponent } from './surveys/analyze-survey/analyze-survey.component';
import { WalletComponent } from './common/wallet/wallet.component';
import { AboutComponent } from './about/about.component';
import { DepositeComponent } from './common/deposite/deposite.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
// import { ChartsModule } from 'ng2-charts';

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
    CreateSurveyComponent,
    RepondentHomeComponent,
    FillSurveyComponent,
    ExampleComponent,
    ChartComponent,
    AnalyzeSurveyComponent,
    WalletComponent,
    AboutComponent,
    DepositeComponent,
    WithdrawComponent,



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
    MatTabsModule,
    MatExpansionModule,
    DragDropModule,
    MatBadgeModule,
    MatTableModule,
    MatRadioModule,
    ChartsModule,
    MatDialogModule,
    LottieModule.forRoot({ player: playerFactory }),
    

  ],
  providers: [
    AuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
