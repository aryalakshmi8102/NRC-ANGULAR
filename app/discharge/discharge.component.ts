import { Component, OnInit } from '@angular/core';

import {Router,ActivatedRoute} from '@angular/router';
import { ApiService } from '../_services/api.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-discharge',
  templateUrl: './discharge.component.html',
  styleUrls: ['./discharge.component.css']
  
})
export class DischargeComponent implements OnInit {
  UserSession :string;
  admittedchilds:any;
  dischargesdvalue:any;
  ipId:any;
  currentUser:any;
  dischargeForm:any;
  caseId:any;
  discomorbids:Object;
  outcomes:Object;
  medicalrisks:Object;
  admissionDate:string;
  newadmissionDate:Date;
  dstay:number;
  //for calculation
  modweight:number;
  modheight:number;
  ddate:any;
  aweight:number;
  dweight:number;
  minimumweight:number;
  private sub: any;
  time:any;
  dheight:any;
  weightgain:any;
  fdate:any;
  f1date:any;
  
  


  constructor( private http: HttpClient, 
    private router: Router,
    private data: ApiService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    ) { }
    
    
  ngOnInit() {
    //todays date
    

    this.time = this.datePipe.transform(new Date());
    this.ddate =  Date();
    //this.ondischargeChange(this.ddate);

    var dt = new Date(this.time );
dt.setDate( dt.getDate() + 15 );
console.log( dt);

    
    this.admittedchilds = {
      childName:null,
      gender:null,
      ipNumber:null,
      rchId:null,
      uhId:null,
      samNumber:null,
      mobileNumber:null,
      caseId:null,
      admissionDate:null,
      admissionWeight:null,
      admissionHeight:null,
      admissionSd:null
    }
    //validation try
  
  //validation try end
   
  
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.sub = this.route.params.subscribe(params => {
      this.caseId = +params['id']; 
     // console.log(this.ipId);
   });


    this.data.getComorbid().subscribe(response => {
      //console.log(response);
    
      this.discomorbids = response.responseObject.genericList
      //console.log(this.discomorbids);
    }
    
    
    
    );


    this.data.getOutcomes().subscribe(response => {
      this.outcomes = response.responseObject.genericList
    }
    );


   


    this.data. getMedicalrisks().subscribe(response => {
      this.medicalrisks = response.responseObject.genericList
    }
    );


    //dischargeheader

    this.data.getAdmittedchildsDetails(this.caseId).subscribe(response => {
      console.log("getAdmittedchildsDetails response = "+JSON.stringify(response));
    
      //this.admittedchilds = response.responseObject;
      //this.caseId = this.admittedchilds.caseId;
      //this.admissionDate =  this.admittedchilds.admissionDate;
     // console.log(this.caseId);
     if(response!=0){
      this.admittedchilds = response;

      this.wfhlCalculation(response.targetWeight,response.admissionHeight)
      
    
     // wfhlCalculation(this.admittedchilds.dweight,this.admittedchilds.dheight)
      console.log("admittedchilds2 = "+this.admittedchilds.uhId);
      console.log(this.caseId);
     }
    }
    );


    
//discharde sd


//discharge SD




    
  }



  updateWeightGain(){
    console.log(this.dweight)
    console.log(this.minimumweight)
    console.log(this.dstay)
    var cal =  (this.dweight-this.minimumweight)*1000/(this.dstay* this.minimumweight) 
    var cal1 = cal.toFixed(2)
console.log("cal1  ========== "+cal1)
    this.weightgain  = cal1;
  }


  removeWeightGain(){
    if(this.outcomes =="depth"){
      this.weightgain ="0.0";

    }
    else{
      this.weightgain  = this.updateWeightGain()

    }
    
  }
  

  
  ondischargeChange(dischargedate:Date ){
    console.log(dischargedate);
    
    console.log(this.admittedchilds.admissionDate);
    var DateArr = this.admittedchilds.admissionDate.split('/');
    var date2 = new Date(dischargedate);
    var newdate = new Date(date2);

    newdate.setDate(date2.getDate() + 9);
    console.log(newdate);
    this.fdate = (newdate.getMonth()+1)+'/'+newdate.getDate()+'/'+newdate.getFullYear();
    this.f1date = (this.fdate.getMonth()+1)+'/'+this.fdate.getDate()+'/'+this.fdate.getFullYear();

    var createdDate = DateArr[2]+'-'+DateArr[1]+'-'+DateArr[0];
    var date1 = new Date(createdDate);
    if(date2.getTime()  > date1.getTime()){
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
    }else{
      var dayDifference = 0;
    }
   
    this.dstay = dayDifference;
    console.log(dayDifference);

  }

  onSubmitDischarge(dischargeForm:any){
    console.log(dischargeForm.value);
    if(dischargeForm.valid){
      
    this.data.dischargeChild(dischargeForm.value,this.currentUser.nrcUId,this.caseId,this.dischargesdvalue)
 .subscribe(
        response => {
          if(response > 0){
           
            alert('Successfully Submitted');
            this.router.navigateByUrl('/home');
            
          }else{
            alert(response.errorMessage)
          }
       
        },
        error => {
            alert("discharge failed");
            console.log(error);
        });

      
    }
    else{
      alert("Please Enter Valid Data")
    }

      


  }







  wfhlCalculation(dweight:any,dheight:any){
    this.dischargesdvalue = null;
    console.log("dweight = "+dweight)
    console.log("dheight = "+dheight)
    if(dweight!=undefined && dheight!=undefined){
      if((this.admittedchilds.gender == 'M' && dweight>=1.9 && dweight<=24.1 && dheight>=45 && dheight<=110) || 
      (this.admittedchilds.gender == 'F' && dweight>=1.9 && dweight<=24.7 && dheight>=45 && dheight<=110)){
        this.data.getDischargesdvalue(dweight,dheight,this.admittedchilds.gender).subscribe(response => {
          console.log("dischargesdvalue Response = "+JSON.stringify(response));
          if (response.errorCode == 0) {
            if(response.responseObject!=null){
              this.dischargesdvalue = response.responseObject.sdValue;
            }
           }else{
            alert(response.errorMessage)
           }
          
        }
        );
      }
    }
  }


  }


