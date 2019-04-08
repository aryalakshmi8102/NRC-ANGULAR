import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
@Component({
    selector: 'log-out',
    template: '<div>Logout</div>',
  })
export class LogoutComponent implements OnInit {

    constructor(
     private router: Router,
      private authenticationService: AuthenticationService
    ) { }
  
    ngOnInit() {
        this.authenticationService.logout();
        this.router.navigateByUrl('');

}

}