import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppStoreService, Post } from './shared/services/app/app-store.service';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { AuthUserService } from './shared/services/app/auth-user.service';
import { PostsService } from './shared/services/api/posts/posts.service';

function initializeAppFactory(
  authUserService: AuthUserService,
  postsService: PostsService,
  appStoreService: AppStoreService,
): () => Observable<Post[] | never> {
  return () => {
    if (authUserService.isAuthenticated) {
      return postsService.getPosts$().pipe(
        tap(posts => {
          appStoreService.setPosts(posts);
        }),
      );
    }

    return EMPTY;
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withFetch()),
    {
      provide: AppStoreService,
      useClass: AppStoreService,
    },
    {
      provide: PostsService,
      useClass: PostsService,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      multi: true,
      deps: [AuthUserService, PostsService, AppStoreService],
    },
  ],
};
