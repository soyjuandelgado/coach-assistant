import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICoachee } from '../models/coachee.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoacheesApiService {
  private http = inject(HttpClient);

  getCoachees$(){
    return this.http.get<ICoachee[]>(environment.coacheesUrl);
  }  
}
