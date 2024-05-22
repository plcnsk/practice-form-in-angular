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
import { LoginKey } from './enums/login.enum';
import { LoginFormGroup } from './interfaces/login.interface';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthUserService } from '../../shared/services/app/auth-user.service';
import { BehaviorSubject, catchError, finalize, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { FormService } from '../../shared/services/app/form.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, NgClass, RouterLink, AsyncPipe, NgIf],
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup<LoginFormGroup>;
  readonly loginKey = LoginKey;

  readonly errorMessage$ = new BehaviorSubject<string>('');

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authUserService: AuthUserService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef,
    private readonly router: Router,
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
      this.form.controls[LoginKey.Email],
      this.form.controls[LoginKey.Password],
    ]);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.form.disable();

    this.authUserService
      .login$(this.form.getRawValue())
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          this.errorMessage$.next(errorResponse.error.error.message);

          return throwError(() => errorResponse);
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
      [LoginKey.Email]: ['', [Validators.required, Validators.email]],
      [LoginKey.Password]: [
        '',
        [Validators.required, Validators.minLength(12)],
      ],
    });
  }
}
