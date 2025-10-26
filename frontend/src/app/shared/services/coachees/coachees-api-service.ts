import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICoachee } from '../../models/coachee.interface';
import { ICoacheeDto } from '../../models/coachee.dto';
import { environment } from '../../../../environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoacheesApiService {
  private http = inject(HttpClient);

  toDto(coachee: ICoachee): ICoacheeDto {
    // const {id: _id, coach: _coach, ...dtoWithoutCoach } = coachee;
    const { id: _id, ...dtoWithoutCoach } = coachee;
    const dto: ICoacheeDto = {
      ...dtoWithoutCoach,
      birthdate: coachee.birthdate ? new Date(coachee.birthdate).toISOString() : undefined,
    };
    // console.log(dto);
    return dto;
  }
  getCoachees$() {
    return this.http.get<ICoachee[]>(environment.coacheesUrl);
  }

  getCoachee$(coacheeId: string) {
    return this.http.get<ICoachee>(environment.coacheesUrl + coacheeId).pipe(
      catchError((error: HttpErrorResponse) => {
        let appError: string;
        if (error.status === 404) {
          appError = `Coachee not found (ID: ${coacheeId})`;
        } else if (error.status === 401) {
          appError = 'Not authorized';
        } else {
          appError = `Server generic error: ${error}`;
        }
        return throwError(() => new Error(appError));
      })
    );
  }

  createCoachee$(userId: string, newCoachee: ICoachee) {
    // return this.http.post(environment.coacheesUrl, newCoachee, { params: { userId: userId } });
    const dto = this.toDto(newCoachee);
    return this.http.post(environment.coacheesUrl + userId, dto).pipe(
      catchError((error: HttpErrorResponse) => {
        let appError: string;
        if (error.status === 404) {
          appError = `User not found (ID: ${userId})`;
        } else if (error.status === 401) {
          appError = 'Not authorized';
        } else {
          appError = `Server generic error: ${error}`;
        }
        return throwError(() => new Error(appError));
      })
    );
  }

  updateCoachee$(coacheeId: string, newCoachee: ICoachee) {
    const dto = this.toDto(newCoachee);
    return this.http.put(environment.coacheesUrl + coacheeId, dto).pipe(
      catchError((error: HttpErrorResponse) => {
        let appError: string;
        if (error.status === 404) {
          appError = `Coachee not found (ID: ${coacheeId})`;
        } else if (error.status === 401) {
          appError = 'Not authorized';
        } else {
          appError = `Server generic error: ${error}`;
        }
        return throwError(() => new Error(appError));
      })
    );
  }

  deleteCoachee$(coacheeId: string) {
    return this.http.delete(environment.coacheesUrl + coacheeId).pipe(
      catchError((error: HttpErrorResponse) => {
        let appError: string;
        if (error.status === 404) {
          appError = `Coachee not found (ID: ${coacheeId})`;
        } else if (error.status === 401) {
          appError = 'Not authorized';
        } else {
          appError = `Server generic error: ${error}`;
        }
        return throwError(() => new Error(appError));
      })
    );
  }

  removeCoachee$(coacheeId: string) {
    return this.http.patch<ICoachee[]>(environment.coacheesUrl + coacheeId + '/remove', '').pipe(
      catchError((error: HttpErrorResponse) => {
        let appError: string;
        if (error.status === 404) {
          appError = `Coachee not found (ID: ${coacheeId})`;
        } else if (error.status === 401) {
          appError = 'Not authorized';
        } else {
          appError = `Server generic error: ${error}`;
        }
        return throwError(() => new Error(appError));
      })
    );
  }

  restoreCoachee$(coacheeId: string) {
    return this.http.patch<ICoachee[]>(environment.coacheesUrl + coacheeId + '/restore', '').pipe(
      catchError((error: HttpErrorResponse) => {
        let appError: string;
        if (error.status === 404) {
          appError = `Coachee not found (ID: ${coacheeId})`;
        } else if (error.status === 401) {
          appError = 'Not authorized';
        } else {
          appError = `Server generic error: ${error}`;
        }
        return throwError(() => new Error(appError));
      })
    );
  }
}
