import { Component, effect, inject, input, output, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProcessesService } from '../shared/services/processes/processes-service';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { PanelModule } from 'primeng/panel';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { SessionsService } from '../shared/services/sessions/sessions-service';
import { ISession } from '../shared/models/session.interface';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { IProcess } from '../shared/models/process.interface';

@Component({
  selector: 'app-new-session-dialog',
  imports: [
    DatePipe,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    InputNumberModule,
    InputTextModule,
    ToggleSwitchModule,
    PanelModule,
  ],
  templateUrl: './new-session-dialog.html',
  styleUrl: './new-session-dialog.css',
  providers: [ConfirmationService],
})
export class NewSessionDialog {
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private processesService = inject(ProcessesService);
  private sessionsService = inject(SessionsService);
  protected process = signal<IProcess | undefined>(undefined);
  protected previousSession = signal<ISession | undefined>(undefined);
  //protected previousSession = signal(this.process()?.sessions[1]);
  private fb = inject(FormBuilder);
  visible = input(false);
  visibleChange = output<boolean>();
  processId = input<string | undefined>(undefined);

  sessionForm = this.fb.group({
    duration_minutes: [60, [Validators.required, Validators.min(1)]],
    is_grow: [false],
    location: ['Online', Validators.required],
  });

  constructor() {
    effect(() => {
      if (this.visible() && this.processId()) {
        this.getProcess(this.processId()!);
      }
    });

    effect(() => {
      const process = this.process();
      if (process) {
        this.sessionForm.patchValue({
          duration_minutes: process.duration_minutes,
          is_grow: process.is_grow ?? false,
        });
        if (process.sessions && process.sessions.length > 0) {
          this.getPreviousSession(process.sessions[0].id);
        }
      }
    });
  }

  close() {
    this.visibleChange.emit(false);
  }

  getProcess(processId: string) {
    this.processesService.getProcess$(processId).subscribe({
      next: (value) => {
        this.process.set(value);
      },
    });
  }

  onSubmit() {
    this.sessionForm.markAllAsTouched();

    const sessionData = this.sessionForm.getRawValue() as ISession;
    const now = new Date();
    sessionData.date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (this.process() && this.process()!.sessions) {
      sessionData.session_number = this.process()!.sessions.length + 1;
    } else {
      sessionData.session_number = 1;
    }
    this.createSession(this.processId()!, sessionData);
  }

  //TODO: change to initSession?
  createSession(processId: string, session: ISession) {
    this.sessionsService.createSession$(processId, session).subscribe({
      next: (response: ISession) => {
        this.goSession(response.id);
      },
      error: (err) => {
        this.showErrorDialog(err);
      },
    });
  }

  getPreviousSession(sessionId: string) {
    this.sessionsService.getSession$(sessionId).subscribe({
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

  goSession(sessionId: string) {
    this.router.navigate(['session', sessionId]);
  }
}
