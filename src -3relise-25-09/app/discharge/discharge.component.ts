import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../_services/api.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-discharge',
  templateUrl: './discharge.component.html',
  styleUrls: ['./discharge.component.css']

})
export class DischargeComponent implements OnInit {
  UserSession: string;
  admittedchilds: any;
  dischargesdvalue: any;
  ipId: any;
  currentUser: any;
  dischargeForm: any;
  caseId: any;
  discomorbids: Object;
  outcomes: Object;
  medicalrisks: Object;
  admissionDate: string;
  newadmissionDate: Date;
  d1date: any;
  d2date: any;
  d3date: any;
  d4date: any;
  d5date: any;
  d6date: any;
  d7date: any;
  d8date: any;

  dstay: number;
  //for calculation
  modweight: number;
  modheight: number;
  ddate: any;
  aweight: number;
  dweight: number;
  minimumweight: number;
  private sub: any;
  time: any;
  dheight: any;
  weightgain: any;
  fdate: any;
  f1date: any;
  f2date: any;
  f3date: any;




  constructor(private http: HttpClient,
    private router: Router,
    private data: ApiService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
  ) { }


  ngOnInit() {
    //todays date


    this.time = this.datePipe.transform(new Date());
    this.ddate = Date();
    //this.ondischargeChange(this.ddate);

    var dt = new Date(this.time);
    dt.setDate(dt.getDate() + 15);
    console.log(dt);


    this.admittedchilds = {
      childName: null,
      gender: null,
      ipNumber: null,
      rchId: null,
      uhId: null,
      samNumber: null,
      mobileNumber: null,
      caseId: null,
      admissionDate: null,
      admissionWeight: null,
      admissionHeight: null,
      admissionSd: null
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





    this.data.getMedicalrisks().subscribe(response => {
      this.medicalrisks = response.responseObject.genericList
    }
    );


    //dischargeheader

    this.data.getAdmittedchildsDetails(this.caseId).subscribe(response => {
      console.log("getAdmittedchildsDetails response = " + JSON.stringify(response));

      //this.admittedchilds = response.responseObject;
      //this.caseId = this.admittedchilds.caseId;
      //this.admissionDate =  this.admittedchilds.admissionDate;
      // console.log(this.caseId);
      if (response != 0) {
        this.admittedchilds = response;

        this.wfhlCalculation(response.targetWeight, response.admissionHeight)


        // wfhlCalculation(this.admittedchilds.dweight,this.admittedchilds.dheight)
        console.log("admittedchilds2 = " + this.admittedchilds.uhId);
        console.log(this.caseId);
      }
    }
    );



    //discharde sd


    //discharge SD





  }



  updateWeightGain() {
    console.log(this.dweight)
    console.log(this.minimumweight)
    console.log(this.dstay)
    var cal = (this.dweight - this.minimumweight) * 1000 / (this.dstay * this.minimumweight)
    console.log('pop', cal)
    var cal1 = cal.toFixed(2)
    console.log("cal1  ========== " + cal1)
    this.weightgain = cal1;
  }


  removeWeightGain() {
    if (this.outcomes == "depth") {
      this.weightgain = "0.0";

    }
    else {
      this.weightgain = this.updateWeightGain()

    }

  }


  addDays(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  }

  // ondischargeChange(dischargedate: Date) {
  //   console.log(dischargedate);
  //   console.log(this.admittedchilds.admissionDate);
  //   var DateArr = this.admittedchilds.admissionDate.split('/');
  //   var date2 = new Date(dischargedate);
  //   var newdate = new Date(date2);
  //   newdate.setDate(date2.getDate() + 7);
  //   this.fdate = (newdate.getDate()) + '/' + (newdate.getMonth() + 1) + '/' + newdate.getFullYear();
  //   var createdDate = DateArr[2] + '-' + DateArr[1] + '-' + DateArr[0];
  //   var date1 = new Date(createdDate);
  //   if (date2.getTime() > date1.getTime()) {
  //     var timeDiff = Math.abs(date2.getTime() - date1.getTime());
  //     var dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
  //     var days = Math.floor(timeDiff / dayDifference);
  //     var months = Math.floor(days / 31);
  //   } else {
  //     var dayDifference = 0;
  //   }
  //   newdate.setDate(date2.getUTCDate() + 15)
  //   this.f1date = (newdate.getDate()) + '/' + (newdate.getMonth() + 1) + '/' + newdate.getFullYear();
  //   newdate.setDate(date2.getUTCDate() + 30);
  //   this.f2date = (newdate.getDate()) + '/' + (newdate.getMonth() + 1) + '/' + newdate.getFullYear();
  //   newdate.setDate(date2.getUTCDate() + 30);
  //   this.f3date = (newdate.getDate()) + '/' + (newdate.getMonth() + 1) + '/' + newdate.getFullYear();
  //   this.dstay = dayDifference;
  // }


  ondischargeChange(dischargedate: Date) {
    var date2 = new Date(dischargedate);
    var DateArr = this.admittedchilds.admissionDate.split('/');
    var date2 = new Date(dischargedate);
    var newdate = new Date(date2);
    var createdDate = DateArr[2] + '-' + DateArr[1] + '-' + DateArr[0];
    var date1 = new Date(createdDate);
    date2.setTime(date2.getTime() + 7 * 24 * 60 * 60 * 1000);
    this.fdate = (date2.getDate()) + '/' + (date2.getMonth() + 1) + '/' + date2.getFullYear();
    date2.setTime(date2.getTime() + 8 * 24 * 60 * 60 * 1000);
    this.f1date = (date2.getDate()) + '/' + (date2.getMonth() + 1) + '/' + date2.getFullYear();
    date2.setTime(date2.getTime() + 15 * 24 * 60 * 60 * 1000);
    this.f2date = (date2.getDate()) + '/' + (date2.getMonth() + 1) + '/' + date2.getFullYear();
    date2.setTime(date2.getTime() + 30 * 24 * 60 * 60 * 1000);
    this.f3date = (date2.getDate()) + '/' + (date2.getMonth() + 1) + '/' + date2.getFullYear();
    if (date2.getTime() > date1.getTime()) {
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var dayDifference = Math.ceil(timeDiff / ((1000 * 3600 * 24)));
    } else {
      var dayDifference = 0;
    }
    this.dstay = dayDifference -60;
  }
  ondischargeCommunityChange(dischargedate: Date) {
    var date3 = new Date(dischargedate);
    date3.setTime(date3.getTime() + 7 * 24 * 60 * 60 * 1000);
    this.d1date = (date3.getDate()) + '/' + (date3.getMonth() + 1) + '/' + date3.getFullYear();
    date3.setTime(date3.getTime() + 7 * 24 * 60 * 60 * 1000);
    this.d2date = (date3.getDate()) + '/' + (date3.getMonth() + 1) + '/' + date3.getFullYear();
    date3.setTime(date3.getTime() + 7 * 24 * 60 * 60 * 1000);
    this.d3date = (date3.getDate()) + '/' + (date3.getMonth() + 1) + '/' + date3.getFullYear();
    date3.setTime(date3.getTime() + 7 * 24 * 60 * 60 * 1000);
    this.d4date = (date3.getDate()) + '/' + (date3.getMonth() + 1) + '/' + date3.getFullYear();
    date3.setTime(date3.getTime() + 15 * 24 * 60 * 60 * 1000);
    this.d5date = (date3.getDate()) + '/' + (date3.getMonth() + 1) + '/' + date3.getFullYear();
    date3.setTime(date3.getTime() + 15 * 24 * 60 * 60 * 1000);
    this.d6date = (date3.getDate()) + '/' + (date3.getMonth() + 1) + '/' + date3.getFullYear();
    date3.setTime(date3.getTime() + 30 * 24 * 60 * 60 * 1000);
    this.d7date = (date3.getDate()) + '/' + (date3.getMonth() + 1) + '/' + date3.getFullYear();
    date3.setTime(date3.getTime() + 30 * 24 * 60 * 60 * 1000);
    this.d8date = (date3.getDate()) + '/' + (date3.getMonth() + 1) + '/' + date3.getFullYear();
  }


  onSubmitDischarge(dischargeForm: any) {
    console.log(dischargeForm.value);
    if (dischargeForm.valid) {

      this.data.dischargeChild(dischargeForm.value, this.currentUser.nrcUId, this.caseId, this.dischargesdvalue)
        .subscribe(
          response => {
            if (response > 0) {

              alert('Successfully Submitted');
              this.router.navigateByUrl('/home');

            } else {
              alert(response.errorMessage)
            }

          },
          error => {
            alert("discharge failed");
            console.log(error);
          });


    }
    else {
      alert("Please Enter Valid Data")
    }




  }







  // wfhlCalculation(dweight: any, dheight: any) {
  //   this.dischargesdvalue = null;
  //   console.log("dweight = " + dweight)
  //   console.log("dheight = " + dheight)
  //   if (dweight != undefined && dheight != undefined) {
  //     if ((this.admittedchilds.gender == 'M' && dweight >= 1.9 && dweight <= 24.1 && dheight >= 45 && dheight <= 110) ||
  //       (this.admittedchilds.gender == 'F' && dweight >= 1.9 && dweight <= 24.7 && dheight >= 45 && dheight <= 110)) {
  //       this.data.getDischargesdvalue(dweight, dheight, this.admittedchilds.gender).subscribe(response => {
  //         console.log("dischargesdvalue Response = " + JSON.stringify(response));
  //         if (response.errorCode == 0) {
  //           if (response.responseObject != null) {
  //             this.dischargesdvalue = response.responseObject.sdValue;
  //           }
  //         } else {
  //           alert(response.errorMessage)
  //         }
  //       }
  //       );
  //     }
  //   }
  // }
  wfhlCalculation(dweight: any, dheight: any) {
    this.dischargesdvalue = null;
    console.log("dweight = " + dweight)
    console.log("dheight = " + dheight)
    if (dweight != undefined && dheight != undefined) {
      if ((this.admittedchilds.gender == 'M' && dweight >= 1.9 && dweight <= 24.1 && dheight >= 45 && dheight <= 110) ||
        (this.admittedchilds.gender == 'F' && dweight >= 1.9 && dweight <= 24.7 && dheight >= 45 && dheight <= 110)) {
        this.data.getDischargesdvalue(dweight, dheight, this.admittedchilds.gender).subscribe(response => {
          console.log("dischargesdvalue Response = " + JSON.stringify(response));
          if (response.errorCode == 0) {
            if (response.responseObject != null) {
              this.dischargesdvalue = response.responseObject.sdValue;
            }
          } else {
            alert(response.errorMessage)
          }
        }
        );
      }
    }
  }


}


