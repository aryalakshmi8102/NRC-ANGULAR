import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public mainUrl='http://sneha.cstep.in:8080/nrcappdev';

  constructor(private http: HttpClient) {}

  
  getWards(hospId:number):any {
    return this.http.get(this.mainUrl +'/getallwards/'+hospId)
  }


  getUnits(hospId:number):any {
    return this.http.get(this.mainUrl +'/getallunits/'+hospId)
  }


  getReligion() : Observable<any>{
    return this.http.get(this.mainUrl +'/getallreligion')

  }

  getCaste() : Observable<any>{
    return this.http.get(this.mainUrl +'/getallcaste')
    //return this.http.get('https://reqres.in/api/users');
  }

  getReferredfrom():Observable<any>{
    return this.http.get(this.mainUrl +'/getallreferredfrom');
  }



  getAdmissionType():Observable<any>{
    return this.http.get(this.mainUrl +'/getalladmissiontypes');

  }


  

  getAdmissioncriteria():Observable<any>{
    return this.http.get(this.mainUrl+'/getalladmissioncriteria');
  }


  getComorbid():Observable<any>{
    return this.http.get(this.mainUrl+'/getallcomorbidvalues');
  }


  getSocialfactors():Observable<any>{
    return this.http.get(this.mainUrl+'/getallsocialfactors');
  }


  getQualifications(): Observable<any>{
    return this.http.get(this.mainUrl +'/getallqualifications');
   
  }


  getOutcomes(): Observable<any>{
    return this.http.get(this.mainUrl +'/getalloutcomes');
   
  }


  getMedicalrisks(): Observable<any>{
    return this.http.get(this.mainUrl +'/getallmedicalrisks');
   
  }

  getRiskcategory():Observable<any>{
    return this.http.get(this.mainUrl +'/getallriskcategory');
   
  }

  getInpatients(hospId:number):any{
    return this.http.get(this.mainUrl +'/getallinpatients/'+hospId);
    
   
  }


  //inpatient details in discharge header

 // getAdmittedchildsDetails(caseId:number): Observable<any>{
    //console.log(caseId);
   // return this.http.get(this.mainUrl +'/getchilddetails/'+caseId);

  

  //}


  getAdmittedchildsDetails(caseId:number): Observable<any>{
    console.log(caseId);
    
  
    return this.http.post<any>(this.mainUrl +'/getchilddetails/', { 
      
      
      hospitalId : 1,
     
      caseId: caseId,
     
    }
    )
  
    .pipe(map(response => {
  
      if (response.errorCode == 0 && response.responseObject!=null) {
       // console.log(response.responseObject);
        return response.responseObject;
      }else{
        return 0;
      }
  
        
    }));
  
  
  
   
  
  }

  //discharge sd calculation


  
  getDischargesdvalue(weight:any,height:any,gender:any): Observable<any>{
  
    return this.http.post<any>(this.mainUrl +'/findsdvalue/', {
    
      weight : weight,
      height : height,
      gender : gender, 
    
    }
    )
  
    .pipe(map(response => {
        return response;
    }));
  
  
  
   
  
  }


  getAdmittedsdvalue(admissionweight:any,admissionheight:any,gender:any): Observable<any>{
  
    return this.http.post<any>(this.mainUrl +'/findsdvalue/', {
    
      weight : admissionweight,
      height :admissionheight,
      gender : "M", 
    
    }
    )
  
    .pipe(map(response => {
        return response;
    }));
  
  
  
   
  
  }
  
  





  
//posting discharge data


dischargeChild(data:any,userId:string,caseId:any,dischargesdvalue:any):any{
  console.log("dischargeChild ==== "+JSON.stringify(data));
  var request = { 
    //dischargeDate : data.adate,
    dischargeDate :data.ddate,
    dischargeWeight:data.dweight,
    dischargeHeight:data.dheight,
    dischargeSd:dischargesdvalue,
    minWeightDate:data.minimumweightdate,
    minWeight:data.minimumweight,
    
    hospitalId : 1,
    loginUserId: userId,
    caseId:caseId,
    dischargeChildDetails:[
      {
                     avgWeightGainKg: data.dweight,
                     clinicalImpression:data.clinicalimpression,
                     dietaryAdvice:data.dietarycomment,
                     medicalAdvice:data.medicalcomment,
                     treatmentGiven:data.treatmentcomment,
                     outcomeId:data.outcomes.configId


      }
      ],
      dischargeComorbidConditions:[
        {
                       comorbidId:1,
                       othersValue:null
        },
        {
                       comorbidId:4,
                       othersValue:null
        }
        ],
        dischargeMotherDetails: [
          {
                         medicalRiskId: data.medicalrisks.configId,
          }
          ],





  };

  console.log("request ====="+JSON.stringify(request));
  return this.http.post<any>(this.mainUrl +`/updatecase`, request
  )

  .pipe(map(response => {

    if (response.errorCode == 0) {
     // console.log(response.responseObject);
      return 1;
    }else{
      return 0;
    }

      
  }));



 

}



//search 

searchChild(data:any,):any{
//console.log("data ="+JSON.stringify(data));  
 var request:any;

  request ={ 
    uhId : data.searchopd==""?null:data.searchopd,
    childDob:(data.searchdob==undefined && data.searchdob=="")?null:data.searchdob,
    rchId:data.searchrch==""?null:data.searchrch,
    childName:data.searchchildname==""?null:data.searchchildname,
    motherName:data.searchmothername==""?null:data.searchmothername,
    mobileNumber:data.searchcontact==""?null:data.searchcontact,
  }

  return this.http.post<any>(this.mainUrl +`/searchdetails`, request
  )

  .pipe(map(response => {
      return response;
    // if (response.errorCode == 0) {
    //   return response.responseObject.searchResultList;
    // }else{
    //   return [];
    // }

      
  }));



 

}

//readmission

getSearchedChildDetails(data:any,):any{
  console.log(" data = caseId = "+data);
  
  return this.http.post<any>(this.mainUrl +`/getcasedetails`, { 
    caseId:data,
      hospitalId: 1
  }
  )

  .pipe(map(response => {
    console.log("response.responseObject= "+JSON.stringify(response));
    if (response.errorCode == 0) {
      return response.responseObject;
    }else{
      return [];
    }

      
  }));



 

}


admissionfull(userForm:any,childForm:any,caseForm:any,detailsForm:any,userId:string,caseId:any,
  admissionCriterias:any,comorbidConditions:any):any{
  var request = { 
    motherAge : userForm.motherage,
    motherDob : userForm.motherdob,
    educationQualificationId : userForm.qualifications.configId,
    familyPlanning : userForm.familyplanning,
    motherName : userForm.mothername,
    loginUserId: userId,

    address : childForm.childaddress,
    childAgeinYears :childForm.childageyear,
    childAgeinMonths : childForm.childage,
    category : childForm.category,
    childDob : childForm.childdob,
    gender:childForm.childsex ,
    mobileNumber:childForm.contactno,
    childName:childForm.childname,
    rchId:childForm.rch,
    religionId : childForm.religion,
    casteId : childForm.caste,

    admissionDate :caseForm.admissiondate,
    
    admissionTypeId :detailsForm.admissiontype,
    samNumber : detailsForm.samno,
    ipNum :detailsForm.ip,
    uhId  :detailsForm.uhid,
    targetWeight :caseForm.targetweight,
    hospitalId :1,
    caseId:caseId,
    comorbidConditions : comorbidConditions,
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
     admissionCriterias : admissionCriterias,
      caseAllocations : [{
        unitId: detailsForm.units.configId,
        wardId: detailsForm.wards.configId,

      }],
      caseMotherDetails : [{
        breastFeedingAtPresent: userForm.breastfeeding,
        drugsPrescribed:userForm.Drugs,
        medicalProblem: userForm.medicalproblem,
        registeredForAnc : userForm.reganc,
        pregnantAtPresent : userForm.pregnant,
        numberOfPregnancyMonths:userForm.pregnantmonth,
        medicalProblemDetails:userForm.medcomment,
        presentDietaryChoice : userForm.Dietary,
        noOfChildren : userForm.noofchildren,
        noOfMealsPerDay : userForm.meals,
        lastMenstruationDate: userForm.menstruation,
        riskCategoryId:userForm.riskcategory.configId,
        

      }],

      caseMotherGrowths : [{
        bloodPressureDia : userForm.bloodpressuredp,
        bloodPressureSys : userForm.bloodpressurecp,
        bloodSugarFasting : userForm.bloodglucos,
       
        bmi: userForm.motherbmi,
        gravida: userForm.gravida,
        para: userForm.para,
        weightKg: userForm.motherweight,
        neckCircumferenceCm:userForm.neckmother,
        muacCm:userForm.muacmother,
        heightCm:userForm.motherheight,
        hemoglobin:userForm.hbmother,
       
      
    }]
,
caseMotherSocialFactors:[{
  socialFactorsId:4,
 

}],
caseReferrals : [{

  referredBy:detailsForm.referredby,
  referredFromId:detailsForm.referred.configId,


}],
childGrowths : [{
  heightCm:caseForm.admissionheight,
  
   weightKg:caseForm.admissionweight,

}]
    
}

console.log("request = "+JSON.stringify(request))

  return this.http.post<any>(this.mainUrl +`/createcase`, request
)
.pipe(map(response => {

  if (response.errorCode == 0) {
    alert('Admission successfuly processed');
    return 1;
  }else{
    alert('Admission details not processed');
    return 0;
  }
},
err   => {

//console.log("Error", err );
alert('Errro');

}

));




}



/*
  registerMother(data:any,userId:string):any{
 //   console.log(userId+'LoginId');
    return this.http.post<any>(this.mainUrl +`/registermother`, { 


     

      age : data.motherage,
      dateOfBirth : data.motherdob,
      educationQualificationId : data.qualifications.configId,
      familyPlanning : data.familyplanning,
      name : data.mothername,
    
      loginUserId: userId
  }
  )
  .pipe(map(response => {

    if (response.errorCode == 0) {
      //console.log(response.responseObject);
      return response.responseObject.motherId;
    }else{
      alert('Mother details not procesed');
      return 0;
    }
  }));

  }

*/
/*
  registerChild(data:any,userId:string,motherId:string):any{
    return this.http.post<any>(this.mainUrl +`/registerchild`, { 
     
     address : data.childaddress,
     age : data.childage,
    
     category : data.category,
     motherId : motherId,
     dateOfBirth : data.childdob,
     gender:data.childsex ,
     mobileNumber:data.contactno,
     name:data.childname,
     rchId:data.rch,
     casteId : data.caste.configId,
     
     religionId : data.religion.configId,
     loginUserId: userId,

  }
  )
  .pipe(map(response => {

    if (response.errorCode == 0) {
     // console.log(response.responseObject);
      return response.responseObject.childId;
    
    }else{
      alert('Child details not procesed');

      return 0;
    }

      
  }));

  }


 */
/*

  
  

  registerCase(userForm:any,childForm:any,caseForm:any,detailsForm:any,
                userId:string,motherId:string,childId:string):any{
    return this.http.post<any>(this.mainUrl +`/registercase`, { 

      admissionDate :caseForm.admissiondate,
    
      admissionTypeId :detailsForm.admissiontype.configId,
      ipNum :detailsForm.ip,
      uhId  :detailsForm.uhid,
      targetWeight :caseForm.targetweight,
     
      hospitalId :1,
      childId : childId,
      motherId : motherId,
      loginUserId :  userId,
    
      comorbidConditions : [{
                            //  comorbidId:detailsForm.comorbidId,
                            comorbidId:1,
                            othersValue:null
                            
                            
                          }]
      ,
      admissionCriterias : [{         
                        criteriaId:2,
                        otherValue:null


      }],
      caseAllocations : [{
        unitId: detailsForm.units.configId,
        wardId: detailsForm.wards.configId,

      }],
      caseMotherDetails : [{
        breastFeedingAtPresent:true,
        drugsPrescribed: true,
        medicalProblem: true,
        registeredForAnc : true,
        pregnantAtPresent : true,
       
        presentDietaryChoice : userForm.Dietary,
        noOfChildren : userForm.noofchildren,
        noOfMealsPerDay : userForm.meals,
        lastMenstruationDate: userForm.menstruation,
        

      }],

      caseMotherGrowths : [{
        bloodPressureDia : userForm.bloodpressuredp,
        bloodPressureSys : userForm.bloodpressurecp,
        bloodSugarFasting : userForm.bloodglucos,
       
        bmi: userForm.motherbmi,
        gravida: userForm.gravida,
        para: userForm.para,
        weightKg: userForm.motherweight,
        neckCircumferenceCm:userForm.neckmother,
        muacCm:userForm.muacmother,
        heightCm:userForm.motherheight,
        hemoglobin:userForm.hbmother,
       
      
    }]
,
caseMotherSocialFactors:[{
  socialFactorsId:4,
 

}],
caseReferrals : [{

  referredBy:detailsForm.referredby,
  referredFromId:detailsForm.referred.configId,


}],
childGrowths : [{
  heightCm:caseForm.admissionheight,
  
   weightKg:caseForm.admissionweight,

}]
  }
  )
  .pipe(map(response => {

    if (response.errorCode == 0) {
     // console.log(response.responseObject);
     alert('Case details Submit successfuly');
      return response.responseObject.caseId;
    }else{
      alert('Case details not procesed');

      return 0;
    }

      
  }));

  }

  
         


*/









 
  


  
 
  
}
