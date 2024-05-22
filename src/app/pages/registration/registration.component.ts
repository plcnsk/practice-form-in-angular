import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegistrationKey } from './enums/registration.enum';
import { RegistrationFormGroup } from './interfaces/registration.interface';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { AuthUserService } from '../../shared/services/app/auth-user.service';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, catchError, finalize, throwError } from 'rxjs';
import { FormService } from '../../shared/services/app/form.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, NgClass, RouterLink, NgIf, AsyncPipe],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  form!: FormGroup<RegistrationFormGroup>;
  readonly registrationKey = RegistrationKey;

  readonly errorMessage$ = new BehaviorSubject<string>('');

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authUserService: AuthUserService,
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
    private readonly cdRef: ChangeDetectorRef,
    private readonly formService: FormService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.errorMessage$.complete();
  }

  onSubmit(): void {
    if (this.form.disabled) {
      return;
    }

    this.formService.trim([
      this.form.controls[RegistrationKey.Email],
      this.form.controls[RegistrationKey.Password],
    ]);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.form.disable();

    this.authUserService
      .registration$(this.form.getRawValue())
      .pipe(
        catchError(error => {
          this.errorMessage$.next(error.error.error.message);
          return throwError(() => error);
        }),
        finalize(() => {
          this.form.enable();
          this.cdRef.markForCheck();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.router.navigate(['main']);
      });
  }

  private initForm(): void {
    this.form = this.formBuilder.nonNullable.group({
      [RegistrationKey.Email]: ['', [Validators.required, Validators.email]],
      [RegistrationKey.Password]: [
        '',
        [Validators.required, Validators.minLength(12)],
      ],
    });
  }
}
