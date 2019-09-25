import { Component, OnInit, ɵConsole } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ApiService } from '../_services/api.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup,  FormBuilder,FormControl,FormArray, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent implements OnInit {

  
  form:FormGroup;
  //searchedchilds:any;


  //calculation in ng model
  admissionweight:number;
  motherweight:number = null;
  motherheight:number = null;
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
  motherData:any;
  motherId:string;
  childId:string;
  caseId:string;
  time:any;
  age:number;
  childage:any;
  childagemonth:any;
  childageyear:any;
  otherValue :any;
  admissionCriterias:any[] = [];
  otherValueShow : Boolean = false;
  comorbidConditions:any[] = [];
  admissionsdvalue:any;
  admissionheight:any;
 
  //admittedchilds:any;
  gender:any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient, 
    private router: Router,
    private data: ApiService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    //todays date

    this.time = this.datePipe.transform(new Date());
   
   

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
  console.log("getAdmissioncriteria = "+JSON.stringify(response));

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


this.data.getRiskcategory().subscribe(response => {
  this.riskcategorys = response.responseObject.genericList
  console.log(this.riskcategorys);
}



);









  }

  updateWeight(){
    var cal = 1.15* this.admissionweight;
    var cal1 = cal.toFixed(3)
console.log("cal1  ========== "+cal1)
    this.targetweight  = cal1;
  }

    
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
    this.childagemonth = diffmonths;
    this.childageyear = diffYear;
  }

  
 

  

  onSubmitAdmission(userForm:any,childForm:any,caseForm:any,detailsForm:any){
    this.userForm = userForm;
    this.childForm = childForm;
    this.caseForm = caseForm;
    this.detailsForm = detailsForm;
  //  console.log(userForm.value.motherweight);
//    console.log(userForm.value.motherweight==0?null:userForm.value.motherweight);
    console.log("caseForm = "+JSON.stringify(caseForm.value));
    console.log("userForm = "+JSON.stringify(userForm.value));
    console.log("childForm = "+JSON.stringify(childForm.value));
    console.log("detailsForm = "+JSON.stringify(detailsForm.value));

    if(caseForm.valid && userForm.valid && childForm.valid && detailsForm.valid){
      this.data.admissionfull(userForm.value,childForm.value,caseForm.value,detailsForm.value,this.currentUser.nrcUId,null,
        this.admissionCriterias,this.comorbidConditions)
        //this.searchedchilds.gender,
      .subscribe(
          response => {
            if(response > 0){
              console.log("Success");
              alert(' Admission Record  Created Successfully');
              this.router.navigateByUrl('/about');           
            } else {
              alert('Admission Failed');
            }
           
          },
          error => {
       alert('Admission Failed');
              console.log(error);
          });
    } else {
      alert("Please Enter Valid Data")
    }


    
  }



  /*
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

  */ 
 /*
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

*/

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




 admissionsdCalculation(admissionweight:any,admissionheight:any,gender:"M"){
  this.admissionsdvalue = null;
  console.log("admissionweight = "+admissionweight)
  console.log("admissionheight = "+admissionheight)
 // console.log("gender = "+this.childForm.value.childsex)
 
 // if(admissionweight!=undefined && admissionheight!=undefined){
   // if((this.gender == 'M' && admissionweight>=1.9 && admissionweight<=24.1 && admissionheight>=45 && admissionheight<=110) || 
    //(this.gender == 'F' && admissionweight>=1.9 && admissionweight<=24.7 && admissionheight>=45 && admissionheight<=110)){
      this.data. getAdmittedsdvalue(admissionweight,admissionheight,gender="M").subscribe(response => {
        
        console.log(" getAdmittedsdvalue Response = "+JSON.stringify(response));
        if (response.errorCode == 0) {
          if(response.responseObject!=null){
            this.admissionsdvalue = response.responseObject.sdValue;
          }
         }else{
          //alert(response.errorMessage)
         }
        
      }
      );
   // }
  //}
}


}
