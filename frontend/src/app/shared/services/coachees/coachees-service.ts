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

  constructor() {
    this.getCoachees();
  }

  getCoachees(): void {
    this.api.getCoachees$().subscribe({
      next: (response) => {
        this._coachees.set(response);
      },
      error: (err) => {
        console.log('Error getting coachees.', err);
      },
    });
  }

  getCoachee(coacheeId: string): void {
    this.api.getCoachee$(coacheeId).subscribe({
      next: (response) => {
        this._coachee.set(response);
      },
      error: (err) => {
        console.log('Error getting coachee.', err);
      },
    });
  }

  createCoachee(userId: string, coachee: ICoachee): void {
    this.api
      .createCoachee$(userId, coachee)
      .pipe(
        tap({
          next: (response) => {
            const coacheeResponse = response as ICoachee;
            this._coachees.update((currentCoachees) => [...currentCoachees, coacheeResponse]);
          },
          error: (err) => {
            console.error('Coachee creating error', err);
          },
        })
      )
      .subscribe();
  }

  updateCoachee(coacheeId: string, coachee: ICoachee): void {
    this.api
      .updateCoachee$(coacheeId, coachee)
      .pipe(
        tap({
          next: (response) => {
            const coacheeResponse = response as ICoachee;
            this._coachees.update((currentCoachees) =>
              currentCoachees.map((c) => (c.id === coacheeId ? coacheeResponse : c))
            );
          },
          error: (err) => {
            console.error('Coachee updating error', err);
          },
        })
      )
      .subscribe();
  }
  deleteCoachee(coacheeId: string): void {
    this.api
      .deleteCoachee$(coacheeId)
      .pipe(
        tap({
          next: () => {
            // Usa el método 'update' para filtrar y eliminar la reunión
            this._coachees.update((currentCoachees) =>
              currentCoachees.filter((c) => c.id !== coacheeId)
            );
          },
          error: (err) => {
            console.error('Coachee deleting error', err);
          },
        })
      )
      .subscribe();
  }

  removeCoachee(coacheeId: string): void {
    this.api
      .removeCoachee$(coacheeId)
      .pipe(
        tap({
          next: () => {
            // Usa el método 'update' para filtrar y eliminar la reunión
            this._coachees.update((currentCoachees) =>
              currentCoachees.filter((c) => c.id !== coacheeId)
            );
          },
          error: (err) => {
            console.error('Coachee removing error', err);
          },
        })
      )
      .subscribe();
  }

  restoreCoachee(coacheeId: string): void {
    this.api
      .restoreCoachee$(coacheeId)
      .pipe(
        tap({
          next: (response) => {
            console.log(response);
            // const coacheeResponse = response as ICoachee;
            // this._coachees.update((currentCoachees) => [...currentCoachees, coacheeResponse]);
          },
          error: (err) => {
            console.error('Coachee restoring error', err);
          },
        })
      )
      .subscribe();
  }
}
