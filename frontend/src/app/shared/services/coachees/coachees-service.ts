import { inject, Injectable, signal } from '@angular/core';
import { CoacheesApiService } from './coachees-api-service';
import { ICoachee } from '../../models/coachee.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoacheesService {
  private api = inject(CoacheesApiService);
  private _coachees = signal<ICoachee[]>([]);
  private _coachee = signal<ICoachee | undefined>(undefined);

  public readonly coachees = this._coachees.asReadonly();
  public readonly coachee = this._coachee.asReadonly();

  private _error = signal<string | null>(null);
  public readonly error = this._error.asReadonly();

  private _loading = signal<boolean>(false);
  public readonly loading = this._loading.asReadonly();

  constructor() {
    // this.getCoachees();
  }

  getCoachees(): void {
    this._loading.set(true);
    this._error.set(null);

    this.api.getCoachees$().subscribe({
      next: (response) => {
        this._coachees.set(response);
        this._loading.set(false);
      },
      error: (err) => {
        console.log('Error getting coachees.', err);
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  getCoachee(coacheeId: string): void {
    this._loading.set(true);
    this._error.set(null);

    this.api.getCoachee$(coacheeId).subscribe({
      next: (response) => {
        this._coachee.set(response);
        this._loading.set(false);
      },
      error: (err) => {
        console.log('Error getting coachee.', err);
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  createCoachee(userId: string, coachee: ICoachee): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .createCoachee$(userId, coachee)
      .pipe(
        tap({
          next: (response) => {
            const coacheeResponse = response as ICoachee;
            this._coachees.update((currentCoachees) => [...currentCoachees, coacheeResponse]);
            this._loading.set(false);
          },
          error: (err) => {
            console.error('Coachee creating error', err);
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }

  updateCoachee(coacheeId: string, coachee: ICoachee): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .updateCoachee$(coacheeId, coachee)
      .pipe(
        tap({
          next: (response) => {
            const coacheeResponse = response as ICoachee;
            this._coachees.update((currentCoachees) =>
              currentCoachees.map((c) => (c.id === coacheeId ? coacheeResponse : c))
            );
            this._loading.set(false);
          },
          error: (err) => {
            console.error('Coachee updating error', err);
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }
  deleteCoachee(coacheeId: string): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .deleteCoachee$(coacheeId)
      .pipe(
        tap({
          next: () => {
            // Usa el método 'update' para filtrar y eliminar la reunión
            this._coachees.update((currentCoachees) =>
              currentCoachees.filter((c) => c.id !== coacheeId)
            );
            this._loading.set(false);
          },
          error: (err) => {
            console.error('Coachee deleting error', err);
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }

  removeCoachee(coacheeId: string): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .removeCoachee$(coacheeId)
      .pipe(
        tap({
          next: () => {
            // Usa el método 'update' para filtrar y eliminar la reunión
            this._coachees.update((currentCoachees) =>
              currentCoachees.filter((c) => c.id !== coacheeId)
            );
            this._loading.set(false);
          },
          error: (err) => {
            console.error('Coachee removing error', err);
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }

  restoreCoachee(coacheeId: string): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .restoreCoachee$(coacheeId)
      .pipe(
        tap({
          next: (response) => {
            console.log(response);
            // const coacheeResponse = response as ICoachee;
            // this._coachees.update((currentCoachees) => [...currentCoachees, coacheeResponse]);
            this._loading.set(false);
          },
          error: (err) => {
            console.error('Coachee restoring error', err);
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }

  clearError(): void {
    this._error.set(null);
  }
  clearCoachee(): void {
    this._coachee.set(undefined);
  }
}
