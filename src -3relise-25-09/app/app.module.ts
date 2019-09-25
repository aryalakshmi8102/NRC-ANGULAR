import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component'; 
import { AdmissionComponent } from './admission/admission.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './login/logout.component';

import {AuthenticationService} from './_services/authentication.service';
import {ApiService} from './_services/api.service';
import { DischargeComponent } from './discharge/discharge.component';
import { InPatientComponent } from './in-patient/in-patient.component';
import { SearchComponent } from './search/search.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { DatePipe } from '@angular/common';
import { ReadmissionComponent } from './readmission/readmission.component';
import { FollowupComponent } from './followup/followup.component';
import { InpatientCareComponent } from './inpatient-care/inpatient-care.component';
import { DailycareComponent } from './dailycare/dailycare.component';
import { ReportComponent } from './report/report.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { AdminComponent } from './admin/admin.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { FollowupSearchComponent } from './followup-search/followup-search.component';
import { FollowupHistoryComponent } from './followup-history/followup-history.component';
import { FollowupDueComponent } from './followup-due/followup-due.component';
import { MonthlyReportComponent } from './report/monthly-report/monthly-report.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    AboutComponent,
    ContactComponent,
    AdmissionComponent,
    LoginComponent,
    LogoutComponent,
    DischargeComponent,
    InPatientComponent,
    SearchComponent,
    ReadmissionComponent,
    FollowupComponent,
    InpatientCareComponent,
    DailycareComponent,
    ReportComponent,
    AdminComponent,
    ChangepasswordComponent,
    FollowupSearchComponent,
    FollowupHistoryComponent,
    FollowupDueComponent,
    MonthlyReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Ng2OrderModule,
    ReactiveFormsModule,
    HttpClientModule,
    DatePickerModule
  ],
  providers: [
    AuthenticationService,
    ApiService,
   {provide: LocationStrategy, useClass: HashLocationStrategy},
   DatePipe,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 
 }
