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

  
         






 
  


  
  //callAPI(){

    //return{
     // getallwards:this.http.get(this.mainUrl+' /getallwards/{HOSPITAL _ID}').pipe(map((res: Response) => res)),

  
      

    //}



  //}
 // getallwards() {
   // return this.http.get('http://sneha.cstep.in:8080/nrcappdev/getallwards/{HOSPITAL _ID}')
 // }
  
}
