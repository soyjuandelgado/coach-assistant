import { inject, Injectable, signal } from '@angular/core';
import { SessionsApiService } from './sessions-api-service';
import { ISession } from '../../models/session.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  private api = inject(SessionsApiService);
  private _sessions = signal<ISession[]>([]);
  private _session = signal<ISession | undefined>(undefined);

  public readonly sessions = this._sessions.asReadonly();
  public readonly session = this._session.asReadonly();

  private _error = signal<string | null>(null);
  public readonly error = this._error.asReadonly();

  private _loading = signal<boolean>(false);
  public readonly loading = this._loading.asReadonly();

  getSessions(): void {
    this._loading.set(true);
    this._error.set(null);
    this.api.getSessions$().subscribe({
      next: (response) => {
        this._sessions.set(response);
        this._loading.set(false);
      },
      error: (err) => {
        console.log('Error getting sessions.', err);
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  getSession(sessionId: string): void {
    if (this._session()?.id === sessionId) {
      return;
    }
    this._loading.set(true);
    this._error.set(null);
    if (sessionId.length == 0) {
      this._session.set(undefined);
      return;
    }
    this.api.getSession$(sessionId).subscribe({
      next: (response) => {
        this._session.set(response);
        this._loading.set(false);
      },
      error: (err) => {
        console.log('Error getting session.', err);
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  createSession(processId: string, session: ISession): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .createSession$(processId, session)
      .pipe(
        tap({
          next: (response) => {
            const sessionResponse = response as ISession;
            this._sessions.update((currentSessions) => [...currentSessions, sessionResponse]);
            this._loading.set(false);
          },
          error: (err) => {
            console.error('Session creating error', err);
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }

  updateSession(sessionId: string, session: ISession): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .updateSession$(sessionId, session)
      .pipe(
        tap({
          next: (response) => {
            const sessionResponse = response as ISession;
            this._sessions.update((currentSessions) =>
              currentSessions.map((c) => (c.id === sessionId ? sessionResponse : c))
            );
            this._loading.set(false);
          },
          error: (err) => {
            console.error('Session updating error', err);
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }
  deleteSession(sessionId: string): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .deleteSession$(sessionId)
      .pipe(
        tap({
          next: () => {
            this._sessions.update((currentSessions) =>
              currentSessions.filter((c) => c.id !== sessionId)
            );
            this._loading.set(false);
          },
          error: (err) => {
            console.error('Session deleting error', err);
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }

  removeSession(sessionId: string): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .removeSession$(sessionId)
      .pipe(
        tap({
          next: () => {
            this._sessions.update((currentSessions) =>
              currentSessions.filter((c) => c.id !== sessionId)
            );
            this._loading.set(false);
          },
          error: (err) => {
            console.error('Session removing error', err);
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }

  restoreSession(sessionId: string): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .restoreSession$(sessionId)
      .pipe(
        tap({
          next: (response) => {
            console.log(response);
            this._loading.set(false);
          },
          error: (err) => {
            console.error('Session restoring error', err);
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }

  clearSession(): void {
    this._session.set(undefined);
  }

}
