import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Summary } from './summary/summary';
import { Coachees } from './coachees/coachees';
import { AuthGuard } from './shared/auth/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'session',
    redirectTo: 'coachees',
    pathMatch: 'full',
  },
  {
    path: 'session/:id',
    loadComponent: () => import('./session/session').then((m) => m.Session),
    canActivate: [AuthGuard],
  },
  {
    path: 'summary',
    component: Summary,
    canActivate: [AuthGuard],
  },
  {
    path: 'coachees',
    component: Coachees,
    canActivate: [AuthGuard],
  },
  {
    path: 'coachee',
    redirectTo: 'coachees',
    pathMatch: 'full',
  },
  {
    path: 'coachee/:id',
    loadComponent: () => import('./coachee/coachee').then((m) => m.Coachee),
    canActivate: [AuthGuard],
  },
  {
    path: 'process',
    redirectTo: 'coachees',
    pathMatch: 'full',
  },
  {
    path: 'process/:coacheeId/:id',
    loadComponent: () => import('./process/process').then((m) => m.Process),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
