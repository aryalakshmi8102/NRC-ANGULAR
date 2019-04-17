import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    ApiService

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 
 }
