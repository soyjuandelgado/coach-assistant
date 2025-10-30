import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProcess } from '../../models/process.interface';
import { IProcessDto } from '../../models/process.dto';
import { environment } from '../../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorText } from '../error-text/error-text';

@Injectable({
  providedIn: 'root',
})
export class ProcessesApiService {
  private http = inject(HttpClient);
  private errorText = inject(ErrorText);
  
  toDto(process: IProcess): IProcessDto {
    const { id: _id, ...dtoWithoutId } = process;
    const dto: IProcessDto = {
      ...dtoWithoutId,
      start_date: process.start_date ? new Date(process.start_date).toISOString() : null,
      end_date: process.end_date ? new Date(process.end_date).toISOString() : null,
      is_grow: process.is_grow ?? false,
      contract_signed: process.contract_signed ?? false,
      lodp_signed: process.lodp_signed ?? false,
      rgpd_signed: process.rgpd_signed ?? false,
    };

    return dto;
  }

  getProcesses$() {
    return this.http.get<IProcess[]>(environment.processesUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Process')));
      })
    );
  }

  getProcess$(processId: string): Observable<IProcess> {
    return this.http.get<IProcess>(environment.processesUrl + processId).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Process')));
      })
    );
  }

  createProcess$(coacheeId: string, newProcess: IProcess): Observable<IProcess> {
    const dto = this.toDto(newProcess);
    return (this.http.post(environment.processesUrl + coacheeId, dto) as Observable<IProcess>).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Process')));
      })
    );
  }

  updateProcess$(processId: string, newProcess: IProcess): Observable<IProcess> {
    const dto = this.toDto(newProcess);
    return (this.http.put(environment.processesUrl + processId, dto) as Observable<IProcess>).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Process')));
      })
    );
  }

  deleteProcess$(processId: string) {
    return this.http.delete(environment.processesUrl + processId).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Process')));
      })
    );
  }

  removeProcess$(processId: string) {
    return this.http.patch(environment.processesUrl + processId + '/remove', '').pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Process')));
      })
    );
  }

  restoreProcess$(processId: string) {
    return this.http.patch(environment.processesUrl + processId + '/restore', '').pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Process')));
      })
    );
  }
}
