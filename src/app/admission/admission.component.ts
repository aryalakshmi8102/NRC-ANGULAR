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
  //calculation in ng model
  admissionweight:number;
  motherweight:number;
  motherheight:number;
  //calcu end
  UserSession :string;
  currentUser:any;
  userForm:any;
  childForm:any;
  detailsForm:any;
  caseForm:any;

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
  motherData:any;
  motherId:string;
  childId:string;
  caseId:string;
 

  constructor(
    private http: HttpClient, 
    private router: Router,
    private data: ApiService
  ) { }

  ngOnInit() {

//validation





    this.UserSession = JSON.parse(localStorage.getItem('UserSession'));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(!this.UserSession){
      this.router.navigateByUrl('');
    }
    
   

    this.data.getWards(this.currentUser.hospitalId).subscribe(response => {
      this.wards = response.responseObject.genericList;
      console.log(this.wards);
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
  //console.log(this.criterias);
}



);

this.data.getComorbid().subscribe(response => {
  //console.log(response);

  this.comorbids = response.responseObject.genericList
  //console.log(this.comorbids);
}



);



this.data.getSocialfactors().subscribe(response => {
  //console.log(response);

  this.socialfactors = response.responseObject.genericList
 // console.log(this.socialfactors);
}



);



this.data.getQualifications().subscribe(response => {
  this.qualifications = response.responseObject.genericList
  console.log(this.qualifications);
}



);

















  }



  

  onSubmitAdmission(userForm:any,childForm:any,caseForm:any,detailsForm:any){
    this.userForm = userForm;
    this.childForm = childForm;
    this.caseForm = caseForm;
    this.detailsForm = detailsForm;
   
   // console.log(userForm);

    //console.log(childForm);
    //console.log(caseForm);
    //console.log(detailsForm);

//this.motherId = '1';
//this.childId = '1';
//this.caseId = this.onCaseSubmit(userForm,childForm,caseForm,detailsForm);
//return true;

    this.data.registerMother(userForm,this.currentUser.nrcUId)
    .subscribe(
        response => {
          if(response > 0){
            this.motherId = response;
       //     console.log(this.motherId);
             this.onCildSubmit(childForm);
           
          }
         
           
            console.log(this.motherId);
           // this.onCildSubmit(userForm);

            //call child sumbit service


        },
        error => {
     //       alert(error);
            console.log(error);
        });

      


  }

  onCildSubmit(childForm:any):any{

  //  console.log(childForm);
   // console.log('In child');
   
    this.data.registerChild(childForm,this.currentUser.nrcUId,this.motherId)
    .subscribe(
        response => {
     //    console.log(response);
         if(response > 0){

       //   console.log(this.childId);
          this.childId =  response;
           this.onCaseSubmit(this.userForm,this.childForm,this.caseForm,this.detailsForm);
         

          return response;
         }else{
           return 0;
         }
           
        },
        error => {
           // alert(error);
            console.log(error);
            return 0;
        });

  }

  onCaseSubmit(userForm:any,childForm:any,caseForm:any,detailsForm:any):any{
    //console.log('In case');
   // console.log(caseForm);
   // console.log(detailsForm);
    


      console.log(this.childId);

            this.data.registerCase(userForm,childForm,caseForm,detailsForm,
                                  this.currentUser.nrcUId,this.motherId,this.childId)
        .subscribe(
            response => {
              
             
              this.router.navigateByUrl('/about');
              this.caseId = response;
                
            },
            error => {
                //alert('');
                console.log(error);
            });


  }




}
