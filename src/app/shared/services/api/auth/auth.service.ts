import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SIGN_IN_PATH, SIGN_UP_PATH } from './constants/auth.constants';
import { Credentials, SignInResponse, SignUpResponse } from './interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  login$(credentials: Credentials): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(SIGN_IN_PATH, credentials);
  }

  registration$(credentials: Credentials): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(SIGN_UP_PATH, credentials);
  }
}
