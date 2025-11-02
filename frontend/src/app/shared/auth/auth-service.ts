import { inject, Injectable, signal } from '@angular/core';
import { IUser } from '../models/user.interface';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { IUserDto } from '../models/user.dto';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorText } from '../services/error-text/error-text';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private errorText = inject(ErrorText);

  private currentUserSource = signal<IUser | null>(null);
  currentUser = this.currentUserSource.asReadonly();

  constructor() {
    this.loadUserFromStorage();
  }

  toDto(user: IUser): IUserDto {
    const dto: IUserDto = {
      email: user.email,
      password: user.password,
    };
    return dto;
  }

  signIn$(user: IUser): Observable<any> {
    const dto = this.toDto(user);
    return (this.http.post(environment.authUrl + 'login', dto) as Observable<any>).pipe(
      tap((res) => {
        this.handleLogin(res.access_token);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Auth')));
      })
    );
  }

  public async handleLogin(token: string) {
    try {
      localStorage.setItem('access_token', token);
      const decodedToken: any = await jwtDecode(token);
      const user: IUser = { id: decodedToken.sub, ...decodedToken };

      this.currentUserSource.set(user);
    } catch (error) {
      console.error('Error al decodificar el token', error);
      this.handleLogout();
    }
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.handleLogin(token);
    }
  }

  public handleLogout(): void {
    localStorage.removeItem('access_token');
    this.currentUserSource.set(null);
  }
}
