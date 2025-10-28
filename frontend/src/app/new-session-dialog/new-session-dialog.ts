import { Component, effect, inject, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ProcessesService } from '../shared/services/processes/processes-service';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { PanelModule } from 'primeng/panel';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
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
  private service = inject(ProcessesService);
  protected process = this.service.process;
  private confirmationService = inject(ConfirmationService);
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
      if (this.processId()) {
        console.log('effect:' + this.processId());
        this.service.getProcess(this.processId()!);
      }
    });

    effect(() => {
      const process = this.process();
      if (process) {
        this.sessionForm.patchValue({
          duration_minutes: process.duration_minutes,
          is_grow: process.is_grow ?? false,
        });
      }
    });
  }

  // showWarningDialog(warning: string) {
  //   this.confirmationService.confirm({
  //     message: warning,
  //     header: '¡Atención!',
  //     icon: 'pi pi-exclamation-triangle',
  //     rejectLabel: 'Cerrar',
  //     rejectVisible: true,
  //     acceptVisible: false,
  //   });
  // }

  close() {
    this.visibleChange.emit(false);
  }

  onSubmit() {
    this.sessionForm.markAllAsTouched();
    // if (!this.sessionForm.valid) {
    //   console.warn('El formulario de proceso contiene errores.');
    //   this.showWarningDialog('El formulario de proceso contiene errores.');
    //   return;
    // }

    //TODO: createSession. Calculate session number
    // const sessionData = this.sessionForm.getRawValue() as ISession;
    // console.log(this.processId());
    // console.log(sessionData);
    // this.service.createSession(this.processId(), sessionData);

    this.close();
  }
}
