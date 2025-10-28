import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICoachee } from '../../models/coachee.interface';
import { ICoacheeDto } from '../../models/coachee.dto';
import { environment } from '../../../../environments/environment';
import { catchError, throwError } from 'rxjs';
import { ErrorText } from '../error-text/error-text';

@Injectable({
  providedIn: 'root',
})
export class CoacheesApiService {
  private http = inject(HttpClient);
  private errorText = inject(ErrorText);

  toDto(coachee: ICoachee): ICoacheeDto {
    // const {id: _id, coach: _coach, ...dtoWithoutCoach } = coachee;
    const { id: _id, ...dtoWithoutId } = coachee;
    const dto: ICoacheeDto = {
      ...dtoWithoutId,
      birthdate: coachee.birthdate ? new Date(coachee.birthdate).toISOString() : null,
    };
    // console.log(dto);
    return dto;
  }

  getCoachees$() {
    let params = new HttpParams();
    params = params.append('relations', 'processes');
    // params = params.append('deleted', 'true');
    return this.http.get<ICoachee[]>(environment.coacheesUrl, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Coachee')));
      })
    );
  }

  getCoachee$(coacheeId: string) {
    return this.http.get<ICoachee>(environment.coacheesUrl + coacheeId).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Coachee')));
      })
    );
  }

  createCoachee$(userId: string, newCoachee: ICoachee) {
    // return this.http.post(environment.coacheesUrl, newCoachee, { params: { userId: userId } });
    const dto = this.toDto(newCoachee);
    return this.http.post(environment.coacheesUrl + userId, dto).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Coachee')));
      })
    );
  }

  updateCoachee$(coacheeId: string, newCoachee: ICoachee) {
    const dto = this.toDto(newCoachee);
    return this.http.put(environment.coacheesUrl + coacheeId, dto).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Coachee')));
      })
    );
  }

  deleteCoachee$(coacheeId: string) {
    return this.http.delete(environment.coacheesUrl + coacheeId).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Coachee')));
      })
    );
  }

  removeCoachee$(coacheeId: string) {
    return this.http.patch<ICoachee[]>(environment.coacheesUrl + coacheeId + '/remove', '').pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Coachee')));
      })
    );
  }

  restoreCoachee$(coacheeId: string) {
    return this.http.patch<ICoachee[]>(environment.coacheesUrl + coacheeId + '/restore', '').pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Coachee')));
      })
    );
  }
}
