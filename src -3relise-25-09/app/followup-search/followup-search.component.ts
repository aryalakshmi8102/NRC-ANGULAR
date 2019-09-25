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
  childList: {};
  constructor(private http: HttpClient,
    private router: Router,
    private data: ApiService) {
  }
  ngOnInit() {
  }
  onSubmitSearch(searchForm: any) {
    this.data.searchChild(searchForm)
      .subscribe(
        response => {
          if (response.errorCode == 0) {
            this.childList = response.responseObject.searchResultList;
            localStorage.setItem('childData1',JSON.stringify(this.childList))
          } else {
            alert(response.errorMessage);
          }
        },
        error => {
          alert(error);
          console.log(error);
        });
  }
 }