import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AdmissionComponent } from './admission/admission.component';
import { DischargeComponent } from './discharge/discharge.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './login/logout.component';
import { InPatientComponent } from './in-patient/in-patient.component';
import { SearchComponent } from './search/search.component';
import { ReadmissionComponent} from './readmission/readmission.component';
import { InpatientCareComponent } from './inpatient-care/inpatient-care.component';
import { DailycareComponent } from './dailycare/dailycare.component';
import { ReportComponent } from './report/report.component';
import {  AdminComponent } from './admin/admin.component';
import {  ChangepasswordComponent } from './changepassword/changepassword.component';

import {  FollowupComponent } from './followup/followup.component';
import {  FollowupSearchComponent } from './followup-search/followup-search.component';

import { FollowupHistoryComponent } from './followup-history/followup-history.component';

import { FollowupDueComponent} from './followup-due/followup-due.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admission', component: AdmissionComponent},
  { path: 'discharge/:id', component: DischargeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'in-patient', component:InPatientComponent},
  { path: 'search', component:SearchComponent},
  { path: 'readmission/:id', component:ReadmissionComponent},
  { path: 'inpatient-care', component: InpatientCareComponent},
  { path: 'dailycare/:id', component: DailycareComponent},
  { path: 'report', component: ReportComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'changepassword', component:ChangepasswordComponent},
  { path: 'followup/:id', component:FollowupComponent},
  { path: 'followup-search', component: FollowupSearchComponent},
  { path: 'followup-history/:id', component: FollowupHistoryComponent},
  { path: 'followup-due', component:  FollowupDueComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
