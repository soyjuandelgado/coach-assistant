import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Summary } from './summary/summary';
import { Coachees } from './coachees/coachees';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: 'session/:id',
    // component: Session,
    loadComponent: () => import('./session/session').then((m) => m.Session),
  },
  {
    path: 'summary',
    component: Summary,
  },
  {
    path: 'coachees',
    component: Coachees,
  },
  {
    path: 'coachee/:id',
    loadComponent: () => import('./coachee/coachee').then((m) => m.Coachee),
  },
  {
    path: 'process/:coacheeId/:id',
    loadComponent: () => import('./process/process').then((m) => m.Process),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
