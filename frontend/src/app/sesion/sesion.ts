import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { ListboxChangeEvent, ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

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
  selector: 'app-sesion',
  imports: [
    InputText,
    ListboxModule,
    FormsModule,
    TextareaModule,
    SelectButtonModule,
    TableModule,
    DatePipe,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    ToolbarModule,
  ],
  templateUrl: './sesion.html',
  styleUrl: './sesion.css',
})
export class Sesion {

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
    { label: 'Issues', value: 'issues' },
    { label: 'Goal', value: 'goal' },
    { label: 'Reality', value: 'reality' },
    { label: 'Options', value: 'options' },
    { label: 'Will', value: 'will' },
    { label: 'Objetivo', value: 'objetivo' },
    { label: 'PdA', value: 'pda' },
  ];

  value = 'issues';

  /**
   * Método para manejar el cambio de selección del Listbox.
   * @param event El evento emitido por PrimeNG, que contiene el valor seleccionado.
   */
  onDetailChange(event: ListboxChangeEvent): void {
    // Actualizamos la señal explícitamente con el nuevo valor.
    this.selectedDetail.set(event.value);
  }
}
