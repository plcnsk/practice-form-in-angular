import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Post } from '../../app/app-store.service';
import { firebaseConfig } from '../../../../firebase.config';

@Injectable()
export class PostsService {
  constructor(private readonly http: HttpClient) {}

  getPosts$(): Observable<Post[]> {
    // return this.http.get<Post[]>(firebaseConfig.apiUrl);
    return of();
  }
}
