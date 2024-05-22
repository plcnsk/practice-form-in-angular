import { firebaseConfig } from '../../../../../firebase.config';

export const SIGN_IN_PATH = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`;

export const SIGN_UP_PATH = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`;
