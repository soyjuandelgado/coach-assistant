import { inject, Injectable, signal } from '@angular/core';
import { NotesApiService } from './notes-api-service';
import { INote } from '../../models/note.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private api = inject(NotesApiService);
  private _notes = signal<INote[]>([]);
  private _note = signal<INote | undefined>(undefined);

  public readonly notes = this._notes.asReadonly();
  public readonly note = this._note.asReadonly();

  private _error = signal<string | null>(null);
  public readonly error = this._error.asReadonly();

  private _loading = signal<boolean>(false);
  public readonly loading = this._loading.asReadonly();

  getNotes(): void {
    this._loading.set(true);
    this._error.set(null);
    this.api.getNotes$().subscribe({
      next: (response) => {
        this._notes.set(response);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  getNote(noteId: string): void {
    if (this._note()?.id === noteId) {
      return;
    }
    this._loading.set(true);
    this._error.set(null);
    if (noteId.length == 0) {
      this._note.set(undefined);
      return;
    }
    this.api.getNote$(noteId).subscribe({
      next: (response) => {
        this._note.set(response);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      },
    });
  }

  createNote(sessionId: string, note: INote): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .createNote$(sessionId, note)
      .pipe(
        tap({
          next: (response) => {
            const noteResponse = response as INote;
            this._notes.update((currentNotes) => [...currentNotes, noteResponse]);
            this._loading.set(false);
          },
          error: (err) => {
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }
  
  createNote$(sessionId: string, note: INote): Observable<INote> {
    return this.api.createNote$(sessionId, note);
  }

  updateNote(noteId: string, note: INote): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .updateNote$(noteId, note)
      .pipe(
        tap({
          next: (response) => {
            const noteResponse = response as INote;
            this._notes.update((currentNotes) =>
              currentNotes.map((c) => (c.id === noteId ? noteResponse : c))
            );
            this._loading.set(false);
          },
          error: (err) => {
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }
  deleteNote(noteId: string): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .deleteNote$(noteId)
      .pipe(
        tap({
          next: () => {
            this._notes.update((currentNotes) =>
              currentNotes.filter((c) => c.id !== noteId)
            );
            this._loading.set(false);
          },
          error: (err) => {
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }

  removeNote(noteId: string): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .removeNote$(noteId)
      .pipe(
        tap({
          next: () => {
            this._notes.update((currentNotes) =>
              currentNotes.filter((c) => c.id !== noteId)
            );
            this._loading.set(false);
          },
          error: (err) => {
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }

  restoreNote(noteId: string): void {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .restoreNote$(noteId)
      .pipe(
        tap({
          next: (response) => {
            this._loading.set(false);
          },
          error: (err) => {
            this._error.set(err.message);
            this._loading.set(false);
          },
        })
      )
      .subscribe();
  }

  clearNote(): void {
    this._note.set(undefined);
  }
}
