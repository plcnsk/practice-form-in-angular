import { LoginKey } from '../enums/login.enum';
import { FormControl } from '@angular/forms';

export interface LoginFormGroup {
  [LoginKey.Email]: FormControl<string>;
  [LoginKey.Password]: FormControl<string>;
}
