import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICoachee } from '../models/coachee.interface';
import { ICoacheeDto } from '../models/coachee.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoacheesApiService {
  private http = inject(HttpClient);

  toDto(coachee: ICoachee): ICoacheeDto {
    // const {id: _id, coach: _coach, ...dtoWithoutCoach } = coachee;
    const {id: _id, ...dtoWithoutCoach } = coachee;
    const dto: ICoacheeDto = {
      ...dtoWithoutCoach,
      birthdate: coachee.birthdate?.toLocaleDateString(),
    };
    return dto;
  }
  getCoachees$() {
    return this.http.get<ICoachee[]>(environment.coacheesUrl);
  }

  getCoachee$(coacheeId: string) {
    return this.http.get<ICoachee>(environment.coacheesUrl + coacheeId);
  }

  createCoachee$(userId: string, newCoachee: ICoachee) {
    // return this.http.post(environment.coacheesUrl, newCoachee, { params: { userId: userId } });
    const dto = this.toDto(newCoachee);
    return this.http.post(environment.coacheesUrl + userId, dto);
  }

  updateCoachee$(coacheeId: string, newCoachee: ICoachee) {
    const dto = this.toDto(newCoachee);
    return this.http.put(environment.coacheesUrl + coacheeId, dto);
  }

  deleteCoachee$(coacheeId: string) {
    return this.http.delete(environment.coacheesUrl + coacheeId);
  }

  removeCoachee$(coacheeId: string) {
    return this.http.patch<ICoachee[]>(environment.coacheesUrl + coacheeId + '/remove', '');
  }

  restoreCoachee$(coacheeId: string) {
    return this.http.patch<ICoachee[]>(environment.coacheesUrl + coacheeId + '/restore', '');
  }
}
