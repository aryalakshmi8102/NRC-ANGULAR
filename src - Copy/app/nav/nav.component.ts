import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  currentUser:Observable<boolean>;
  

  constructor(
    private authenticationService: AuthenticationService

  ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.getUserLoggedInObs();
  }

}
