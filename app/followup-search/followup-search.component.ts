import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ApiService } from '../_services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-followup-search',
  templateUrl: './followup-search.component.html',
  styleUrls: ['./followup-search.component.css']
})
export class FollowupSearchComponent implements OnInit {
  childList:{};
  constructor(private http: HttpClient, 
    private router: Router,
    private data: ApiService) { }

  ngOnInit() {
  }
  onSubmitSearch(searchForm:any){
    //console.log("searchForm ="+JSON.stringify(searchForm));

    this.data.searchChild(searchForm)
    .subscribe(
        response => {
          //console.log("response = "+JSON.stringify(response));
          // if(response.length == 0){
          //   alert('No Result found');
          // }
          if (response.errorCode == 0) {
            this.childList = response.responseObject.searchResultList;
          }else{
            alert(response.errorMessage);
          }
        },
        error => {
            alert(error);
            console.log(error);
        });

      


  
    
  }
}
