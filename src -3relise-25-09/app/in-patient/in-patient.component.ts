import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ApiService } from '../_services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-in-patient',
  templateUrl: './in-patient.component.html',
  styleUrls: ['./in-patient.component.css']
})
export class InPatientComponent implements OnInit {
  
  currentUser:any;
    UserSession :string;
    inpatients:Object;
  constructor(private http: HttpClient, 
    private router: Router,
    private data: ApiService ) { }
    
  ngOnInit() {
    this.UserSession = JSON.parse(localStorage.getItem('UserSession'));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    

    
    this.data. getInpatients(this.currentUser.hospitalId).subscribe(response => {
      this.inpatients = response.responseObject.caseDetailList;
    }
  );

  }

}
