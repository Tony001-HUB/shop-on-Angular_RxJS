import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Environment} from '@angular/compiler-cli/src/ngtsc/typecheck/src/environment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  login( User ): any {
    return this.http
      .post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, User);
  }
}
