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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
