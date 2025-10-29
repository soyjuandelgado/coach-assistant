import { Component, effect, inject, input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { DividerModule } from 'primeng/divider';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FullScreen } from '../shared/services/full-screen/full-screen';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ProcessesService } from '../shared/services/processes/processes-service';
import { IProcess } from '../shared/models/process.interface';

@Component({
  selector: 'app-process',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    DatePickerModule,
    ButtonModule,
    PanelModule,
    TextareaModule,
    SelectModule,
    ToggleSwitchModule,
    DividerModule,
    ToolbarModule,
    ConfirmDialogModule,
  ],
  templateUrl: './process.html',
  styleUrl: './process.css',
  providers: [ConfirmationService],
})
export class Process implements OnDestroy {
  private fullScreenService = inject(FullScreen);
  public isFullScreen = this.fullScreenService.isFullScreen;

  public toggleFullScreen(): void {
    this.fullScreenService.toggle();
  }

  private router = inject(Router);

  private fb = inject(FormBuilder);
  private confirmationService = inject(ConfirmationService);
  private service = inject(ProcessesService); // <-- Asumiendo que este servicio existe

  protected id = input.required<string>();
  protected coacheeId = input.required<string>();

  protected loading = this.service.loading;
  protected error = this.service.error;

  // processTypes = ['Personal', 'Directivo', 'Empresarial'];
  // processTypes = [
  //   { label: 'Personal', value: 'personal' },
  //   { label: 'Directivo', value: 'directivo' },
  //   { label: 'Empresarial', value: 'empresarial' },
  // ];

  // paymentMethods = [
  //   { label: 'Transferencia', value: 'transferencia' },
  //   { label: 'Tarjeta', value: 'tarjeta' },
  //   { label: 'Bizum', value: 'bizum' },
  // ];

  processForm = this.fb.group({
    id: [{ value: null as string | null, disabled: true }],
    type: ['', Validators.required],
    duration_minutes: [60, [Validators.required, Validators.min(1)]],
    is_grow: [false],
    goal: [''],
    start_date: [null as Date | null],
    end_date: [null as Date | null],
    frequency_days: [null as number | null, Validators.min(1)],
    observations: [''],
    session_price: [null as number | null, Validators.min(0)],
    payment_method: [null as string | null],
    payment_term_days: [null as number | null, Validators.min(0)],
    contract_signed: [false],
    lodp_signed: [false],
    rgpd_signed: [false],
  });

  constructor() {
    effect(() => {
      const processId = this.id();
      this.service.getProcess(processId);
    });

    effect(() => {
      const process = this.service.process();
      if (process) {
        this.processForm.patchValue({
          id: process.id,
          type: process.type || null,
          duration_minutes: process.duration_minutes,
          is_grow: process.is_grow ?? false,
          goal: process.goal,
          start_date: process.start_date ? new Date(process.start_date) : null,
          end_date: process.end_date ? new Date(process.end_date) : null,
          frequency_days: process.frequency_days,
          observations: process.observations,
          session_price:
            typeof process.session_price === 'string'
              ? parseFloat(process.session_price)
              : process.session_price,
          payment_method: process.payment_method || null,
          payment_term_days: process.payment_term_days,
          contract_signed: process.contract_signed ?? false,
          lodp_signed: process.lodp_signed ?? false,
          rgpd_signed: process.rgpd_signed ?? false,
        });
      } else {
        this.processForm.reset();
      }
    });

    effect(() => {
      const currentError = this.error();
      if (!this.loading() && currentError) {
        this.showErrorDialog(currentError);
      }
    });
  }

  ngOnDestroy(): void {
    this.service.clearProcess();
  }

  showErrorDialog(error: string) {
    this.confirmationService.confirm({
      message: error,
      header: 'Error',
      icon: 'pi pi-times-circle',
      rejectLabel: 'Cerrar',
      rejectVisible: true,
      acceptVisible: false,
    });
  }

  showWarningDialog(warning: string) {
    this.confirmationService.confirm({
      message: warning,
      header: '¡Atención!',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cerrar',
      rejectVisible: true,
      acceptVisible: false,
    });
  }

  onSubmit() {
    this.processForm.markAllAsTouched();
    if (!this.processForm.valid) {
      // console.warn('El formulario de proceso contiene errores.');
      this.showWarningDialog('El formulario de proceso contiene errores.');
      return;
    }

    const processData = this.processForm.getRawValue() as IProcess;

    if (processData.id) {
      this.updateProcess(processData.id, processData);
    } else {
      this.createProcess(this.coacheeId(), processData);
    }
  }

  createProcess(coacheeId: string, process: IProcess) {
    this.service.createProcess$(coacheeId, process).subscribe({
      next: () => {
        console.log('Navegar a coachees');
        this.router.navigate(['/coachees']);
      },
      error: (err) => {
        this.showErrorDialog(err);
        console.error('Error creating coachee:', err);
      },
    });
  }

  updateProcess(processId: string, process: IProcess) {
    this.service.updateProcess$(processId, process).subscribe({
      next: () => {
        console.log('Navegar a coachees');
        this.router.navigate(['/coachees']);
      },
      error: (err) => {
        this.showErrorDialog(err);
        console.error('Error creating coachee:', err);
      },
    });
  }

  public goCoachees() {
    this.router.navigate(['/coachees']);
  }
}
