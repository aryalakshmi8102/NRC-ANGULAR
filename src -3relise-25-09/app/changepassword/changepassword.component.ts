import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { ApiService } from '../_services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  constructor(private http: HttpClient, 
    private router: Router,
    private route: ActivatedRoute,
    private data: ApiService) { }

  ngOnInit() {
  }


  onSubmitPass(changepasswordForm:any){
    console.log("changepasswordForm ="+JSON.stringify(changepasswordForm));
 

    this.data.SendchangepasswordDetails(changepasswordForm)
    .subscribe(
        response => {
          if(response >= 0){
            console.log("Success");
            alert('password changed  Successfully');
           // this.router.navigateByUrl('/');   
           location.reload();        
          } else {
            alert(' Failed');
          }
         
        },
        error => {
            alert(error);
            console.log(error);
        });

      


  
    
  }

}
