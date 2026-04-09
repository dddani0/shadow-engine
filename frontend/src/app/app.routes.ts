import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home-page/home-page').then((m) => m.HomePage),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about-page/about-page').then((m) => m.AboutPage),
  },
  {
    path: 'projects/:projectId',
    loadComponent: () => import('./pages/project-page/project-page').then((m) => m.ProjectPage),
  },
  {
    path: 'play/:projectId',
    loadComponent: () => import('./pages/play-page/play-page').then((m) => m.PlayPage),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/project-collection-page/project-collection-page').then(
        (m) => m.ProjectCollectionPage,
      ),
  },
];
