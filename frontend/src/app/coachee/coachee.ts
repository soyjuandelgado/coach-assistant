import { CommonModule } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { DatePickerModule } from 'primeng/datepicker';
import { ToolbarModule } from 'primeng/toolbar';
import { CoacheesService } from '../shared/services/coachees/coachees-service';
import { ICoachee } from '../shared/models/coachee.interface';
import { Router } from '@angular/router';
import { FullScreen } from '../shared/services/full-screen/full-screen';

@Component({
  selector: 'app-coachee',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DatePickerModule,
    InputMaskModule,
    ButtonModule,
    PanelModule,
    DividerModule,
    ToolbarModule,
  ],
  templateUrl: './coachee.html',
  styleUrl: './coachee.css',
})
export class Coachee {
  private fullScreenService = inject(FullScreen);
  // Exponemos la señal del servicio a la plantilla
  public isFullScreen = this.fullScreenService.isFullScreen;

  // Método para llamar al servicio
  public toggleFullScreen(): void {
    this.fullScreenService.toggle();
  }

  private userId = '0241cf11-82ba-4804-abe8-f1d958f30183';
  private service = inject(CoacheesService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

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
      console.log('ID recibido:', coacheeId);
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
      } else {
        this.coacheeForm.reset();
      }
    });
  }

  onSubmit() {
    this.coacheeForm.markAllAsTouched();
    if (this.coacheeForm.valid) {
      // console.log('Formulario válido, enviando:', this.coacheeForm.getRawValue());
      const coacheeData = this.coacheeForm.getRawValue() as ICoachee;
      if (coacheeData.id) {
        this.service.updateCoachee(coacheeData.id, coacheeData);
      } else {
        this.service.createCoachee(this.userId, coacheeData);
      }
      // this.router.navigate(['/coachees']);
    } else {
      console.warn('El formulario contiene errores.');
    }
  }

  goCoachees() {
    this.router.navigate(['/coachees']);
  }
}
