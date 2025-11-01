import { inject, Injectable } from '@angular/core';
import { IUser } from '../models/user.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { IUserDto } from '../models/user.dto';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorText } from '../services/error-text/error-text';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient);
  private errorText = inject(ErrorText);
  
  toDto(user: IUser): IUserDto {
      const dto: IUserDto = {
        email: user.email,
        password: user.password,
      };
      return dto;
  }

  signIn$(user: IUser): Observable<IUser> {
    const dto = this.toDto(user);
    console.log(user);
    return (this.http.post(environment.authUrl + 'login', dto) as Observable<IUser>).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Auth')));
      })
    );
  }
}
