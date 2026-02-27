import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/books/pages/home-page/home-page.component')
        .then(m => m.HomePageComponent)
  },
  {
    path: '404',
    loadComponent: () =>
      import('./features/not-found/not-found.component')
        .then(m => m.NotFoundComponent)
  },
  { path: '**', redirectTo: '404' }
];
