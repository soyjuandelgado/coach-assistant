import { Component, effect, inject, input, output, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
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

@Component({
  selector: 'app-new-session-dialog',
  imports: [
    DatePipe,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
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
  protected process = this.processesService.process;
  protected previousSession = signal(this.process()?.sessions[1]);
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
        this.processesService.getProcess(this.processId()!);
      }
    });

    effect(() => {
      const process = this.process();
      if (process) {
        this.sessionForm.patchValue({
          duration_minutes: process.duration_minutes,
          is_grow: process.is_grow ?? false,
        });
        if (process.sessions) {
          this.previousSession.set(process.sessions[0]);
        }
      }
    });
  }

  close() {
    this.visibleChange.emit(false);
  }

  onSubmit() {
    this.sessionForm.markAllAsTouched();

    const sessionData = this.sessionForm.getRawValue() as ISession;
    const now = new Date();
    sessionData.date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (this.process() && this.process()!.sessions) {
      console.log(this.process()?.sessions);
      sessionData.session_number = this.process()!.sessions.length + 1;
    } else {
      sessionData.session_number = 1;
    }
    this.createSession(this.processId()!, sessionData);
  }

  createSession(processId: string, session: ISession) {
    this.sessionsService.createSession$(processId, session).subscribe({
      next: (response: ISession) => {
        console.log('Navegar a session');
        this.router.navigate(['session', response.id]);
        // this.close();
      },
      error: (err) => {
        this.showErrorDialog(err);
        console.error('Error creating session:', err);
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
