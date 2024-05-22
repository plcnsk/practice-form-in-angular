import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { CreatePostStore } from './store/create-post.store';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CreatePostStore,
      useClass: CreatePostStore,
    },
  ],
  imports: [ReactiveFormsModule, FormsModule],
})
export class CreatePostComponent implements OnInit {
  readonly form = this.formBuilder.nonNullable.group(
    {
      title: ['', [Validators.required], []],
      author: ['', [Validators.required], []],
      content: ['', [Validators.required], []],
      date: ['', [Validators.required], []],
    },
    { validators: [Validators.required], asyncValidators: [] },
  );

  // readonly searchControl = new FormControl<string>('', { nonNullable: true }); // 1
  readonly searchControl = this.formBuilder.nonNullable.control(''); // 2

  value = ''; // 3

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly componentPostStore: CreatePostStore,
    private readonly destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    // this.initForm();
    this.initForm2();
    this.form.controls.title.disable();
    console.log(this.form.value, this.form.getRawValue());

    if (this.form.enabled) {
      console.log('valid', this.form.value);
    }
    if (this.form.controls.title.valid) {
      console.log('valid', this.form.value);
    }
    if (this.form.controls.title.invalid) {
      console.log('invalid', this.form.value);
    }
    if (this.form.controls.title.disabled) {
      console.log('disabled', this.form.value);
    }

    this.form.statusChanges.subscribe(status => {
      console.log('statusChanges.', status);
    });

    //value - не покажет задиз контролы, а getRawValue() покажет
  }

  onChange(event: any): void {
    console.log('onChange', event);
  }

  private initForm(): void {
    this.componentPostStore.title$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        this.form
          .get('title')
          ?.setValue(value, { emitEvent: false, onlySelf: true });
      });

    this.form.get('title')?.valueChanges.subscribe(value => {
      this.componentPostStore.setTitle(value);
      console.log(value);
    });

    this.componentPostStore.author$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        this.form
          .get('author')
          ?.setValue(value, { emitEvent: false, onlySelf: true });
      });

    this.form.get('author')?.valueChanges.subscribe(value => {
      this.componentPostStore.setAuthor(value);
      console.log(value);
    });

    this.componentPostStore.content$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        this.form
          .get('content')
          ?.setValue(value, { emitEvent: false, onlySelf: false });
      });

    this.form.get('content')?.valueChanges.subscribe(value => {
      this.componentPostStore.setContent(value);
      console.log(value);
    });

    this.componentPostStore.date$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        this.form
          .get('date')
          ?.setValue(value, { emitEvent: false, onlySelf: true });
      });

    this.form.get('date')?.valueChanges.subscribe(value => {
      this.componentPostStore.setDate(value);
      console.log(value);
    });
  }

  private initForm2(): void {
    this.componentPostStore.state2$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ title, content, author, date }) => {
        console.log({ title, content, author, date });
        this.form.patchValue(
          { title, content, author, date },
          { emitEvent: false, onlySelf: true },
        );
      });

    this.form.get('title')?.valueChanges.subscribe(value => {
      this.componentPostStore.setTitle(value);
    });

    this.form.get('author')?.valueChanges.subscribe(value => {
      this.componentPostStore.setAuthor(value);
    });

    this.form.get('content')?.valueChanges.subscribe(value => {
      this.componentPostStore.setContent(value);
    });

    this.form.get('date')?.valueChanges.subscribe(value => {
      this.componentPostStore.setDate(value);
    });
  }
}

// patchValue в отличии от setValue обнавляет и частично и все контролы, а setValue обновляет всегда все котролы
