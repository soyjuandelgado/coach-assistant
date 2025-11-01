import { inject, Injectable, signal } from '@angular/core';
import { TasksApiService } from './tasks-api-service';
import { ITask } from '../../models/task.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private api = inject(TasksApiService);
  private _tasks = signal<ITask[]>([]);
  private _task = signal<ITask | undefined>(undefined);

  public readonly tasks = this._tasks.asReadonly();
  public readonly task = this._task.asReadonly();

  private _error = signal<string | null>(null);
  public readonly error = this._error.asReadonly();

  private _loading = signal<boolean>(false);
  public readonly loading = this._loading.asReadonly();

  getTasks(): void {
    this._loading.set(true);
    this._error.set(null);
    this.api.getTasks$().subscribe({
      next: (response) => {
        this._tasks.set(response);
        this._loading.set(false);
      },
      error: (err) => {
        console.log('Error getting tasks.', err);
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  getTask(taskId: string): void {
    if (this._task()?.id === taskId) {
      return;
    }
    this._loading.set(true);
    this._error.set(null);
    if (taskId.length == 0) {
      this._task.set(undefined);
      return;
    }
    this.api.getTask$(taskId).subscribe({
      next: (response) => {
        this._task.set(response);
        this._loading.set(false);
      },
      error: (err) => {
        console.log('Error getting task.', err);
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  createTask(sessionId: string, task: ITask): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .createTask$(sessionId, task)
      .pipe(
        tap({
          next: (response) => {
            const taskResponse = response as ITask;
            this._tasks.update((currentTasks) => [...currentTasks, taskResponse]);
            this._loading.set(false);
          },
          error: (err) => {
            console.error('Task creating error', err);
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }
  
  createTask$(sessionId: string, task: ITask): Observable<ITask> {
    return this.api.createTask$(sessionId, task);
  }

  updateTask(taskId: string, task: ITask): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .updateTask$(taskId, task)
      .pipe(
        tap({
          next: (response) => {
            const taskResponse = response as ITask;
            this._tasks.update((currentTasks) =>
              currentTasks.map((c) => (c.id === taskId ? taskResponse : c))
            );
            this._loading.set(false);
          },
          error: (err) => {
            console.error('Task updating error', err);
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }
  deleteTask(taskId: string): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .deleteTask$(taskId)
      .pipe(
        tap({
          next: () => {
            this._tasks.update((currentTasks) =>
              currentTasks.filter((c) => c.id !== taskId)
            );
            this._loading.set(false);
          },
          error: (err) => {
            console.error('Task deleting error', err);
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }

  removeTask(taskId: string): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .removeTask$(taskId)
      .pipe(
        tap({
          next: () => {
            this._tasks.update((currentTasks) =>
              currentTasks.filter((c) => c.id !== taskId)
            );
            this._loading.set(false);
          },
          error: (err) => {
            console.error('Task removing error', err);
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }

  restoreTask(taskId: string): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .restoreTask$(taskId)
      .pipe(
        tap({
          next: (response) => {
            console.log(response);
            this._loading.set(false);
          },
          error: (err) => {
            console.error('Task restoring error', err);
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }

  clearTask(): void {
    this._task.set(undefined);
  }
}
