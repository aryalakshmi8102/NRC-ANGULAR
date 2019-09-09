import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ApiService } from '../_services/api.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  UserSession :string;
  currentUser:any;
  resoucelist:any;

  constructor(private http: HttpClient, 
    private router: Router,
    private route: ActivatedRoute,
    private data: ApiService) { }

  ngOnInit() {
    this.UserSession = JSON.parse(localStorage.getItem('UserSession'));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));


    this.data.GetResourceDetails(this.currentUser.nrcUId)
.subscribe(
    response => {
     
      console.log("response  = "+JSON.stringify(response));
      this.resoucelist = response;
    console.log("resoucelist2 = "+this.resoucelist);
     
    
     
    },
    error => {
        alert(error);
        console.log(error);
    });
  
  }

 



onSubmithrForm(hrForm:any){
  console.log("hrForm ="+JSON.stringify(hrForm));
 

  this.data.SendResourceDetails(hrForm,this.currentUser.nrcUId)
  .subscribe(
      response => {
        if(response >= 0){
          console.log("Success");
          alert('HR details  Saved Successfully');
         // this.router.navigateByUrl('/');   
        // location.reload();        
        } else {
          alert(' Failed');
        }
       
      },
      error => {
          alert(error);
          console.log(error);
      });

    



  
}
 
}
