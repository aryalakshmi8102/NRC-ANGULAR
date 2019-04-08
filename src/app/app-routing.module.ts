import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AdmissionComponent } from './admission/admission.component';
import { DischargeComponent } from './discharge/discharge.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './login/logout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admission', component: AdmissionComponent},
  { path: 'discharge', component: DischargeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
