import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ApiService } from '../_services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent implements OnInit {
  UserSession :string;
  currentUser:any;

  wards: Object;
  religions:Object;
  castes:Object;
  referreds:Object;
  admissiontypes:Object;
  criterias:Object;
  units:Object;
  comorbids:Object;
  socialfactors:Object;
  qualifications:Object;
 

  constructor(
    private http: HttpClient, 
    private router: Router,
    private data: ApiService
  ) { }

  ngOnInit() {
    this.UserSession = JSON.parse(localStorage.getItem('UserSession'));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(!this.UserSession){
      this.router.navigateByUrl('');
    }
    
   

    this.data.getWards(this.currentUser.hospitalId).subscribe(response => {
      this.wards = response.responseObject.genericList;
    }
  );

  this.data.getUnits(this.currentUser.hospitalId).subscribe(response => {
    this.units = response.responseObject.genericList;
  }
);


  
  this.data.getReferredfrom().subscribe(response => {

  this.referreds = response.responseObject.genericList
}
);



this.data.getAdmissionType().subscribe(response => {
this.admissiontypes = response.responseObject.genericList
}
);






  this.data.getReligion().subscribe(response => {
  this.religions = response.responseObject.genericList
}
);

this.data.getCaste().subscribe(response => {
  this.castes = response.responseObject.genericList
}



);







this.data.getAdmissioncriteria().subscribe(response => {
  //console.log(response);

  this.criterias = response.responseObject.genericList
  console.log(this.criterias);
}



);

this.data.getComorbid().subscribe(response => {
  //console.log(response);

  this.comorbids = response.responseObject.genericList
  console.log(this.comorbids);
}



);



this.data.getSocialfactors().subscribe(response => {
  //console.log(response);

  this.socialfactors = response.responseObject.genericList
  console.log(this.socialfactors);
}



);



this.data.getQualifications().subscribe(response => {
  this.qualifications = response.responseObject.genericList
}



);

















  }



  

  submitForm(data){
    console.log(data);
  }

}
