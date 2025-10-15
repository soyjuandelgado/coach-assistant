import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Sesion } from './sesion/sesion';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: 'sesion',
    component: Sesion,
  },  {
    path: '**',
    redirectTo: '',
  },
];
