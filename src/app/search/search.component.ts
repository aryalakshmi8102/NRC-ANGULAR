import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ApiService } from '../_services/api.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  childList:{};

  constructor(private http: HttpClient, 
    private router: Router,
    private data: ApiService,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmitSearch(searchForm:any){
    console.log(searchForm);

    this.data.searchChild(searchForm,)
    .subscribe(
        response => {
          this.childList = response;
          console.log(response);
          if(response.length == 0){
            alert('No Result found');

          }
         
           
            
          


        },
        error => {
            alert(error);
            console.log(error);
        });

      


  
    
  }

}
