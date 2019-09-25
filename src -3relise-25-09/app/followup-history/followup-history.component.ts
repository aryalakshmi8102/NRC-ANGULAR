import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ApiService } from '../_services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-followup-history',
  templateUrl: './followup-history.component.html',
  styleUrls: ['./followup-history.component.css']
})
export class FollowupHistoryComponent implements OnInit {
  private sub: any;
  caseId:any;
  followuphistorys:Object;
  constructor(
    private http: HttpClient, 
    private router: Router,
    private data: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.caseId = +params['id']; 
     console.log("this.caseId = "+ this.caseId);
   });


   this.data.getfollowupHistory(this.caseId).subscribe(response => {
    this.followuphistorys = response.responseObject.followupList
  }
  );
  }



  onclickdeleteFollowupHistory(id:any){

    if(confirm("Do you wish to delete ")) {

      this.data.DeleteFollowupHistory(id)
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
