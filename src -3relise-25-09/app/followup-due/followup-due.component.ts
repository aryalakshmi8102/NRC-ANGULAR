import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ApiService } from '../_services/api.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-followup-due',
  templateUrl: './followup-due.component.html',
  styleUrls: ['./followup-due.component.css']
})
export class FollowupDueComponent implements OnInit {
  followupdues:Object;
  key: string = 'name';
 reverse: boolean = true;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private data: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.data.getfollowupDue().subscribe(response => {
      this.followupdues = response.responseObject.followupDueList
    }
    );
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
    // return 1;
  }

}
