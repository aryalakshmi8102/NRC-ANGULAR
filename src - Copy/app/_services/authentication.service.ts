import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import { ReplaySubject } from 'rxjs';



@Injectable()
export class AuthenticationService {
    private _loggedIn: ReplaySubject<boolean> = new ReplaySubject<boolean>();

    constructor(private http: HttpClient) {
        
     }

    login(username: string, password: string) {
         //return this.http.post<any>( mainUrl+'/login', { 
        return this.http.post<any>(`http://sneha.cstep.in:8080/nrcappdev/login`, { 
            userId: username, password: password 
        }
        )
            .pipe(map(user => {
                //console.log(user.errorCode);
               
                // login successful if there's a jwt token in the response
                //TEST START
                //TEST START
                //var response:string[] = [];
               
               // localStorage.setItem('currentUser', JSON.stringify(response));
               // localStorage.setItem('UserSession', JSON.stringify('0E7A0AA4037707FD9DACA104C64A08C8'));
               // return "0";
                //TEST END
                if (user.errorCode == 0) {
                    console.log(user);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.responseObject));
                    localStorage.setItem('UserSession', JSON.stringify(user.sessionId));
                    this._loggedIn.next( true );

                }

                return user.errorCode;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('UserSession');
        this._loggedIn.next( false );

        
    }
    public getUserLoggedInObs(): Observable<boolean> {
        if(localStorage.getItem('UserSession') != null){
            this._loggedIn.next( true );
        }
        return this._loggedIn.asObservable();
        
       
        
      }
    
    
    
}