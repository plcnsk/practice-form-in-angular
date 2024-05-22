import { Injectable } from '@angular/core';
import { CustomStore } from '../../utils/component-store/app-store.util';

export interface Post {
  id: number;
  title: string;
  author: string;
  date: Date;
  text: string;
}

interface AppStore {
  posts: Post[];
}

const INITIAL_STATE: AppStore = {
  posts: [],
};

@Injectable()
export class AppStoreService extends CustomStore<AppStore> {
  posts$ = this.select(state => state.posts);

  constructor() {
    super(INITIAL_STATE);
  }

  setPosts(posts: Post[]) {
    this.setState(state => ({
      ...state,
      posts,
    }));
  }
}
