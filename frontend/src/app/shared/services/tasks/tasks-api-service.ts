import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ErrorText } from '../error-text/error-text';
import { ITask } from '../../models/task.interface';
import { ITaskDto } from '../../models/task.dto';
import { environment } from '../../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksApiService {
  private http = inject(HttpClient);
  private errorText = inject(ErrorText);

  toDto(task: ITask): ITaskDto {
    const { id: _id, ...dtoWithoutId } = task;
    const dto: ITaskDto = {
      ...dtoWithoutId,
      scheduled_at: task.scheduled_at ? new Date(task.scheduled_at).toISOString() : null,
      done: task.done ?? false,
    };
    return dto;
  }

  getTasks$() {
    return this.http.get<ITask[]>(environment.tasksUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Task')));
      })
    );
  }

  getTask$(taskId: string) {
    return this.http.get<ITask>(environment.tasksUrl + taskId).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Task')));
      })
    );
  }

  createTask$(sessionId: string, newTask: ITask): Observable<ITask> {
    const dto = this.toDto(newTask);
    return (this.http.post(environment.tasksUrl + sessionId, dto) as Observable<ITask>).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Task')));
      })
    );
  }

  updateTask$(taskId: string, newTask: ITask) {
    const dto = this.toDto(newTask);
    return this.http.put(environment.tasksUrl + taskId, dto).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Task')));
      })
    );
  }

  deleteTask$(taskId: string) {
    return this.http.delete(environment.tasksUrl + taskId).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Task')));
      })
    );
  }

  removeTask$(taskId: string) {
    return this.http.patch(environment.tasksUrl + taskId + '/remove', '').pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Task')));
      })
    );
  }

  restoreTask$(taskId: string) {
    return this.http.patch(environment.tasksUrl + taskId + '/restore', '').pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Task')));
      })
    );
  }
}
