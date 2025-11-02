import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, OnDestroy, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { DatePickerModule } from 'primeng/datepicker';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CoacheesService } from '../shared/services/coachees/coachees-service';
import { ICoachee } from '../shared/models/coachee.interface';
import { Router, RouterLink } from '@angular/router';
import { FullScreen } from '../shared/services/full-screen/full-screen';
import { ConfirmationService } from 'primeng/api';
import { IProcess } from '../shared/models/process.interface';
import { AuthService } from '../shared/auth/auth-service';

@Component({
  selector: 'app-coachee',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    InputTextModule,
    DatePickerModule,
    InputMaskModule,
    ButtonModule,
    PanelModule,
    TableModule,
    DividerModule,
    ToolbarModule,
    ConfirmDialogModule,
  ],
  templateUrl: './coachee.html',
  styleUrl: './coachee.css',
  providers: [ConfirmationService],
})
export class Coachee implements OnDestroy {
  private fullScreenService = inject(FullScreen);
  // Exponemos la señal del servicio a la plantilla
  public isFullScreen = this.fullScreenService.isFullScreen;

  // Método para llamar al servicio
  public toggleFullScreen(): void {
    this.fullScreenService.toggle();
  }

  private authService = inject(AuthService);
  private service = inject(CoacheesService);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private fb = inject(FormBuilder);
  protected process = signal<IProcess | undefined>(undefined); //'4b8f31f5-1258-4da9-8824-2c4357340593';
  private user = this.authService.currentUser; //'0241cf11-82ba-4804-abe8-f1d958f30183'
  protected loading = this.service.loading;
  protected error = this.service.error;

  id = input.required<string>();
  coacheeForm = this.fb.group({
    id: [{ value: null as string | null, disabled: true }],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    middlename: [''],
    email: ['', [Validators.email]],
    address: [''],
    phone: [''],
    birthdate: [null as Date | null],
    dni: [''],
    company: [''],
    company_role: [''],
    company_address: [''],
  });

  constructor() {
    effect(() => {
      const coacheeId = this.id();
      this.service.getCoachee(coacheeId);
    });

    effect(() => {
      const coachee = this.service.coachee();
      if (coachee) {
        const coacheeDataForForm = {
          ...coachee,
          birthdate: coachee.birthdate ? new Date(coachee.birthdate) : null,
        };
        this.coacheeForm.patchValue(coacheeDataForForm);
        if (coachee.processes) {
          this.process.set(coachee.processes[0]);
        } else {
          this.process.set(undefined);
        }
      } else {
        this.coacheeForm.reset();
      }
    });

    effect(() => {
      const currentError = this.error();
      if (!this.loading()) {
        if (currentError) {
          this.showErrorDialog(currentError);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.service.clearCoachee();
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

  showAceptDialog(message: string) {
    this.confirmationService.confirm({
      message: message,
      header: 'Información',
      icon: 'pi pi.pi-info-circle',
      acceptLabel: 'Aceptar',
      rejectVisible: false,
      acceptVisible: true,
    });
  }

  onSubmit() {
    this.coacheeForm.markAllAsTouched();
    if (!this.coacheeForm.valid) {
      this.showWarningDialog('El formulario contiene errores.');
      return;
    }
    const coacheeData = this.coacheeForm.getRawValue() as ICoachee;
    if (coacheeData.id) {
      this.updateCoachee(coacheeData.id, coacheeData);
    } else {
      if(this.user()){
        this.createCoachee(this.user()!.id, coacheeData);
      }else{
        this.showErrorDialog('¡Usuario inexistente!')   
      }
    }
  }

  createCoachee(userId: string, coachee: ICoachee) {
    this.service.createCoachee$(userId, coachee).subscribe({
      next: () => {
        this.goCoachees();
      },
      error: (err) => {
        this.showErrorDialog(err);
      },
    });
  }

  updateCoachee(coacheeId: string, coachee: ICoachee) {
    this.service.updateCoachee$(coacheeId, coachee).subscribe({
      next: () => {
        this.goCoachees();
      },
      error: (err) => {
        this.showErrorDialog(err);
      },
    });
  }

  goCoachees() {
    this.router.navigate(['/coachees']);
  }
}
