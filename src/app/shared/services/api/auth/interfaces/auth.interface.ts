import { LoginKey } from '../../../../../pages/login/enums/login.enum';

export interface Credentials {
  [LoginKey.Email]: string;
  [LoginKey.Password]: string;
  returnSecureToken: true;
}

export interface SignInResponse {
  idToken: string;
  [LoginKey.Email]: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export interface SignUpResponse extends SignInResponse {
  registered: boolean;
}
