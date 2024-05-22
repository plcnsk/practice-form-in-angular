import { RegistrationKey } from '../enums/registration.enum';
import { FormControl } from '@angular/forms';

export interface RegistrationFormGroup {
  [RegistrationKey.Email]: FormControl<string>;
  [RegistrationKey.Password]: FormControl<string>;
}
