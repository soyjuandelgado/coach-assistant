import { inject, Injectable, signal } from '@angular/core';
import { ProcessesApiService } from './processes-api-service';
import { IProcess } from '../../models/process.interface';
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

  private _error = signal<string | null>(null);
  public readonly error = this._error.asReadonly();

  private _loading = signal<boolean>(false);
  public readonly loading = this._loading.asReadonly();

  getProcesses(): void {
    this._loading.set(true);
    this._error.set(null);
    this.api.getProcesses$().subscribe({
      next: (response) => {
        this._processes.set(response);
        this._loading.set(false);
      },
      error: (err) => {
        console.log('Error getting processes.', err);
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  getProcess(processId: string): void {
    this._loading.set(true);
    this._error.set(null);
    if (processId.length == 0) {
      this._process.set(undefined);
      return;
    }
    this.api.getProcess$(processId).subscribe({
      next: (response) => {
        this._process.set(response);
        this._loading.set(false);
      },
      error: (err) => {
        console.log('Error getting process.', err);
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  createProcess(userId: string, process: IProcess): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .createProcess$(userId, process)
      .pipe(
        tap({
          next: (response) => {
            const processResponse = response as IProcess;
            this._processes.update((currentProcesses) => [...currentProcesses, processResponse]);
            this._loading.set(false);
          },
          error: (err) => {
            console.error('Process creating error', err);
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }

  updateProcess(processId: string, process: IProcess): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .updateProcess$(processId, process)
      .pipe(
        tap({
          next: (response) => {
            const processResponse = response as IProcess;
            this._processes.update((currentProcesses) =>
              currentProcesses.map((c) => (c.id === processId ? processResponse : c))
            );
            this._loading.set(false);
          },
          error: (err) => {
            console.error('Process updating error', err);
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }
  deleteProcess(processId: string): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .deleteProcess$(processId)
      .pipe(
        tap({
          next: () => {
            this._processes.update((currentProcesses) =>
              currentProcesses.filter((c) => c.id !== processId)
            );
            this._loading.set(false);
          },
          error: (err) => {
            console.error('Process deleting error', err);
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }

  removeProcess(processId: string): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .removeProcess$(processId)
      .pipe(
        tap({
          next: () => {
            this._processes.update((currentProcesses) =>
              currentProcesses.filter((c) => c.id !== processId)
            );
            this._loading.set(false);
          },
          error: (err) => {
            console.error('Process removing error', err);
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }

  restoreProcess(processId: string): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .restoreProcess$(processId)
      .pipe(
        tap({
          next: (response) => {
            console.log(response);
            this._loading.set(false);
          },
          error: (err) => {
            console.error('Process restoring error', err);
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }

  clearProcess(): void {
    this._process.set(undefined);
  }
}
