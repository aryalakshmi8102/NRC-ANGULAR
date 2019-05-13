import { Component, OnInit } from '@angular/core';

//added
import {Router,ActivatedRoute} from '@angular/router';
import { ApiService } from '../_services/api.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup,  FormBuilder,FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-readmission',
  templateUrl: './readmission.component.html',
  styleUrls: ['./readmission.component.css']
})
export class ReadmissionComponent implements OnInit {
   
  form:FormGroup;



  //calculation in ng model
  admissionweight:number;
  motherweight:number;
  motherheight:number;
  targetweight:any;
  pregnantValue:any;
  medicalproblem:any;
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
  criterias:any;
  units:Object;
  comorbids:Object;
  socialfactors:Object;
  qualifications:Object;
  riskcategorys:Object;
  searchedchilds:any;
  motherData:any;
  motherId:string;
  childId:string;
  caseId:any;
  time:any;
  age:number;
  uhid:number;
  private sub: any;
  otherValue :any;
  admissionCriterias:any[] = [];
  otherValueShow : Boolean = false;
  comorbidConditions:any[] = [];

//   export class SearchDetailsResponse
// {
//     public errorCode : string;
//     public errorMessage: string;
//     public successMessage : string;
//     public sessionId : string;
//     public responseObject : SearchDetailsResponseObject;
// }


// export class SearchDetailsResponseObject
// {
//     public uhId : number;
//     public address: string;
//     public childAge : number;
//     public casteId : number;
// }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient, 
    private router: Router,
    private data: ApiService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    
    this.time = this.datePipe.transform(new Date());

    this.sub = this.route.params.subscribe(params => {
      this.caseId = +params['id']; 
     console.log("this.caseId = "+ this.caseId);
   });

   
   
   

//validation

//this.detailsForm = this.formBuilder.group({
  //uhid: ['', Validators.required],
  //ip: ['', Validators.required],
 
//});





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
this.admissiontypes = response.responseObject.genericList;
console.log("this.admissiontypes = "+JSON.stringify(this.admissiontypes))
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

this.data.getRiskcategory().subscribe(response => {
  this.riskcategorys = response.responseObject.genericList
  console.log(this.riskcategorys);
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





//readmission
// this.searchedchilds = {
//   "errorCode": "0",
//   "errorMessage": null,
//   "successMessage": "Found case detail for caseId: 1",
//   "sessionId": null,
//   "responseObject": {
//       "uhId": 832345678901,
//       "address": "#18,Malleshwaram West, Bengaluru - 560055",
//       "childAge": 5,
//       "casteId": 2,
//       "category": "APL",
//       "childDob": "10/03/2018",
//       "gender": "M",
//       "mobileNumber": "9976543210",
//       "childName": "testChild",
//       "rchId": 99255567890,
//       "religionId": 1,
//       "motherAge": 35,
//       "motherDob": "09/02/1992",
//       "motherName": "testMother"
//   }
// };



// console.log("searchedchilds 1= "+this.searchedchilds.responseObject.uhId);
this.data.getSearchedChildDetails(this.caseId).subscribe(response => {
  console.log("response  = "+JSON.stringify(response));
  this.searchedchilds = response;
console.log("searchedchilds2 = "+this.searchedchilds.uhId);
  console.log(this.caseId);

  
  


 
}
);



  }

  onSubmitAdmission(userForm:any,childForm:any,caseForm:any,detailsForm:any){
    
    // console.log("userForm.valid = "+userForm.invalid);
    // console.log("childForm.valid = "+childForm.invalid);
    // console.log("caseForm.valid = "+caseForm.invalid);
    // console.log("detailsForm.valid = "+detailsForm.invalid);
    this.userForm = userForm;
    this.childForm = childForm;
    this.caseForm = caseForm;
    this.detailsForm = detailsForm;
    console.log("userForm = "+JSON.stringify(userForm));
    console.log("childForm = "+JSON.stringify(childForm));
    console.log("caseForm = "+JSON.stringify(caseForm));
    console.log("detailsForm = "+JSON.stringify(detailsForm));
    console.log("caseId = "+this.caseId);
    

    this.data.admissionfull(userForm,childForm,caseForm,detailsForm,this.currentUser.nrcUId,this.caseId,
      this.admissionCriterias,this.comorbidConditions) 
    .subscribe(
        response => {
          if(response > 0){
            console.log("Success");
            alert('Successfully Submitted');
            this.router.navigateByUrl('/about');
     
           
          }
         
        },
        error => {
     //       alert(error);
            console.log(error);
        });

      


  }


  updateWeight(){
    var cal = 1.15* this.admissionweight;
    var cal1 = cal.toFixed(3)
  console.log("cal1  ========== "+cal1)
    this.targetweight  = cal1;
  };


  //age calculation
  ageCalculution(ageDob:any){
    var today = new Date();
    var birthDate = new Date(ageDob);
    var diffYear = today.getFullYear() - birthDate.getFullYear();
    var diffmonths = today.getMonth() - birthDate.getMonth();
    var diffDaysInMonth = today.getDate() -  birthDate.getDate(); // DAY_OF_MONTH
    var totalMonth;
    if(diffDaysInMonth<0){
        totalMonth = diffYear * 12 + diffmonths - 1;
    } else {
        totalMonth = diffYear * 12 + diffmonths;
    }
    //this.childage = totalMonth;
    this.searchedchilds.childAge = totalMonth;
  }

  changeCheckBox(event,option){
    console.log("event == "+JSON.stringify(event.target.value))
  console.log("option = "+JSON.stringify(option));
   
    var insertCritera :any;
    if(this.criterias[(this.criterias.length-1)].configId===option.configId){
      insertCritera ={
        criteriaId: option.configId,
        otherValue: this.otherValue
      }
      if(event.target.checked) {
        this.otherValueShow = true;
      } else {
        this.otherValueShow = false
      }
     
    } else {
      insertCritera ={
        criteriaId: option.configId,
        otherValue: null
      }
    }
  
    if(event.target.checked) {
      this.admissionCriterias.push(insertCritera);
    } else {
      //admissionCriterias.splice(,1);
      for(var i=0;i<this.admissionCriterias.length;i++){
        console.log("this.admissionCriterias array "+i+" ="+JSON.stringify(this.admissionCriterias[i]));
        console.log("this.admissionCriterias[i].configId ="+i+" ="+this.admissionCriterias[i].configId);
        console.log("option.configId ="+option.configId);
        if(this.admissionCriterias[i].criteriaId === option.configId) {
          this.admissionCriterias.splice(i,1);
        }
      }
    }
    console.log("admissionCriterias = "+JSON.stringify(this.admissionCriterias));
    
   }
  
   otherValueChange(msg){
    for(var i=0;i<this.admissionCriterias.length;i++){
      if(this.admissionCriterias[i].criteriaId === this.criterias[(this.criterias.length-1)].configId) {
        this.admissionCriterias[i].otherValue = msg;
      }
    }
    console.log("admissionCriterias = "+JSON.stringify(this.admissionCriterias));
   }


   changeComorbidCheckBox(event,option){
    var insertComorbid :any;
    insertComorbid ={
      comorbidId: option.configId,
      othersValue: null
    }
  
    if(event.target.checked) {
      this.comorbidConditions.push(insertComorbid);
    } else {
      //admissionCriterias.splice(,1);
      for(var i=0;i<this.comorbidConditions.length;i++){
        if(this.comorbidConditions[i].comorbidId === option.configId) {
          this.comorbidConditions.splice(i,1);
        }
      }
    }
    
   }
  


  
}
