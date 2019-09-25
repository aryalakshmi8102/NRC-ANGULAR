import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as FileSaver from 'file-saver';




@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public mainUrl = 'http://cstem.cstep.in/nrcappdev';

  constructor(private http: HttpClient) { }


  getWards(hospId: number): any {
    return this.http.get(this.mainUrl + '/getallwards/' + hospId)
  }


  getUnits(hospId: number): any {
    return this.http.get(this.mainUrl + '/getallunits/' + hospId)
  }


  getReligion(): Observable<any> {
    return this.http.get(this.mainUrl + '/getallreligion')

  }

  getCaste(): Observable<any> {
    return this.http.get(this.mainUrl + '/getallcaste')

  }

  getReferredfrom(): Observable<any> {
    return this.http.get(this.mainUrl + '/getallreferredfrom');
  }



  getAdmissionType(): Observable<any> {
    return this.http.get(this.mainUrl + '/getalladmissiontypes');

  }




  getAdmissioncriteria(): Observable<any> {
    return this.http.get(this.mainUrl + '/getalladmissioncriteria');
  }


  getComorbid(): Observable<any> {
    return this.http.get(this.mainUrl + '/getallcomorbidvalues');
  }


  getSocialfactors(): Observable<any> {
    return this.http.get(this.mainUrl + '/getallsocialfactors');
  }


  getQualifications(): Observable<any> {
    return this.http.get(this.mainUrl + '/getallqualifications');

  }


  getOutcomes(): Observable<any> {
    return this.http.get(this.mainUrl + '/getalloutcomes');

  }


  getMedicalrisks(): Observable<any> {
    return this.http.get(this.mainUrl + '/getallmedicalrisks');

  }

  getRiskcategory(): Observable<any> {
    return this.http.get(this.mainUrl + '/getallriskcategory');

  }

  getInpatients(hospId: number): any {
    return this.http.get(this.mainUrl + '/getallinpatients/' + hospId);


  }


  //inpatient details in discharge header

  // getAdmittedchildsDetails(caseId:number): Observable<any>{
  //console.log(caseId);
  // return this.http.get(this.mainUrl +'/getchilddetails/'+caseId);



  //}


  getAdmittedchildsDetails(caseId: number): Observable<any> {
    console.log(caseId);


    return this.http.post<any>(this.mainUrl + '/getchilddetails/', {


      hospitalId: 1,

      caseId: caseId,

    }
    )

      .pipe(map(response => {

        if (response.errorCode == 0 && response.responseObject != null) {
          // console.log(response.responseObject);
          return response.responseObject;
        } else {
          return 0;
        }


      }));





  }

  //discharge sd calculation



  getDischargesdvalue(weight: any, height: any, gender: any): Observable<any> {

    return this.http.post<any>(this.mainUrl + '/findsdvalue/', {

      weight: weight,
      height: height,
      gender: gender,

    }
    )

      .pipe(map(response => {
        return response;
      }));





  }


  getAdmittedsdvalue(weight: any, height: any, gender: any): Observable<any> {

    return this.http.post<any>(this.mainUrl + '/findsdvalue/', {

      weight: weight,
      height: height,
      gender: gender,


    }
    )

      .pipe(map(response => {
        return response;
      }));





  }








  //posting discharge data


  dischargeChild(data: any, userId: string, caseId: any, dischargesdvalue: any): any {
    console.log("dischargeChild ==== " + JSON.stringify(data));
    var request = {
      //dischargeDate : data.adate,
      dischargeDate: data.ddate,
      dischargeWeight: data.dweight,
      dischargeHeight: data.dheight,
      dischargeSd: dischargesdvalue,
      minWeightDate: data.minimumweightdate,
      minWeight: data.minimumweight,

      hospitalId: 1,
      loginUserId: userId,
      caseId: caseId,
      dischargeChildDetails: [
        {
          avgWeightGainKg: data.weightgain,
          clinicalImpression: data.clinicalimpression,
          dietaryAdvice: data.dietarycomment,
          medicalAdvice: data.medicalcomment,
          treatmentGiven: data.treatmentcomment,
          outcomeId: data.outcomes.configId


        }
      ],
      dischargeComorbidConditions: [
        {
          comorbidId: 1,
          othersValue: null
        },

      ],
      dischargeMotherDetails: [
        {
          medicalRiskId: data.medicalrisks.configId,
        }
      ],





    };

    console.log("request =====" + JSON.stringify(request));
    return this.http.post<any>(this.mainUrl + `/updatecase`, request
    )

      .pipe(map(response => {

        if (response.errorCode == 0) {
          // console.log(response.responseObject);
          return 1;
        } else {
          return 0;
        }


      }));





  }



  //search 

  searchChild(data: any, ): any {
    //console.log("data ="+JSON.stringify(data));  
    var request: any;

    request = {
      uhId: data.searchopd == "" ? null : data.searchopd,
      samNumber: (data.searchsam == undefined && data.searchsam == "") ? null : data.searchsam,
      rchId: data.searchrch == "" ? null : data.searchrch,
      childName: data.searchchildname == "" ? null : data.searchchildname,
      motherName: data.searchmothername == "" ? null : data.searchmothername,
      mobileNumber: data.searchcontact == "" ? null : data.searchcontact,
    }

    return this.http.post<any>(this.mainUrl + `/searchdetails`, request
    ).pipe(map(response => {
      return response;
      // if (response.errorCode == 0) {
      //   return response.responseObject.searchResultList;
      // }else{
      //   return [];
      // }


    }));





  }

  //readmission

  getSearchedChildDetails(data: any, ): any {
    console.log(" data = caseId = " + data);

    return this.http.post<any>(this.mainUrl + `/getcasedetails`, {
      caseId: data,
      hospitalId: 1
    }
    )

      .pipe(map(response => {
        console.log("response.responseObject= " + JSON.stringify(response));
        if (response.errorCode == 0) {
          return response.responseObject;
        } else {
          return [];
        }


      }));





  }


  SenddailycareDetails(dailyForm: any, caseId: any, userId: string): any {


    return this.http.post<any>(this.mainUrl + `/savechildgrowth`, {
      caseId: caseId,
      hospitalId: 1,
      userId: userId,



      measurementDate: dailyForm.dailydate == "" ? null : dailyForm.dailydate,
      diet: dailyForm.dailydiet == "" ? null : dailyForm.dailydiet,
      weightKg: dailyForm.dailyweight == "" ? null : dailyForm.dailyweight,



    }
    )

      .pipe(map(response => {
        console.log("response.responseObject= " + JSON.stringify(response));
        if (response.errorCode == 0) {
          return response.responseObject;
        } else {
          return [];
        }


      }));




  }

  getDailygrowthList(caseId: any): any {


    return this.http.post<any>(this.mainUrl + `/getchildgrowthlist`, {
      caseId: caseId,
      hospitalId: 1,



    }
    )

      .pipe(map(response => {
        // console.log("response.responseObject.growthList= "+JSON.stringify(response));
        if (response.errorCode == 0 && response.responseObject != null) {
          return response.responseObject;
          return response.responseObject.growthList;

        } else {
          return 0;
        }


      }));




  }







  admissionfull(userForm: any, childForm: any, caseForm: any, detailsForm: any, userId: string, caseId: any,
    admissionCriterias: any, comorbidConditions: any): any {
    //searchedchilds: any
    var request = {
      motherAge: userForm.motherage,
      motherDob: userForm.motherdob == "" ? null : userForm.motherdob,

      educationQualificationId: userForm.qualifications.configId == "" ? null : userForm.qualifications.configId,
      familyPlanning: userForm.familyplanning == "" ? null : userForm.familyplanning,
      motherName: userForm.mothername,
      loginUserId: userId,

      address: childForm.childaddress,
      childAgeinYears: childForm.childageyear,
      childAgeinMonths: childForm.childagemonth,
      category: childForm.category,
      childDob: childForm.childdob == "" ? null : childForm.childdob,
      // gender: searchedchilds.charAt(0),
      gender: childForm.childsex,
      mobileNumber: childForm.contactno == "" ? null : childForm.contactno,
      childName: childForm.childname,
      rchId: childForm.rch == "" ? null : childForm.rch,
      religionId: childForm.religion,
      casteId: childForm.caste,

      admissionDate: caseForm.admissiondate,

      admissionTypeId: detailsForm.admissiontype,
      samNumber: detailsForm.samno,
      ipNum: detailsForm.ip,
      uhId: detailsForm.uhid,
      targetWeight: caseForm.targetweight,
      hospitalId: 1,
      caseId: caseId,
      comorbidConditions: comorbidConditions,
      //my test
      // comorbidConditions : [{

      //comorbidId:1,
      //othersValue:null


      //},
      //{
      //comorbidId: 6,
      //othersValue: null
      // }]
      //,
      // admissionCriterias : [{         
      //  criteriaId:2,
      //  otherValue:null


      // }],
      //my test
      admissionCriterias: admissionCriterias,
      caseAllocations: [{
        unitId: detailsForm.units.configId,
        wardId: detailsForm.wards.configId,

      }],
      caseMotherDetails: [{

        breastFeedingAtPresent: userForm.breastfeeding == "" ? null : userForm.breastfeeding,
        drugsPrescribed: userForm.Drugs == "" ? null : userForm.Drugs,
        medicalProblem: userForm.medicalproblem == "" ? null : userForm.medicalproblem,
        registeredForAnc: userForm.reganc == "" ? null : userForm.reganc,
        pregnantAtPresent: userForm.pregnant == "" ? null : userForm.pregnant,
        numberOfPregnancyMonths: userForm.pregnantmonth == "" ? null : userForm.pregnantmonth,
        medicalProblemDetails: userForm.medcomment == "" ? null : userForm.medcomment,
        presentDietaryChoice: userForm.Dietary == "" ? null : userForm.Dietary,
        noOfChildren: userForm.noofchildren == "" ? null : userForm.noofchildren,
        noOfMealsPerDay: userForm.meals == "" ? null : userForm.meals,
        lastMenstruationDate: userForm.menstruation == "" ? null : userForm.menstruation,
        riskCategoryId: userForm.riskcategory == "" ? null : userForm.riskcategory,


      }],

      caseMotherGrowths: [{
        bloodPressureDia: userForm.bloodpressuredp == "" ? null : userForm.bloodpressuredp,
        bloodPressureSys: userForm.bloodpressurecp == "" ? null : userForm.bloodpressurecp,
        bloodSugarFasting: userForm.bloodglucose == "" ? null : userForm.bloodglucose,

        bmi: userForm.motherbmi == "" ? null : userForm.motherbmi,
        gravida: userForm.gravida == "" ? null : userForm.gravida,
        para: userForm.para == "" ? null : userForm.para,
        weightKg: userForm.motherweight == null ? null : userForm.motherweight,
        neckCircumferenceCm: userForm.neckmother == "" ? null : userForm.neckmother,
        muacCm: userForm.muacmother == "" ? null : userForm.muacmother,
        heightCm: userForm.motherheight == "" ? null : userForm.motherheight,
        hemoglobin: userForm.hbmother == "" ? null : userForm.hbmother,


      }]
      ,
      caseMotherSocialFactors: [{
        socialFactorsId: 4,


      }],
      caseReferrals: [{

        referredBy: detailsForm.referredby == "" ? null : detailsForm.referredby,
        referredFromId: detailsForm.referred.configId,


      }],
      childGrowths: [{
        heightCm: caseForm.admissionheight,

        weightKg: caseForm.admissionweight,

      }]

    }

    console.log("request = " + JSON.stringify(request))

    return this.http.post<any>(this.mainUrl + `/createcase`, request
    )
      .pipe(map(response => {

        if (response.errorCode == 0) {
          alert('Admission successfuly processed');
          return 1;
        } else {
          alert('Admission details not processed');
          return 0;
        }
      },
        err => {

          //console.log("Error", err );
          alert('Errro');

        }

      ))
  }

  //readmission



  reAdmissionfull(userForm: any, childForm: any, caseForm: any,  detailsForm: any,searchedchilds: any, userId: string, caseId: any,
    admissionCriterias: any, comorbidConditions: any): any {
    //searchedchilds: any
    var request = {
      motherAge: userForm.motherage,
      motherDob: userForm.motherdob == "" ? null : userForm.motherdob,

      educationQualificationId: userForm.qualifications.configId == "" ? null : userForm.qualifications.configId,
      familyPlanning: userForm.familyplanning == "" ? null : userForm.familyplanning,
      motherName: userForm.mothername,
      loginUserId: userId,

      address: childForm.childaddress,
      childAgeinYears: childForm.childageyear,
      childAgeinMonths: childForm.childagemonth,
      category: childForm.category,
      childDob: childForm.childdob == "" ? null : childForm.childdob,
       gender: searchedchilds.charAt(0),
      //gender:childForm.childsex,
      mobileNumber: childForm.contactno == "" ? null : childForm.contactno,
      childName: childForm.childname,
      rchId: childForm.rch == "" ? null : childForm.rch,
      religionId: childForm.religion,
      casteId: childForm.caste,

      admissionDate: caseForm.admissiondate,

      admissionTypeId: detailsForm.admissiontype,
      samNumber: detailsForm.samno,
      ipNum: detailsForm.ip,
      uhId: detailsForm.uhid,
      targetWeight: caseForm.targetweight,
      hospitalId: 1,
      caseId: caseId,
      comorbidConditions: comorbidConditions,
      //my test
      // comorbidConditions : [{

      //comorbidId:1,
      //othersValue:null


      //},
      //{
      //comorbidId: 6,
      //othersValue: null
      // }]
      //,
      // admissionCriterias : [{         
      //  criteriaId:2,
      //  otherValue:null


      // }],
      //my test
      admissionCriterias: admissionCriterias,
      caseAllocations: [{
        unitId: detailsForm.units.configId,
        wardId: detailsForm.wards.configId,

      }],
      caseMotherDetails: [{

        breastFeedingAtPresent: userForm.breastfeeding == "" ? null : userForm.breastfeeding,
        drugsPrescribed: userForm.Drugs == "" ? null : userForm.Drugs,
        medicalProblem: userForm.medicalproblem == "" ? null : userForm.medicalproblem,
        registeredForAnc: userForm.reganc == "" ? null : userForm.reganc,
        pregnantAtPresent: userForm.pregnant == "" ? null : userForm.pregnant,
        numberOfPregnancyMonths: userForm.pregnantmonth == "" ? null : userForm.pregnantmonth,
        medicalProblemDetails: userForm.medcomment == "" ? null : userForm.medcomment,
        presentDietaryChoice: userForm.Dietary == "" ? null : userForm.Dietary,
        noOfChildren: userForm.noofchildren == "" ? null : userForm.noofchildren,
        noOfMealsPerDay: userForm.meals == "" ? null : userForm.meals,
        lastMenstruationDate: userForm.menstruation == "" ? null : userForm.menstruation,
        riskCategoryId: userForm.riskcategory == "" ? null : userForm.riskcategory,


      }],

      caseMotherGrowths: [{
        bloodPressureDia: userForm.bloodpressuredp == "" ? null : userForm.bloodpressuredp,
        bloodPressureSys: userForm.bloodpressurecp == "" ? null : userForm.bloodpressurecp,
        bloodSugarFasting: userForm.bloodglucose == "" ? null : userForm.bloodglucose,

        bmi: userForm.motherbmi == "" ? null : userForm.motherbmi,
        gravida: userForm.gravida == "" ? null : userForm.gravida,
        para: userForm.para == "" ? null : userForm.para,
        weightKg: userForm.motherweight == null ? null : userForm.motherweight,
        neckCircumferenceCm: userForm.neckmother == "" ? null : userForm.neckmother,
        muacCm: userForm.muacmother == "" ? null : userForm.muacmother,
        heightCm: userForm.motherheight == "" ? null : userForm.motherheight,
        hemoglobin: userForm.hbmother == "" ? null : userForm.hbmother,


      }]
      ,
      caseMotherSocialFactors: [{
        socialFactorsId: 4,


      }],
      caseReferrals: [{

        referredBy: detailsForm.referredby == "" ? null : detailsForm.referredby,
        referredFromId: detailsForm.referred.configId,


      }],
      childGrowths: [{
        heightCm: caseForm.admissionheight,

        weightKg: caseForm.admissionweight,

      }]

    }

    console.log("request = " + JSON.stringify(request))

    return this.http.post<any>(this.mainUrl + `/createcase`, request
    )
      .pipe(map(response => {

        if (response.errorCode == 0) {
          alert('Admission successfuly processed');
          return 1;
        } else {
          alert('Admission details not processed');
          return 0;
        }
      },
        err => {

          //console.log("Error", err );
          alert('Errro');

        }

      ));




  }



  //report


  getSummaryReport(reportForm: any, userId: string): any {
    var request = {
      requestDate: reportForm.startdate,
      loginUserId: userId,
    }

    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.post<any>(this.mainUrl + `/getsummaryreport/pdf`, request,
      { headers: headers, responseType: 'blob' as 'json' })

      .pipe(map(response => {
        console.log(response);
        var mediaType = 'application/pdf';
        var blob = new Blob([response], { type: mediaType });
        var filename = 'summaryreport.pdf';
        FileSaver.saveAs(blob, filename);
      }));




  }

  //monthly report


  getMonthlyReport(MothlyreportForm: any, userId: string): any {
    var request = {
      requestDate: MothlyreportForm.month + " " + MothlyreportForm.years,
      //requestDate: "may 2019",
      loginUserId: userId,

    }

    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.post<any>(this.mainUrl + `/getmonthlyreport/pdf`, request,
      { headers: headers, responseType: 'blob' as 'json' })

      .pipe(map(response => {
        console.log(response);
        var mediaType = 'application/pdf';
        var blob = new Blob([response], { type: mediaType });
        var filename = 'monthlyreport.pdf';
        FileSaver.saveAs(blob, filename);
      }));




  }





  SendchangepasswordDetails(changepasswordForm: any): any {


    return this.http.post<any>(this.mainUrl + `/changepassword`, {



      userId: changepasswordForm.uname,
      oldPassword: changepasswordForm.pass,
      newPassword: changepasswordForm.newpass,



    }
    )

      .pipe(map(response => {
        console.log("response.responseObject= " + JSON.stringify(response));
        if (response.errorCode == 0) {
          return response.responseObject;
        } else {
          return [];
        }


      }));




  }




  SendResourceDetails(hrForm: any, userId: string): any {


    return this.http.post<any>(this.mainUrl + `/saveresourceslist`, {




      loginUserId: userId,
      numberOfBeds: hrForm.bedno == "" ? null : hrForm.bedno,
      officerList: [{
        sanctioned: hrForm.paedisan == "" ? null : hrForm.paedisan,
        working: hrForm.paediworking == "" ? null : hrForm.paediworking,
        vacant: hrForm.paedivacant == "" ? null : hrForm.paedivacant,
        training: hrForm.paeditraining == "" ? null : hrForm.paeditraining,
      }
      ],
      nurseList: [{
        sanctioned: hrForm.staffsan == "" ? null : hrForm.staffsan,
        working: hrForm.staffwork == "" ? null : hrForm.staffwork,
        vacant: hrForm.staffvacant == "" ? null : hrForm.staffvacant,
        training: hrForm.stafftraining == "" ? null : hrForm.stafftraining,
      }

      ],
      dieticianList: [{
        sanctioned: hrForm.dietsan == "" ? null : hrForm.dietsan,
        working: hrForm.dietwork == "" ? null : hrForm.dietwork,
        vacant: hrForm.dietvacant == "" ? null : hrForm.dietvacant,
        training: hrForm.diettraining == "" ? null : hrForm.diettraining,
      }
      ],
      cookList: [{
        sanctioned: hrForm.cooksan == "" ? null : hrForm.cooksan,
        working: hrForm.cookwork == "" ? null : hrForm.cookwork,
        vacant: hrForm.cookvacant == "" ? null : hrForm.cookvacant,
        training: hrForm.cooktraining == "" ? null : hrForm.cooktraining,
      }
      ],
      tenderList: [{
        sanctioned: hrForm.atsan == "" ? null : hrForm.atsan,
        working: hrForm.atwork == "" ? null : hrForm.atwork,
        vacant: hrForm.atvacant == "" ? null : hrForm.atvacant,
        training: hrForm.attraining == "" ? null : hrForm.ttraining,
      }
      ],
      mswList: [{
        sanctioned: hrForm.mswsan == "" ? null : hrForm.swsan,
        working: hrForm.mswwork == "" ? null : hrForm.mswwork,
        vacant: hrForm.mswvacant == "" ? null : hrForm.mswvacant,
        training: hrForm.mswtraining == "" ? null : hrForm.mswtraining,
      }
      ]


    }
    )

      .pipe(map(response => {
        console.log("response.responseObject= " + JSON.stringify(response));

        if (response.errorCode == 0) {
          return response.responseObject;
        } else {
          return [];
        }


      }));




  }





  GetResourceDetails(userId: string): any {


    return this.http.post<any>(this.mainUrl + `/getresourceslist`, {

      loginUserId: userId,


    }
    )

      .pipe(map(response => {
        console.log("response.responseObject= " + JSON.stringify(response));
        if (response.errorCode == 0) {
          return response.responseObject;
        } else {
          return [];
        }


      }));




  }

  DeleteDailyRecord(Id): any {


    return this.http.post<any>(this.mainUrl + `/deletechildgrowth`, {

      measurementList: [Id],


    }
    )

      .pipe(map(response => {
        console.log("response.responseObject= " + JSON.stringify(response));
        if (response.errorCode == 0) {
          return response.responseObject;
        } else {
          return [];
        }


      }));




  }

  getmalnutrtionstatus(): Observable<any> {
    return this.http.get(this.mainUrl + '/getallmalnutrtionstatus')

  }


  getallplacesforfollowup(): Observable<any> {
    return this.http.get(this.mainUrl + '/getallplacesforfollowup')

  }

  SaveFollowup(FollowupForm: any, caseId: any, followupsdvalue: any, userId: string): any {


    return this.http.post<any>(this.mainUrl + `/savefollowup`, {

      caseId: caseId,
      userId: userId,
      doneBy: FollowupForm.followupby == "" ? null : FollowupForm.followupby,
      followupDate: FollowupForm.followupdate == "" ? null : FollowupForm.followupdate,
      // placeId : FollowupForm.followupplace.configId==""?null:FollowupForm.followupplace.configId,
      //statusId : FollowupForm.followupstatus.configId==""?null: FollowupForm.followupstatus.configId,
      statusId: FollowupForm.followupstatus,
      placeId: FollowupForm.followupplace,
      heightCm: FollowupForm.followupheight == "" ? null : FollowupForm.followupheight,
      weightKg: FollowupForm.followupweight == "" ? null : FollowupForm.followupweight,
      standardDev: followupsdvalue,
      remarks: FollowupForm.followupremark == "" ? null : FollowupForm.followupremark,



    }
    )

      .pipe(map(response => {
        console.log("response.responseObject= " + JSON.stringify(response));
        if (response.errorCode == 0) {
          return response.responseObject;
        } else {
          return [];
        }


      }));




  }


  getfollowupHistory(caseId: number): Observable<any> {
    return this.http.get(this.mainUrl + '/getallfollowups/' + caseId)

  }





  DeleteFollowupHistory(Id): any {


    return this.http.post<any>(this.mainUrl + `/deletefollowups`, {

      followupList: [Id],


    }
    )

      .pipe(map(response => {
        console.log("response.responseObject= " + JSON.stringify(response));
        if (response.errorCode == 0) {
          return response.responseObject;
        } else {
          return [];
        }


      }));




  }


  getFollowupsdvalue(height: any, weight: any, gender: any): Observable<any> {

    return this.http.post<any>(this.mainUrl + '/findsdvalue/', {


      height: height,
      weight: weight,
      gender: "M",

    }
    )

      .pipe(map(response => {
        return response;
      }));





  }


  getfollowupDue(): Observable<any> {
    return this.http.get(this.mainUrl + '/getfollowupdue/')

  }






}
