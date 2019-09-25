import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ApiService } from '../_services/api.service';
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
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
