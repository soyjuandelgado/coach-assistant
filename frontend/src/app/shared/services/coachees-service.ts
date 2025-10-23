import { inject, Injectable, signal } from '@angular/core';
import { CoacheesApiService } from './coachees-api-service';
import { ICoachee } from '../models/coachee.interface';

@Injectable({
  providedIn: 'root',
})
export class CoacheesService {
  private api = inject(CoacheesApiService);
  private _coachees = signal<ICoachee[]>([]);

  public readonly coachees = this._coachees.asReadonly();

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
}
