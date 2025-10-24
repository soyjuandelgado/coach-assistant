import { inject, Injectable, signal } from '@angular/core';
import { ProcessesApiService } from './processes-api-service';
import { IProcess } from '../models/process.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProcessesService {
  private api = inject(ProcessesApiService);
  private _processes = signal<IProcess[]>([]);
  private _process = signal<IProcess | undefined>(undefined);

  public readonly processes = this._processes.asReadonly();
  public readonly process = this._process.asReadonly();

  constructor(){
    this.getProcesses();
  }

  getProcesses(): void {
    this.api.getProcesses$().subscribe({
      next: (response) => {
        this._processes.set(response);
      },
      error: (err) => {
        console.log('Error getting processes.', err);
      },
    });
  }

  getProcess(processId: string): void {
    this.api.getProcess$(processId).subscribe({
      next: (response) => {
        this._process.set(response);
      },
      error: (err) => {
        console.log('Error getting process.', err);
      },
    });
  }

  createProcess(userId: string, process: IProcess): void {
    this.api
      .createProcess$(userId, process)
      .pipe(
        tap({
          next: (response) => {
            const processResponse = response as IProcess;
            this._processes.update((currentProcesses) => [...currentProcesses, processResponse]);
          },
          error: (err) => {
            console.error('Process creating error', err);
          },
        })
      )
      .subscribe();
  }

  updateProcess(processId: string, process: IProcess): void {
    this.api
      .updateProcess$(processId, process)
      .pipe(
        tap({
          next: (response) => {
            const processResponse = response as IProcess;
            this._processes.update((currentProcesses) =>
              currentProcesses.map((c) => (c.id === processId ? processResponse : c))
            );
          },
          error: (err) => {
            console.error('Process updating error', err);
          },
        })
      )
      .subscribe();
  }
  deleteProcess(processId: string): void {
    this.api
      .deleteProcess$(processId)
      .pipe(
        tap({
          next: () => {
            this._processes.update((currentProcesses) =>
              currentProcesses.filter((c) => c.id !== processId)
            );
          },
          error: (err) => {
            console.error('Process deleting error', err);
          },
        })
      )
      .subscribe();
  }

  removeProcess(processId: string): void {
    this.api
      .removeProcess$(processId)
      .pipe(
        tap({
          next: () => {
            this._processes.update((currentProcesses) =>
              currentProcesses.filter((c) => c.id !== processId)
            );
          },
          error: (err) => {
            console.error('Process removing error', err);
          },
        })
      )
      .subscribe();
  }

  restoreProcess(processId: string): void {
    this.api
      .restoreProcess$(processId)
      .pipe(
        tap({
          next: (response) => {
            console.log(response);
          },
          error: (err) => {
            console.error('Process restoring error', err);
          },
        })
      )
      .subscribe();
  }
}
