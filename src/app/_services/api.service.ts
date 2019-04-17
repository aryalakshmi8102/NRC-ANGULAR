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

  getInpatients(hospId:number):any{
    return this.http.get(this.mainUrl +'/getallinpatients/'+hospId);
   
  }


  //inpatient details in discharge header

  getAdmittedchildsDetails(ipId:number): Observable<any>{
    console.log(ipId);
    return this.http.get(this.mainUrl +'/getchilddetails/'+ipId);

  

  }
  
//posting discharge data


dischargeChild(data:any,userId:string,caseId:4):any{
  console.log(data);
  

  return this.http.post<any>(this.mainUrl +`/updatecase`, { 
    //dischargeDate : data.adate,
    dischargeDate : "2019-04-11",
    
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





  }
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
 

  console.log(data);
  
  return this.http.post<any>(this.mainUrl +`/searchdetails`, { 
    uhId : data.searchopd,
    dob:"",
    childId:data.searchchildid,
    motherId:data.searchmotherid,
    mobileNumber:data.searchcontact
   
    
  }
  )

  .pipe(map(response => {

    if (response.errorCode == 0) {
     // console.log(response.responseObject);
      return response.responseObject.searchResultList;
    }else{
      return [];
    }

      
  }));



 

}




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


 

  
  

  registerCase(userForm:any,childForm:any,caseForm:any,detailsForm:any,
                userId:string,motherId:string,childId:string):any{
    return this.http.post<any>(this.mainUrl +`/registercase`, { 

      admissionDate : "2019-04-12",
    
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
        drugsPrescribedDetails : 'test',
        medicalProblemDetails : 'test',
        presentDietaryChoice : userForm.Dietary,
        noOfChildren : userForm.noofchildren,
        noOfMealsPerDay : userForm.meals,
        lastMenstruationDate: userForm.menstruation,
        

      }],

      caseMotherGrowths : [{
        bloodPressureDia : userForm.bloodpressuredp,
        bloodPressureSys : userForm.bloodpressurecp,
        bloodSugarFasting : userForm.bloodglucos,
        bloodSugarRandom: '78.9',
        bmi: userForm.motherbmi,
        gravida: userForm.gravida,
        para: userForm.para,
        weightKg: userForm.motherweight,
        neckCircumferenceCm:userForm.neckmother,
        muacCm:userForm.muacmother,
        heightCm:userForm.motherheight,
        hemoglobin:userForm.hbmother,
        measurementDate: "2019-04-18"
      
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
  measurementDate:"2019-04-18",
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

  
         











/*


  registerCase(userForm:any,childForm:any,caseForm:any,detailsForm:any,
                userId:string,motherId:string,childId:string):any{
    return this.http.post<any>(this.mainUrl +`/registercase`, { 

      admissionDate : childForm.admissiondate,  
    
      admissionTypeId :detailsForm.admissiontype,
      ipNum :detailsForm.ip,
      uhId  :detailsForm.uhid,
      targetWeight :caseForm.targetweight,
     
      hospitalId :1,
      childId : childId,
      motherId : motherId,
      loginUserId :  userId,
    
      comorbidConditions : [{
                            //  comorbidId:detailsForm.comorbidId,
                            comorbidId:caseForm.childcomorbid.configId,
                            
                            
                          }]
      ,
      admissionCriterias : [{         
                        criteriaId:caseForm.criteria.configId,
                        otherValue:null


      }],
      caseAllocations : [{
        unitId: detailsForm.units,
        wardId: detailsForm.wards,

      }],
      caseMotherDetails : [{
        breastFeedingAtPresent:userForm.breastfeeding,
        drugsPrescribed: userForm.Drugs,
        medicalProblem: userForm.medicalproblem,
        registeredForAnc : userForm.reganc,
        pregnantAtPresent : userForm.pregnant,
        drugsPrescribedDetails : null,
        medicalProblemDetails : null,
        presentDietaryChoice : userForm.Dietary,
        noOfChildren : userForm.noofchildren,
        noOfMealsPerDay : userForm.meals,
        lastMenstruationDate: userForm.menstruation,
        

      }],

      caseMotherGrowths : [{
        //bloodPressureDia:detailsForm.comorbidId,
        //bloodPressureSys: null,
        //bloodSugarFasting:detailsForm.comorbidId,
        //bloodSugarRandom: null,
        //bmi:detailsForm.comorbidId,
        bloodPressureDia : userForm.bloodpressuredp,
        bloodPressureSys : userForm.bloodpressurecp,
        bloodSugarFasting : userForm.bloodglucos,
        bloodSugarRandom: null,
        bmi: userForm.motherbmi,
        gravida: userForm.gravida,
        para: userForm.para,
        weightKg: userForm.motherweight,
        neckCircumferenceCm:userForm.neckmother,
        muacCm:userForm.muacmother,
        heightCm:userForm.motherheight,
        hemoglobin:userForm.hbmother,
        measurementDate: null
      
    }]
,
caseMotherSocialFactors:[{
  socialFactorsId:userForm.social.configId,
 

}],
caseReferrals : [{

  referredBy:detailsForm.referredby,
  referredFromId:detailsForm.referred.configId,


}],
childGrowths : [{
  heightCm:caseForm.admissionheight,
  measurementDate:"null",
   weightKg:caseForm.admissionweight,

}]
  }
  )
  .pipe(map(response => {

    if (response.errorCode == 0) {
     // console.log(response.responseObject);
      return response.responseObject.caseId;
    }else{
      return 0;
    }

      
  }));

  }
*/



 
  


  
 
  
}
