import { Component, OnInit } from '@angular/core';

import {Router,ActivatedRoute} from '@angular/router';
import { ApiService } from '../_services/api.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-discharge',
  templateUrl: './discharge.component.html',
  styleUrls: ['./discharge.component.css']
})
export class DischargeComponent implements OnInit {
  UserSession :string;
  admittedchilds:any;
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
  private sub: any;


  constructor( private http: HttpClient, 
    private router: Router,
    private data: ApiService,
    private route: ActivatedRoute) { }
    

  ngOnInit() {
    

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.sub = this.route.params.subscribe(params => {
      this.ipId = +params['id']; 
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

    this.data.getAdmittedchildsDetails(this.ipId).subscribe(response => {
      this.admittedchilds = response.responseObject
      this.caseId = this.admittedchilds.caseId;
      this.admissionDate =  this.admittedchilds.admissionDate;
      console.log(this.caseId);
      
      


     
    }
    );




    


    
  }

  
  ondischargeChange(dischargedate:Date ){
    console.log(dischargedate);
    console.log(this.admissionDate);
    var DateArr = this.admissionDate.split('/');
    var date2 = new Date(dischargedate);
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
    console.log(dischargeForm);

    this.data.dischargeChild(dischargeForm,this.currentUser.nrcUId,this.caseId)
    .subscribe(
        response => {
          if(response > 0){
           
            alert('Successfully Submitted');
            this.router.navigateByUrl('/home');
            
          }
         
           
            
          


        },
        error => {
            alert(error);
            console.log(error);
        });

      


  }
  }


