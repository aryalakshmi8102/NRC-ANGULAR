import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ApiService } from '../_services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dailycare',
  templateUrl: './dailycare.component.html',
  styleUrls: ['./dailycare.component.css']
})
export class DailycareComponent implements OnInit {
  UserSession :string;
  currentUser:any;
  dailyForm:any;
  private sub: any;
  caseId:any;
  growthlists:any;
  growthlists2:any;
  //todaydate = new Date();
  public dateValue: Date = new Date ();
  growthList:{}


  constructor(private http: HttpClient, 
    private router: Router,
    private route: ActivatedRoute,
    private data: ApiService) { }

  ngOnInit() {
    this.UserSession = JSON.parse(localStorage.getItem('UserSession'));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.sub = this.route.params.subscribe(params => {
      this.caseId = +params['id']; 
     // console.log(this.ipId);
   });
  



this.data.getDailygrowthList(this.caseId)
.subscribe(
    response => {
     
      if(response!=0){
        this.growthlists = response;
        console.log(this.growthlists.childName);
      //  console.log("growthlists = "+this.growthlists);
        console.log("growthLists= "+JSON.stringify(response));
        this.growthlists2 = response.growthList;
        console.log("growthLists2= "+JSON.stringify(this.growthlists2));
       }
      
      else{
        alert("no data found");
      }
    },
    error => {
        alert(error);
        console.log(error);
    });

    
  }

  onSubmitdailyForm(dailyForm:any){
    console.log("dailyForm ="+JSON.stringify(dailyForm));
    console.log(dailyForm.dailyweight)
    //if(dailyForm.valid){

    this.data.SenddailycareDetails(dailyForm,this.caseId,this.currentUser.nrcUId)
    .subscribe(
        response => {
          if(response >= 0){
            console.log("Success");
            alert(' Daily Record  Saved Successfully');
           // this.router.navigateByUrl('/');   
           location.reload();        
          } else {
            alert("Please enter a valid measurement date,weight,height");
          }
         
        },
        error => {
            alert(error);
            console.log(error);
        });

      


    //  }
    //  else{
      //  alert("Please enter a valid measurement date,weight,height")
     // }
  }


  onclickdeleteChild(id:any){

    if(confirm("Do you wish to delete ")) {

      this.data.DeleteDailyRecord(id)
    .subscribe(
        response => {
          if(response >= 0){
            console.log("Success");
            alert('Deletion successful');
           // this.router.navigateByUrl('/');   
           location.reload();        
          } else {
            alert("Deletion failed");
          }
         
        },
        error => {
            alert(error);
            console.log(error);
        });


      

    }
  }

  

}
