import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  login(): Observable<any> {
    this.http.post<any>();
  }
}
