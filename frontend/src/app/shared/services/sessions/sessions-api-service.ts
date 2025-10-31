import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ErrorText } from '../error-text/error-text';
import { ISession } from '../../models/session.interface';
import { ISessionDto } from '../../models/session.dto';
import { environment } from '../../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { ISessionGoalDto } from '../../models/session-goal.dto';

@Injectable({
  providedIn: 'root',
})
export class SessionsApiService {
  private http = inject(HttpClient);
  private errorText = inject(ErrorText);

  toDto(session: ISession): ISessionDto {
    const { id: _id, ...dtoWithoutId } = session;
    const dto: ISessionDto = {
      ...dtoWithoutId,
      date: new Date(session.date).toISOString(),
    };

    return dto;
  }

  getSessions$() {
    return this.http.get<ISession[]>(environment.sessionsUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Session')));
      })
    );
  }

  getSession$(sessionId: string) {
    return this.http.get<ISession>(environment.sessionsUrl + sessionId).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Session')));
      })
    );
  }

  createSession$(processId: string, newSession: ISession): Observable<ISession> {
    const dto = this.toDto(newSession);
    return (this.http.post(environment.sessionsUrl + processId, dto) as Observable<ISession>).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Session')));
      })
    );
  }

  updateSession$(sessionId: string, newSession: ISession): Observable<ISession> {
    const dto = this.toDto(newSession);
    return (this.http.put(environment.sessionsUrl + sessionId, dto) as Observable<ISession>).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Session')));
      })
    );
  }

  updateSessionGoal$(sessionId: string, newGoal: string): Observable<ISession> {
    const dto:ISessionGoalDto = { goal: newGoal };
    return (
      this.http.patch(environment.sessionsUrl + sessionId + '/goal', dto) as Observable<ISession>
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Session')));
      })
    );
  }

  deleteSession$(sessionId: string) {
    return this.http.delete(environment.sessionsUrl + sessionId).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Session')));
      })
    );
  }

  removeSession$(sessionId: string) {
    return this.http.patch(environment.sessionsUrl + sessionId + '/remove', '').pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Session')));
      })
    );
  }

  restoreSession$(sessionId: string) {
    return this.http.patch(environment.sessionsUrl + sessionId + '/restore', '').pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Session')));
      })
    );
  }
}
