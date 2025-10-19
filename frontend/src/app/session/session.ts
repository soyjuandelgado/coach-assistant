import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { PopoverModule } from 'primeng/popover';
import { DrawerModule } from 'primeng/drawer';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { TabsModule } from 'primeng/tabs';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';

import { FullScreen } from '../shared/services/full-screen';

interface DetailOption {
  id: number;
  date: Date;
  text: string;
  type: string;
}
interface TaskOption {
  id: number;
  date: Date;
  text: string;
  scheduled: Date;
  score: number;
}

@Component({
  selector: 'app-session',
  imports: [
    InputText,
    FormsModule,
    TextareaModule,
    SelectButtonModule,
    TableModule,
    DatePipe,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    ToolbarModule,
    PopoverModule,
    DrawerModule,
    DividerModule,
    FieldsetModule,
    TabsModule,
    DialogModule,
  ],
  templateUrl: './session.html',
  styleUrl: './session.css',
})
export class Session {
  private fullScreenService = inject(FullScreen);
  // Exponemos la señal del servicio a la plantilla
  public isFullScreen = this.fullScreenService.isFullScreen;

  // Método para llamar al servicio
  public toggleFullScreen(): void {
    this.fullScreenService.toggle();
  }

  private router = inject(Router);

  visible = false;
  visibleNotes = false;

  showDialogNotes() {
    this.visibleNotes = true;
  }

  goCoachees(){
    this.router.navigate(['/coachees']);
  }

  detailOptions = signal<DetailOption[]>([
    { id: 1, date: new Date('2025-10-15 15:04'), type: 'I', text: 'La semana bien' },
    { id: 2, date: new Date('2025-10-15 15:10'), type: 'E', text: 'Feliz' },
    { id: 3, date: new Date('2025-10-15 15:12'), type: 'G', text: 'Duda entre entregar o no' },
    { id: 4, date: new Date('2025-10-15 15:17'), type: 'G', text: 'Decide diseñar el producto' },
    { id: 5, date: new Date('2025-10-15 15:24'), type: 'R', text: 'No tiene diseñador' },
    {
      id: 6,
      date: new Date('2025-10-15 15:25'),
      type: 'R',
      text: 'No sabe donde encontrarlo ni precio',
    },
    { id: 7, date: new Date('2025-10-15 15:29'), type: 'O', text: 'Buscar diseñador por internet' },
    { id: 8, date: new Date('2025-10-15 15:33'), type: 'O', text: 'Diseño propio, sin contratar' },
    {
      id: 9,
      date: new Date('2025-10-15 15:33'),
      type: 'W',
      text: 'Calcular cual es el presupuesto',
    },
    { id: 10, date: new Date('2025-10-15 15:33'), type: 'W', text: 'Buscar diseñador esta semana' },
  ]);

  selectedDetail = signal<DetailOption | undefined>(undefined);

  taskOptions = signal<TaskOption[]>([
    {
      id: 1,
      date: new Date('2025-10-15 15:58'),
      text: 'Buscar diseñadores',
      scheduled: new Date('2025-10-17 23:59'),
      score: 10,
    },
    {
      id: 2,
      date: new Date('2025-10-15 16:05'),
      text: 'Pedir 3 presupuestos',
      scheduled: new Date('2025-10-18 23:59'),
      score: 10,
    },
    {
      id: 3,
      date: new Date('2025-10-15 16:10'),
      text: 'Contratar diseñador y enviarme mensaje',
      scheduled: new Date('2025-10-20 19:00'),
      score: 9,
    },
  ]);

  selectedTask = signal<TaskOption | undefined>(undefined);

  stateOptions: any[] = [
    { label: 'Objetivo', value: 'objetivo' },
    { label: 'Issues', value: 'issues' },
    { label: 'Goal', value: 'goal' },
    { label: 'Reality', value: 'reality' },
    { label: 'Options', value: 'options' },
    { label: 'Will', value: 'will' },
    { label: 'Tareas', value: 'tasks' },
  ];

  stateOptionsTab: any[] = [
    { label: 'Issues', value: 'issues' },
    { label: 'Goal', value: 'goal' },
    { label: 'Reality', value: 'reality' },
    { label: 'Options', value: 'options' },
    { label: 'Will', value: 'will' },
  ];

  value = 'issues';
}
