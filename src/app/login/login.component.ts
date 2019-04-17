import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  authError = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  // reset login status
  this.authenticationService.logout();

  // get return url from route parameters or default to '/'
  //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';


  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    //console.log(this.f);
    this.loading = true;

    //TEST START
    //var response:string[] = [];
               
    //localStorage.setItem('currentUser', JSON.stringify(response));
    //localStorage.setItem('UserSession', JSON.stringify('0E7A0AA4037707FD9DACA104C64A08C8'));
    //this.loading = false;
    //this.router.navigateByUrl('/about');
    //return true;
    //TEST END

    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            user => {
              this.loading = false;
              if(user == 0){
                this.router.navigateByUrl('/about');
              }else{
                this.authError = true;
              }
                
            },
            error => {
                alert(error);
                this.authError = true;
                console.log(error);
                this.loading = false;
            });
}



  /*
  email = 'suresh';
  password = 'cstep123';
  



  constructor(private api: ApiService, private customer: CustomerService, private router: Router) { 
    alert('In construct');
  }
  tryLogin() {
    this.api.login(
      this.email,
      this.password
    )
      .subscribe(
        r => {
          if (r.token) {
            this.customer.setToken(r.token);
            this.router.navigateByUrl('/admission');
          }
        },
        r => {
          alert(r.error.error);
        });
  }
  ngOnInit() {
    console.log('Here');
    alert('Here');
  } 
*/
}
