import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Session } from './session/session';
import { Summary } from './summary/summary';
import { Coachees } from './coachees/coachees';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: 'session',
    component: Session,
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
    path: '**',
    redirectTo: '',
  },
];
