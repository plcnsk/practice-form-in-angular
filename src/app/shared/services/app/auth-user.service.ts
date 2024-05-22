import { Injectable } from '@angular/core';
import { AuthService } from '../api/auth/auth.service';
import {
  SignInResponse,
  SignUpResponse,
} from '../api/auth/interfaces/auth.interface';
import { Observable, tap } from 'rxjs';
import {
  AUTH_TOKEN_EXPIRES_DATE_KEY,
  AUTH_TOKEN_KEY,
} from './constants/auth-user.constant';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  get isAuthenticated(): boolean {
    return !!this.token;
  }

  private get token(): string | null {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const expiresData = localStorage.getItem(AUTH_TOKEN_EXPIRES_DATE_KEY);

    if (!token || !expiresData) {
      this.removeToken();
      return null;
    }

    const currentDate = new Date().getTime();

    if (currentDate > Number(expiresData)) {
      this.removeToken();
      return null;
    }

    return token;
  }

  login$(credentials: {
    email: string;
    password: string;
  }): Observable<SignInResponse> {
    return this.authService
      .login$({ ...credentials, returnSecureToken: true })
      .pipe(
        tap(({ idToken, expiresIn }) => this.setToken({ idToken, expiresIn })),
      );
  }

  registration$(credentials: {
    email: string;
    password: string;
  }): Observable<SignUpResponse> {
    return this.authService.registration$({
      ...credentials,
      returnSecureToken: true,
    });
  }

  logOut(): void {
    this.removeToken();
    this.router.navigate(['login']);
  }

  private setToken({
    idToken,
    expiresIn,
  }: {
    idToken: string;
    expiresIn: string;
  }): void {
    localStorage.setItem(AUTH_TOKEN_KEY, idToken);
    localStorage.setItem(
      AUTH_TOKEN_EXPIRES_DATE_KEY,
      String(Number(expiresIn) * 1000 + new Date().getTime()),
    );
  }

  private removeToken(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_TOKEN_EXPIRES_DATE_KEY);
  }
}
