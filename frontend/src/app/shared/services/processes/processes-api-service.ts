import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProcess } from '../../models/process.interface';
import { IProcessDto } from '../../models/process.dto';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProcessesApiService {
  private http = inject(HttpClient);

  toDto(process: IProcess): IProcessDto {
    const { id: _id, ...dtoWithoutId } = process;
    const dto: IProcessDto = {
      ...dtoWithoutId,
      start_date: process.start_date ? new Date(process.start_date).toISOString() : null,
      end_date: process.end_date ? new Date(process.end_date).toISOString() : null,
    };

    return dto;
  }

  getProcesses$() {
    return this.http.get<IProcess[]>(environment.processesUrl);
  }

  getProcess$(processId: string) {
    return this.http.get<IProcess>(environment.processesUrl + processId);
  }

  createProcess$(coacheeId: string, newProcess: IProcess) {
    const dto = this.toDto(newProcess);
    return this.http.post(environment.processesUrl + coacheeId, dto);
  }

  updateProcess$(processId: string, newProcess: IProcess) {
    const dto = this.toDto(newProcess);
    return this.http.put(environment.processesUrl + processId, dto);
  }

  deleteProcess$(processId: string){
    return this.http.delete(environment.processesUrl + processId);
  }

  removeProcess$(processId: string){
    return this.http.patch(environment.processesUrl + processId + '/remove', '');
  }

  restoreProcess$(processId: string){
    return this.http.patch(environment.processesUrl + processId + '/restore', '');
  }
}
