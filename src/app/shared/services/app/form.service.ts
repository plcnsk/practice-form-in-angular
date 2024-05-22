import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  trim(controls: FormControl<string>[]): void {
    controls.forEach(control => {
      control.setValue((control.value ?? '').trim());
    });
  }
}
