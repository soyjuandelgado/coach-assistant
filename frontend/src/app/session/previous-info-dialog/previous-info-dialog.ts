import { Component, effect, inject, input, output, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IProcess } from '../../shared/models/process.interface';
import { ConfirmationService } from 'primeng/api';
import { ISession } from '../../shared/models/session.interface';
import { SessionsService } from '../../shared/services/sessions/sessions-service';

@Component({
  selector: 'app-previous-info-dialog',
  imports: [ButtonModule, DialogModule, ConfirmDialogModule, DatePipe],
  templateUrl: './previous-info-dialog.html',
  styleUrl: './previous-info-dialog.css',
  providers: [ConfirmationService],
})
export class PreviousInfoDialog {
  process = input<IProcess>();
  visible = input(false);
  visibleChange = output<boolean>();

  previousSession = signal<ISession | undefined>(undefined);
  private sessionService = inject(SessionsService);
  private confirmationService = inject(ConfirmationService);

  constructor() {
    effect(() => {
      if (this.process()) {
        if (this.process()!.sessions && this.process()!.sessions[1]) {
          this.getPreviousSession(this.process()!.sessions[1].id);
        }
      }
    });
  }

  close() {
    this.visibleChange.emit(false);
  }

  getPreviousSession(sessionId: string) {
    this.sessionService.getSession$(sessionId).subscribe({
      next: (response) => {
        this.previousSession.set(response);
      },
      error: (err) => {
        this.showErrorDialog(err);
      },
    });
  }

  showErrorDialog(error: string) {
    this.confirmationService.confirm({
      message: error,
      header: 'Error',
      icon: 'pi pi-times-circle',
      rejectLabel: 'Cerrar',
      acceptVisible: false,
    });
  }
}
