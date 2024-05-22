import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { canActivateAuth } from './guards/login.guard';
import { canActivateMain } from './guards/main.guard';
import { PostsComponent } from './pages/main/components/posts/posts.component';
import { CreatePostComponent } from './pages/main/components/create-post/create-post.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [canActivateMain],
    children: [
      {
        path: '',
        redirectTo: 'create-post',
        pathMatch: 'full',
      },
      {
        path: 'create-post',
        component: CreatePostComponent,
      },
      {
        path: 'posts',
        component: PostsComponent,
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(c => c.LoginComponent),
    canActivate: [canActivateAuth],
  },
  {
    path: 'registration',
    loadComponent: () =>
      import('./pages/registration/registration.component').then(
        c => c.RegistrationComponent,
      ),
    canActivate: [canActivateAuth],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        c => c.NotFoundComponent,
      ),
  },
];
