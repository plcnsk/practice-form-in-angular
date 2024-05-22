import { Injectable } from '@angular/core';
import { CustomStore } from '../../../../../shared/utils/component-store/app-store.util';
import { combineLatest, map } from 'rxjs';

interface CreatePostState {
  title: string;
  author: string;
  content: string;
  date: string;
  isValid: boolean;
  isTouched: boolean;
}

const INITIAL_STATE: CreatePostState = {
  title: '',
  author: '',
  content: '',
  date: '',
  isValid: false,
  isTouched: false,
};

@Injectable()
export class CreatePostStore extends CustomStore<CreatePostState> {
  readonly title$ = this.select(state => state.title);
  readonly author$ = this.select(state => state.author);
  readonly content$ = this.select(state => state.content);
  readonly date$ = this.select(state => state.date);
  readonly isValid$ = this.select(state => state.isValid);
  readonly isTouched$ = this.select(state => state.isTouched);
  readonly state2$ = this.state$;
  readonly createPostVM$ = combineLatest([
    this.title$,
    this.author$,
    this.content$,
    this.date$,
  ]).pipe(
    map(([title, author, content, date]) => ({ title, author, content, date })),
  );

  constructor() {
    super(INITIAL_STATE);
  }

  setTitle(title: string) {
    this.setState(state => {
      return { ...state, title };
    });
  }

  setAuthor(author: string) {
    this.setState(state => {
      return { ...state, author };
    });
  }

  setContent(content: string) {
    this.setState(state => {
      return { ...state, content };
    });
  }

  setDate(date: string) {
    this.setState(state => {
      return { ...state, date };
    });
  }

  setValid(isValid: boolean) {
    this.setState(state => {
      return { ...state, isValid };
    });
  }

  setTouched(isTouched: boolean) {
    this.setState(state => {
      return { ...state, isTouched };
    });
  }
}
