import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ErrorText } from '../error-text/error-text';
import { INote } from '../../models/notes.interface';
import { INoteDto } from '../../models/note.dto';
import { environment } from '../../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesApiService {
  private http = inject(HttpClient);
  private errorText = inject(ErrorText);

  toDto(note: INote): INoteDto {
    const { id: _id, ...dtoWithoutId } = note;
    const dto: INoteDto = {
      ...dtoWithoutId,
    };
    return dto;
  }

  getNotes$() {
    return this.http.get<INote[]>(environment.notesUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Note')));
      })
    );
  }

  getNote$(noteId: string) {
    return this.http.get<INote>(environment.notesUrl + noteId).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Note')));
      })
    );
  }

  createNote$(sessionId: string, newNote: INote): Observable<INote> {
    const dto = this.toDto(newNote);
    return (this.http.post(environment.notesUrl + sessionId, dto) as Observable<INote>).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Note')));
      })
    );
  }

  updateNote$(noteId: string, newNote: INote) {
    const dto = this.toDto(newNote);
    return this.http.put(environment.notesUrl + noteId, dto).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Note')));
      })
    );
  }

  deleteNote$(noteId: string) {
    return this.http.delete(environment.notesUrl + noteId).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Note')));
      })
    );
  }

  removeNote$(noteId: string) {
    return this.http.patch(environment.notesUrl + noteId + '/remove', '').pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Note')));
      })
    );
  }

  restoreNote$(noteId: string) {
    return this.http.patch(environment.notesUrl + noteId + '/restore', '').pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.errorText.get(error, 'Note')));
      })
    );
  }
}
