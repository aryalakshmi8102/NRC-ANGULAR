import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ApiService } from '../_services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-followup',
  templateUrl: './followup.component.html',
  styleUrls: ['./followup.component.css']
})
export class FollowupComponent implements OnInit {
  private sub: any;
  malnutrtionstatus:Object;
  followupplaces:Object;
  caseId:any;


  UserSession :string;
  currentUser:any;
  FollowupForm:any;
  followupheight:any;
  followupweight:any;
  followupsdvalue:any;
  dischargesdvalue:any;
  admittedchilds:any;
  gender:any;
 
  constructor(
    private http: HttpClient, 
    private router: Router,
    private data: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.UserSession = JSON.parse(localStorage.getItem('UserSession'));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.sub = this.route.params.subscribe(params => {
      this.caseId = +params['id']; 
     console.log("this.caseId = "+ this.caseId);
   });


   
   this.data.getmalnutrtionstatus().subscribe(response => {
    this.malnutrtionstatus = response.responseObject.genericList
  }
  );
  this.data.getallplacesforfollowup().subscribe(response => {
    this.followupplaces = response.responseObject.genericList
  }
  );


  }



  onSubmitFollowup(FollowupForm:any){
    console.log("FollowupForm ="+JSON.stringify(FollowupForm));
    console.log(FollowupForm.dailyweight)
    //if(dailyForm.valid){

    this.data.SaveFollowup(FollowupForm,this.caseId,this.currentUser.nrcUId)
    .subscribe(
        response => {
          if(response >= 0){
            console.log("Success");
            alert('Follow-Up Detailes  Saved Successfully');
           // this.router.navigateByUrl('/');   
         //  location.reload();        
          } else {
            alert("Follow-Up Detailes Not Saved");
          }
         
        },
        error => {
            alert(error);
            console.log(error);
        });

     
  }





  FollowupSDCalculation(followupheight:any,followupweight:any){
    this.followupsdvalue = null;
    console.log("fheight = "+followupheight)
    console.log("fweight = "+followupweight)
  
    if(followupweight!=undefined && followupheight!=undefined){
     // if((this.gender == 'M' && followupweight>=1.9 && followupweight<=24.1 && followupheight>=45 && followupheight<=110) || 
     // (this.gender == 'F' && followupweight>=1.9 && followupweight<=24.7 && followupheight>=45 && followupheight<=110)){
        this.data.getFollowupsdvalue(this.followupheight,this.followupweight,this.gender).subscribe(response => {
          console.log("followupsd Response = "+JSON.stringify(response));
          if (response.errorCode == 0) {
            if(response.responseObject!=null){
              this.followupsdvalue = response.responseObject.sdValue;
            }
           }else{
           // alert(response.errorMessage)
           }
          
        }
        );
    // }
    }
  }









}
